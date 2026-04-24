export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Leave from "@/models/Leave";

export async function GET() {
  try {
    await connectDB();
    const leaves = await Leave.find().sort({ appliedAt: -1 });
    return NextResponse.json(leaves);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leaves" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newLeave = await Leave.create({
      ...body,
      status: "Pending",
      appliedAt: new Date().toISOString()
    });
    return NextResponse.json(newLeave, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to apply leave" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { id, ...updateData } = await req.json();
    const updated = await Leave.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update leave request" }, { status: 500 });
  }
}
