export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ClinicalNote from "@/models/ClinicalNote";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get("taskId");
    const staffId = searchParams.get("staffId");

    const query: any = {};
    if (taskId) query.taskId = taskId;
    if (staffId) query.staffId = staffId;

    const notes = await ClinicalNote.find(query).sort({ loggedAt: -1 });
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch clinical notes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const note = await ClinicalNote.create(body);
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create clinical note" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const { id, ...updates } = await req.json();
    const note = await ClinicalNote.findByIdAndUpdate(id, updates, { new: true });
    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update clinical note" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await ClinicalNote.findByIdAndDelete(id);
    return NextResponse.json({ message: "Clinical note deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete clinical note" }, { status: 500 });
  }
}
