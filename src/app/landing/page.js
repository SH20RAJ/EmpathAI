"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { ArrowRight, MessageCircle, Brain, Shield, Sparkles } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const startChat = () => {
    const chatId = nanoid();
    router.push(`/chat/${chatId}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-violet-500/20 to-blue-500/20 blur-3xl" />
        <div className="container relative mx-auto px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-3xl">
            <h1 className="bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              Your AI Mental Health
              <span className="block">Companion</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground sm:text-xl md:text-2xl">
              Experience compassionate support and understanding through the power of AI.
              Available 24/7, completely private, and personalized to you.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={startChat}
                className="group bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Chatting
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/mood")}
                className="group"
              >
                Track Your Mood
                <Brain className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <CardContent className="p-6">
              <MessageCircle className="h-12 w-12 text-pink-500" />
              <h3 className="mt-4 text-2xl font-bold">24/7 Support</h3>
              <p className="mt-2 text-muted-foreground">
                Get emotional support and guidance whenever you need it, day or night.
                Our AI companion is always here to listen.
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <CardContent className="p-6">
              <Shield className="h-12 w-12 text-violet-500" />
              <h3 className="mt-4 text-2xl font-bold">Private & Secure</h3>
              <p className="mt-2 text-muted-foreground">
                Your conversations are completely private and secure. We prioritize
                your confidentiality and peace of mind.
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden transition-all hover:shadow-lg md:col-span-2 lg:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <CardContent className="p-6">
              <Sparkles className="h-12 w-12 text-blue-500" />
              <h3 className="mt-4 text-2xl font-bold">Personalized Care</h3>
              <p className="mt-2 text-muted-foreground">
                Receive tailored support and insights based on your unique situation
                and emotional needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-violet-500/10 to-blue-500/10" />
        <div className="container relative mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Join thousands of others who have found support and guidance through
              EmpathAI. Your emotional well-being matters.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                onClick={startChat}
                className="group bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Begin Your Conversation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
