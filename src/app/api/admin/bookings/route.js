import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await getDatabase();
    const bookings = await db.collection("bookings").find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching bookings" }, { status: 500 });
  }
}

export async function PATCH(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    const db = await getDatabase();
    
    await db.collection("bookings").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status } }
    );

    return NextResponse.json({ message: "Booking updated" });
  } catch (error) {
    return NextResponse.json({ message: "Error updating booking" }, { status: 500 });
  }
}
