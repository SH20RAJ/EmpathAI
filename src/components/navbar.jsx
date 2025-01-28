"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const router = useRouter();

  const startChat = () => {
    const chatId = nanoid();
    router.push(`/chat/${chatId}`);
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Mood Tracker", href: "/mood" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold">EmpathAI</span>
          </a>
          <div className="flex gap-6">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="text-sm font-medium"
                onClick={() => router.push(item.href)}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>EmpathAI</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => router.push(item.href)}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex justify-center md:w-auto">
            <Button
              onClick={startChat}
              className="bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg hover:shadow-xl transition-shadow"
            >
              Start Chat
            </Button>
          </div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
