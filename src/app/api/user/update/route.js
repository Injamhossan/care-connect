import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User } from "@/models/User";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // Exclude password
    const { password, ...userProfile } = user;
    return NextResponse.json(userProfile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, contact } = body; // Allow updating name and phone for now

    const updateResult = await User.update(session.user.email, { name, contact });

    if (updateResult.modifiedCount === 0) {
       // This might happen if new data is same as old, but strictly speaking it's not an error.
       // However, if matchedCount is 0, then user not found.
       if (updateResult.matchedCount === 0) {
         return NextResponse.json({ message: "User not found" }, { status: 404 });
       }
    }

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
