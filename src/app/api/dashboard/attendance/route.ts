export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Attendance from "@/models/Attendance";

export async function GET() {
  try {
    await connectDB();
    const records = await Attendance.find().sort({ date: -1 });
    return NextResponse.json(records);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch attendance" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Upsert logic: if record for staff+date exists, update it, else create
    const record = await Attendance.findOneAndUpdate(
      { date: body.date, staffEmail: body.staffEmail },
      body,
      { upsert: true, new: true }
    );
    
    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to mark attendance" }, { status: 500 });
  }
}
