export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

const INITIAL_USERS = [
  {
    name: "Super Admin",
    email: "admin@maasewa.com",
    password: "admin123",
    role: "ADMIN",
  },
  {
    name: "Priya Sharma",
    email: "subadmin@maasewa.com",
    password: "subadmin123",
    role: "SUB_ADMIN",
  },
  {
    name: "Ravi Kumar",
    email: "staff@maasewa.com",
    password: "staff123",
    role: "STAFF",
  },
];

export async function GET() {
  try {
    await connectDB();
    
    // Clear existing users to avoid duplicates if desired, or just use upsert
    for (const u of INITIAL_USERS) {
      await User.findOneAndUpdate({ email: u.email }, u, { upsert: true });
    }

    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
  }
}
