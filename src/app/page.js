'use client';
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/sidebar";
import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare, BarChart3, BookOpen, ArrowRight, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

const features = [
  {
    title: "AI Chat Companion",
    description: "Have meaningful conversations with our empathetic AI companion",
    icon: MessageSquare,
    href: "/chat",
  },
  {
    title: "Mood Tracking",
    description: "Track your emotional well-being and identify patterns",
    icon: BarChart3,
    href: "/mood",
  },
  {
    title: "Resource Library",
    description: "Access helpful articles, exercises, and coping strategies",
    icon: BookOpen,
    href: "/resources",
  },
];
export default function Home() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
export default function Home() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-auto p-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Welcome to EmpathAI</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Your personal mental health companion, here to support your well-being journey.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="transition-all hover:shadow-xl hover:-translate-y-1">
                  <Link href={feature.href} className="block h-full">
                    <CardHeader>
                      <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{feature.title}</CardTitle>
                      <CardDescription className="text-lg">{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                      <span className="text-primary font-semibold">Get Started</span>
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>

          <div className="mt-16">
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">How EmpathAI Can Help You</CardTitle>
                <CardDescription className="text-lg">
                  We're here to support your mental well-being journey through various tools and features.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                {[
                  { title: "24/7 Support", description: "Access emotional support and guidance whenever you need it." },
                  { title: "Progress Tracking", description: "Monitor your emotional well-being and track improvements over time." },
                  { title: "Personalized Experience", description: "Get tailored support based on your unique needs and preferences." },
                  { title: "Educational Resources", description: "Learn valuable coping strategies and mental health insights." },
                ].map((item) => (
                  <div key={item.title} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                    <h3 className="mb-3 text-xl font-semibold text-primary">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex items-center">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isLoading} // Remove status check
            />
            <Button type="submit" disabled={isLoading}> // Remove status check
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
