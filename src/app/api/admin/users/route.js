import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User } from "@/models/User";
import { getDatabase } from "@/lib/db";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await getDatabase();
    const users = await db.collection("users").find({ role: { $ne: 'admin' } }).toArray();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
}
