export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Invoice from "@/models/Invoice";

export async function GET() {
  try {
    await connectDB();
    const invoices = await Invoice.find({}).sort({ createdAt: -1 });
    return NextResponse.json(invoices);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Auto-generate Bill Number if not provided
    if (!body.billNumber) {
      const count = await Invoice.countDocuments();
      const year = new Date().getFullYear();
      body.billNumber = `INV-${year}-${(count + 1).toString().padStart(4, "0")}`;
    }

    const newInvoice = await Invoice.create(body);
    return NextResponse.json(newInvoice, { status: 201 });
  } catch (error) {
    console.error("Invoice POST Error:", error);
    return NextResponse.json({ error: "Failed to generate invoice" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { id, ...updateData } = await req.json();
    const updated = await Invoice.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update invoice" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await Invoice.findByIdAndDelete(id);
    return NextResponse.json({ message: "Invoice deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete invoice" }, { status: 500 });
  }
}
