"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bot } from "lucide-react";

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center space-y-6">
          <Bot className="h-12 w-12 text-primary" />
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Welcome to EmpathAI</h1>
            <p className="text-muted-foreground">
              Sign in to start your emotional well-being journey
            </p>
          </div>
          <Button
            size="lg"
            className="w-full"
            onClick={() => signIn("google", { callbackUrl: "/chat" })}
          >
            Continue with Google
          </Button>
        </div>
      </Card>
    </div>
  );
}
