export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Rating from "@/models/Rating";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const staffId = searchParams.get("staffId");

    const query: any = {};
    if (staffId) query.staffId = staffId;

    const ratings = await Rating.find(query).sort({ ratedAt: -1 });
    return NextResponse.json(ratings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch ratings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const rating = await Rating.create(body);
    return NextResponse.json(rating, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit rating" }, { status: 500 });
  }
}
