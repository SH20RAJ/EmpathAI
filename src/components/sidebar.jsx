"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  BookOpen,
  Home,
} from "lucide-react";
import { signOut } from "next-auth/react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Chat", href: "/chat", icon: MessageSquare },
  { name: "Mood Tracker", href: "/mood", icon: BarChart3 },
  { name: "Resources", href: "/resources", icon: BookOpen },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col bg-sidebar px-3 py-4 dark:bg-sidebar">
      <div className="flex h-16 items-center px-2">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">EmpathAI</span>
        </Link>
      </div>
      <div className="flex-1 space-y-1">
        <nav className="flex flex-1 flex-col gap-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.name}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "justify-start gap-2",
                  pathname === item.href
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
                asChild
              >
                <Link href={item.href}>
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-sidebar-border pt-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent/50"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
