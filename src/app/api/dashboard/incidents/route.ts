export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Incident from "@/models/Incident";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const staffId = searchParams.get("staffId");

    const query: any = {};
    if (status) query.status = status;
    if (staffId) query.staffId = staffId;

    const incidents = await Incident.find(query).sort({ reportedAt: -1 });
    return NextResponse.json(incidents);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch incidents" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const incident = await Incident.create(body);
    return NextResponse.json(incident, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to report incident" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, ...updates } = body;
    const incident = await Incident.findByIdAndUpdate(id, updates, { new: true });
    return NextResponse.json(incident);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update incident" }, { status: 500 });
  }
}
