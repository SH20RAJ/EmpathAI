import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/sidebar";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare, BarChart3, BookOpen } from "lucide-react";

const features = [
  {
    title: "AI Chat Companion",
    description:
      "Have meaningful conversations with our empathetic AI companion",
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
  return (
    <div className="flex h-screen">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-auto p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-4xl font-bold">Welcome to EmpathAI</h1>
            <p className="text-lg text-muted-foreground">
              Your personal mental health companion, here to support your
              well-being journey.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="transition-all hover:shadow-lg"
                >
                  <Link href={feature.href}>
                    <CardHeader>
                      <div className="mb-2 inline-block rounded-lg bg-primary/10 p-2">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="w-full">
                        Get Started
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>

          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle>How EmpathAI Can Help You</CardTitle>
                <CardDescription>
                  We&apos;re here to support your mental well-being journey
                  through various tools and features.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold">24/7 Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Access emotional support and guidance whenever you need it.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Progress Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor your emotional well-being and track improvements
                    over time.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">
                    Personalized Experience
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Get tailored support based on your unique needs and
                    preferences.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Educational Resources</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn valuable coping strategies and mental health insights.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
