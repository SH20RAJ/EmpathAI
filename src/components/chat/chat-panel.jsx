"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Send, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function ChatPanel({ chatId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const newMessage = {
      content: input,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          chatId,
        }),
      });

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          content: data.message,
          sender: "assistant",
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex h-[100dvh] flex-col bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/")}
            className="md:hidden"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/bot-avatar.png" alt="EmpathAI" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-sm font-semibold">EmpathAI</h2>
            <p className="text-xs text-muted-foreground">Your mental health companion</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <ScrollArea 
        ref={scrollRef}
        className="flex-1 p-4"
      >
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.length === 0 && (
            <div className="flex h-full min-h-[60vh] items-center justify-center">
              <div className="max-w-sm text-center">
                <h3 className="text-lg font-semibold">Welcome to EmpathAI</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Share your thoughts and feelings with me. I'm here to listen and support you.
                </p>
              </div>
            </div>
          )}
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex items-start gap-3",
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <Avatar className={cn("h-8 w-8", message.sender === "user" ? "order-1" : "order-none")}>
                  {message.sender === "user" ? (
                    <>
                      <AvatarImage src="/user-avatar.png" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src="/bot-avatar.png" alt="EmpathAI" />
                      <AvatarFallback>AI</AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div
                  className={cn(
                    "relative rounded-lg px-4 py-2 max-w-[85%] shadow-md",
                    message.sender === "user"
                      ? "bg-gradient-to-br from-pink-500 to-violet-500 text-white"
                      : "bg-card"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                  <span className="mt-1 block text-[10px] opacity-50">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/bot-avatar.png" alt="EmpathAI" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="rounded-lg bg-card p-4 shadow-md">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t bg-background p-4">
        <div className="mx-auto max-w-3xl flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading}
            size="icon"
            className="bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
