import { Sidebar } from "@/components/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const resources = [
  {
    title: "Understanding Anxiety",
    description:
      "Learn about the different types of anxiety and effective coping strategies.",
    category: "Mental Health",
    tags: ["anxiety", "stress", "coping"],
    readTime: "5 min",
  },
  {
    title: "Mindfulness Meditation Guide",
    description:
      "A beginner's guide to mindfulness meditation with practical exercises.",
    category: "Wellness",
    tags: ["meditation", "mindfulness", "relaxation"],
    readTime: "8 min",
  },
  {
    title: "Building Healthy Relationships",
    description:
      "Tips for developing and maintaining meaningful relationships in your life.",
    category: "Relationships",
    tags: ["relationships", "communication", "boundaries"],
    readTime: "6 min",
  },
  {
    title: "Sleep Hygiene Tips",
    description:
      "Improve your sleep quality with these evidence-based recommendations.",
    category: "Health",
    tags: ["sleep", "health", "habits"],
    readTime: "4 min",
  },
  {
    title: "Managing Work Stress",
    description:
      "Strategies for handling workplace stress and preventing burnout.",
    category: "Work-Life Balance",
    tags: ["stress", "work", "balance"],
    readTime: "7 min",
  },
  {
    title: "Self-Care Practices",
    description:
      "Essential self-care practices for maintaining mental and emotional well-being.",
    category: "Wellness",
    tags: ["self-care", "wellness", "health"],
    readTime: "5 min",
  },
];

const categories = [
  "All",
  "Mental Health",
  "Wellness",
  "Relationships",
  "Health",
  "Work-Life Balance",
];

export default function ResourcesPage() {
  return (
    <div className="flex h-screen">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-auto p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">Resource Library</h1>
            <p className="text-muted-foreground">
              Explore our collection of mental health resources and self-help guides.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  className="pl-10"
                />
              </div>
              <Button>Search</Button>
            </div>
          </div>

          <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {resources.map((resource) => (
              <Card key={resource.title} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{resource.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {resource.readTime} read
                    </span>
                  </div>
                  <CardTitle className="mt-2">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
