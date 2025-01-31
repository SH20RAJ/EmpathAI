import { NextResponse } from "next/server";
import { db } from "@/db";
import { moodEntries } from "@/db/schema/schema";
import { eq, and, gte, lte } from "drizzle-orm";

export async function POST(req) {
  try {
    const { moodScore, notes } = await req.json();

    const [entry] = await db
      .insert(moodEntries)
      .values({
        moodScore,
        notes,
      })
      .returning();

    return NextResponse.json(entry);
  } catch (error) {
    console.error("Mood Entry API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    let query = db
      .select()
      .from(moodEntries);

    if (startDate && endDate) {
      query = query.where(
        and(
          gte(moodEntries.createdAt, new Date(startDate)),
          lte(moodEntries.createdAt, new Date(endDate))
        )
      );
    }

    const entries = await query.orderBy(moodEntries.createdAt);

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Mood Entry API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
