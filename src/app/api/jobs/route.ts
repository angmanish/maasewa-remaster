import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Job from "@/models/Job";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get("active") === "true";

    const query = activeOnly ? { isActive: true } : {};
    const jobs = await Job.find(query).sort({ createdAt: -1 });

    return NextResponse.json(jobs, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Basic validation
    if (!body.title || !body.description || !body.location || !body.jobType) {
      return NextResponse.json(
        { error: "Title, description, location, and jobType are required." },
        { status: 400 }
      );
    }

    const newJob = await Job.create(body);
    return NextResponse.json(newJob, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
