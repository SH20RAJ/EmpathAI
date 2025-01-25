"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";

export function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <Card
              key={i}
              className={`p-4 ${
                message.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "mr-auto bg-muted"
              } max-w-[80%]`}
            >
              {message.content}
            </Card>
          ))}
          {isLoading && (
            <Card className="mr-auto max-w-[80%] bg-muted p-4">
              <div className="flex space-x-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-current"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:0.2s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:0.4s]"></div>
              </div>
            </Card>
          )}
        </div>
      </ScrollArea>
      <form onSubmit={sendMessage} className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
