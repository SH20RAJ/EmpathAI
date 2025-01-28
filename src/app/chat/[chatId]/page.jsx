import { ChatPanel } from "@/components/chat/chat-panel";

export const metadata = {
  title: "Chat - EmpathAI",
  description: "Chat with EmpathAI, your mental health companion",
};

export default function ChatPage({ params }) {
  return (
    <div className="flex-1">
      <ChatPanel chatId={params.chatId} />
    </div>
  );
}
