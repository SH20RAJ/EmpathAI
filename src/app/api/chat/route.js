import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are EmpathAI, an empathetic AI companion designed to help users track and understand their moods and emotions. Your responses should be:
1. Empathetic and understanding
2. Helpful and constructive
3. Focused on emotional well-being
4. Professional but warm
5. Clear and concise

You can help users by:
- Listening to their concerns
- Asking clarifying questions
- Providing emotional support
- Suggesting healthy coping strategies
- Encouraging professional help when appropriate

Remember to maintain appropriate boundaries and never provide medical advice.`;

export async function POST(req) {
  try {
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
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: formattedMessages,
      stream: true,
      temperature: 0.7,
      max_tokens: 500,
    });

    // Transform the response into a readable stream
    return new StreamingTextResponse(response.toReadableStream());
  } catch (error) {
    console.error("Chat error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
