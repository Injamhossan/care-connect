import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User } from "@/models/User";
import bcrypt from "bcrypt";
import { getDatabase } from "@/lib/db";

export async function PUT(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    
    // Check if user is created via Google (no password)
    if (!user.password) {
         return NextResponse.json({ message: "Users logged in via Google cannot change password here." }, { status: 400 });
    }

    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "Incorrect current password" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await User.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });

    return NextResponse.json({ message: "Password updated successfully" });

  } catch (error) {
    console.error("Change Password Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
