export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Vendor from "@/models/Vendor";

export async function GET() {
  try {
    await connectDB();
    const vendors = await Vendor.find().sort({ name: 1 });
    return NextResponse.json(vendors);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch vendors" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newVendor = await Vendor.create(body);
    return NextResponse.json(newVendor, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create vendor" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { id, ...updateData } = await req.json();
    const updated = await Vendor.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update vendor" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("ID required");
    await Vendor.findByIdAndDelete(id);
    return NextResponse.json({ message: "Vendor deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete vendor" }, { status: 500 });
  }
}
