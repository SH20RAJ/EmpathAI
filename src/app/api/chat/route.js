import { NextResponse } from "next/server";
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
    // Remove or modify session check
    const { message } = await req.json();
    let currentChatId = chatId;

    // Create a new conversation if none exists
    if (!currentChatId) {
      const [newConversation] = await db
        .insert(conversations)
        .values({
          title: message.slice(0, 100),
        })
        .returning();
      currentChatId = newConversation.id;
    }

    // Store user message
    await db.insert(messages).values({
      conversationId: currentChatId,
      content: message,
      role: "user",
    });

    // Get conversation history
    const conversationHistory = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, currentChatId))
      .orderBy(messages.createdAt);

    // Format messages for OpenAI
    const formattedMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...conversationHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // Get AI response
    const completion = await openai.chat.completions.create({
      messages: formattedMessages,
      model: "gpt-4-1106-preview",
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = completion.choices[0].message.content;

    // Store AI response
    await db.insert(messages).values({
      conversationId: currentChatId,
      content: aiResponse,
      role: "assistant",
    });

    return NextResponse.json({ message: aiResponse, chatId: currentChatId });
  } catch (error) {
    console.error("Chat error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
