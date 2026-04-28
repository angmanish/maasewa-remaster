export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Equipment from "@/models/Equipment";

export async function GET() {
  try {
    await dbConnect();
    const items = await Equipment.find({}).sort({ itemName: 1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch equipment" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const item = await Equipment.create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add equipment" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, ...updates } = body;
    const item = await Equipment.findByIdAndUpdate(id, updates, { new: true });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update equipment" }, { status: 500 });
  }
}
