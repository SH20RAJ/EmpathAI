import { ChatInterface } from "@/components/chat/chat-interface";
import { useAuth } from "@/hooks/useAuth";

export default function ChatPage() {
  const { user } = useAuth();

  if (!user) {
    return <div>You must be logged in to access the chat.</div>;
  }

  return (
    <div className="container mx-auto flex h-[calc(100vh-4rem)] flex-col gap-4 p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Chat with EmpathAI</h1>
        <p className="text-muted-foreground">
          Your empathetic AI companion for emotional well-being. Share your thoughts and feelings, and I'll listen and support you.
        </p>
      </div>
      <div className="relative flex-1 overflow-hidden rounded-lg border bg-background shadow">
        <ChatInterface />
      </div>
    </div>
  );
}
