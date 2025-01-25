import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import openai from "@/lib/openai";
import { db } from "@/db";
import { messages, conversations } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

const SYSTEM_PROMPT = `You are EmpathAI, a compassionate and understanding mental health companion. Your role is to provide emotional support, active listening, and helpful guidance while maintaining a warm and empathetic tone. Remember to:

1. Practice active listening and validate emotions
2. Ask thoughtful follow-up questions
3. Offer practical coping strategies when appropriate
4. Maintain boundaries and remind users to seek professional help for serious concerns
5. Keep responses concise but meaningful
6. Focus on empowerment and growth

Important: Never provide medical advice or attempt to diagnose conditions.`;

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { message, conversationId } = await req.json();
    let currentConversationId = conversationId;

    // Create a new conversation if none exists
    if (!currentConversationId) {
      const [newConversation] = await db
        .insert(conversations)
        .values({
          userId: session.user.id,
          title: message.slice(0, 100),
        })
        .returning();
      currentConversationId = newConversation.id;
    }

    // Store user message
    await db.insert(messages).values({
      conversationId: currentConversationId,
      content: message,
      role: "user",
    });

    // Get conversation history
    const conversationHistory = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, currentConversationId))
      .orderBy(messages.createdAt);

    // Prepare messages for OpenAI
    const apiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // Get OpenAI response
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = completion.choices[0].message.content;

    // Store AI response
    await db.insert(messages).values({
      conversationId: currentConversationId,
      content: aiResponse,
      role: "assistant",
    });

    return NextResponse.json({
      message: aiResponse,
      conversationId: currentConversationId,
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
