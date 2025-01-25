import { ChatInterface } from "@/components/chat/chat-interface";
import { Sidebar } from "@/components/sidebar";

export default function ChatPage() {
  return (
    <div className="flex h-screen">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <main className="flex-1">
        <ChatInterface />
      </main>
    </div>
  );
}
