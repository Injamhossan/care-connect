import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";
import { User } from "@/models/User";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDatabase();
    const dbName = db.databaseName;
    
    // Check Admin
    const admin = await User.findOne({ email: "admin@careconnect.com" });
    
    // Count Users
    const userCount = await db.collection("users").countDocuments();

    return NextResponse.json({ 
      connectedDatabase: dbName,
      adminFound: !!admin,
      adminDetails: admin ? { 
          id: admin._id, 
          email: admin.email, 
          role: admin.role 
      } : null,
      totalUsers: userCount,
      message: "This confirms where data is being stored."
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
