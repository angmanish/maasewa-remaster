export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Salary from "@/models/Salary";

export async function GET() {
  try {
    await connectDB();
    const salaries = await Salary.find().sort({ month: -1 });
    return NextResponse.json(salaries);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch salaries" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newSalary = await Salary.create(body);
    return NextResponse.json(newSalary, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate salary" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { id, status } = await req.json();
    const updated = await Salary.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update salary status" }, { status: 500 });
  }
}
