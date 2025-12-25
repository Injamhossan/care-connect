import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";

export async function GET(req) {
  try {
    const db = await getDatabase();
    
    // Check if services collection has data
    const count = await db.collection("services").countDocuments();

    if (count > 0) {
        return NextResponse.json({ message: "Services already exist. No action taken." });
    }

    return NextResponse.json({ message: "No services found. Please add services manually or restore backup." });
  } catch (error) {
    console.error("Error checking seeding:", error);
    return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
  }
}
