import { NextResponse } from "next/server";
import { db } from "@/db";
import { resources } from "@/db/schema/schema";
import { like } from "drizzle-orm";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");

    let query = db.select().from(resources);

    if (search) {
      query = query.where(
        like(resources.title, `%${search}%`)
      );
    }

    if (category && category !== "All") {
      query = query.where(
        like(resources.category, `%${category}%`)
      );
    }

    const results = await query;
    return NextResponse.json(results);
  } catch (error) {
    console.error("Resources API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { title, description, category, tags, readTime, content } = await req.json();

    const [newResource] = await db
      .insert(resources)
      .values({
        title,
        description,
        category,
        tags,
        readTime,
        content,
      })
      .returning();

    return NextResponse.json(newResource);
  } catch (error) {
    console.error("Resources API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
