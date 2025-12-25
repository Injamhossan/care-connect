import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Booking } from "@/models/Booking";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const bookings = await Booking.findByEmail(session.user.email);
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role === 'admin') {
    return NextResponse.json({ message: "Admins cannot create bookings" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { serviceId, serviceName, date, time, address, price, duration, image, notes, paymentInfo } = body;

    // Basic validation
    if (!serviceId || !date || !address) {
       return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const bookingData = {
      userEmail: session.user.email,
      userName: session.user.name,
      serviceId,
      service: serviceName,
      date: new Date(date),
      time,
      address,
      price,
      duration,
      image,
      notes,
      status: 'Pending',
      paymentStatus: paymentInfo ? 'Paid' : 'Unpaid',
      paymentInfo: paymentInfo || null,
      createdAt: new Date()
    };

    const result = await Booking.create(bookingData);

    return NextResponse.json({ message: "Booking created successfully", bookingId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json({ message: "Error creating booking" }, { status: 500 });
  }
}
