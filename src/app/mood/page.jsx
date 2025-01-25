"use client";

import { Sidebar } from "@/components/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";

const LineChart = dynamic(
  () => import("recharts").then((mod) => mod.LineChart),
  { ssr: false }
);
const Line = dynamic(() => import("recharts").then((mod) => mod.Line), {
  ssr: false,
});
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), {
  ssr: false,
});
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), {
  ssr: false,
});
const CartesianGrid = dynamic(
  () => import("recharts").then((mod) => mod.CartesianGrid),
  { ssr: false }
);
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), {
  ssr: false,
});
const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);

// Mock data - replace with real data from your database
const moodData = [
  { date: "2024-01-20", score: 7 },
  { date: "2024-01-21", score: 6 },
  { date: "2024-01-22", score: 8 },
  { date: "2024-01-23", score: 7 },
  { date: "2024-01-24", score: 9 },
  { date: "2024-01-25", score: 8 },
  { date: "2024-01-26", score: 8 },
];

export default function MoodPage() {
  return (
    <div className="flex h-screen">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-auto p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-3xl font-bold">Mood Tracker</h1>

          <div className="mb-8">
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">How are you feeling today?</h2>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">
                  Rate your mood (1-10)
                </label>
                <Slider
                  defaultValue={[5]}
                  max={10}
                  min={1}
                  step={1}
                  className="py-4"
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">
                  What&apos;s on your mind?
                </label>
                <Textarea
                  placeholder="Share your thoughts and feelings..."
                  className="min-h-[100px]"
                />
              </div>
              <Button>Save Entry</Button>
            </Card>
          </div>

          <div className="mb-8">
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Mood History</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(date) => new Date(date).toLocaleDateString()}
                    />
                    <YAxis domain={[0, 10]} />
                    <Tooltip
                      labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Weekly Summary</h2>
              <p className="text-muted-foreground">
                Your average mood this week: 7.6
              </p>
              <p className="text-muted-foreground">
                Highest mood: 9 (Wednesday)
              </p>
              <p className="text-muted-foreground">
                Lowest mood: 6 (Sunday)
              </p>
            </Card>

            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Insights</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Your mood tends to improve during weekends</li>
                <li>• Morning entries show higher mood scores</li>
                <li>• Consider journaling more regularly</li>
              </ul>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
