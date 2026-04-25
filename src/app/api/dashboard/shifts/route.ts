export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Shift from "@/models/Shift";

export async function GET() {
  try {
    await connectDB();
    const shifts = await Shift.find({}).sort({ date: -1, startTime: 1 });
    return NextResponse.json(shifts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch shifts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { staffEmail, date, startTime, endTime } = body;

    // Double-Booking Validation
    const overlappingShift = await Shift.findOne({
      staffEmail,
      date,
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime }
        }
      ]
    });

    if (overlappingShift) {
      return NextResponse.json({ 
        error: `Staff already booked for a shift from ${overlappingShift.startTime} to ${overlappingShift.endTime} on this date.` 
      }, { status: 400 });
    }

    const newShift = await Shift.create(body);
    return NextResponse.json(newShift, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create shift" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { id, ...updateData } = await req.json();
    
    // Validate overlap excluding current shift
    if (updateData.staffEmail && updateData.date) {
      const overlappingShift = await Shift.findOne({
        _id: { $ne: id },
        staffEmail: updateData.staffEmail,
        date: updateData.date,
        $or: [
          {
            startTime: { $lt: updateData.endTime },
            endTime: { $gt: updateData.startTime }
          }
        ]
      });

      if (overlappingShift) {
        return NextResponse.json({ 
          error: `Overlap detected with existing shift: ${overlappingShift.startTime}-${overlappingShift.endTime}` 
        }, { status: 400 });
      }
    }

    const updated = await Shift.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update shift" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await Shift.findByIdAndDelete(id);
    return NextResponse.json({ message: "Shift deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete shift" }, { status: 500 });
  }
}
