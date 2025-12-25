import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User } from "@/models/User";

export async function DELETE(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Prevent Admin Deletion - Extra Safety Layer
  if (session.user.role === 'admin') {
      return NextResponse.json({ message: "Admin accounts cannot be deleted." }, { status: 403 });
  }

  try {
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Double check role from DB to be absolutely sure
    if (user.role === 'admin') {
        return NextResponse.json({ message: "Admin accounts cannot be deleted." }, { status: 403 });
    }

    await User.deleteOne({ _id: user._id });

    return NextResponse.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete Account Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
