import { NextResponse } from "next/server";
import { User } from "@/models/User";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { getDatabase } from "@/lib/db";

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
       return NextResponse.json({ message: "Missing token or password" }, { status: 400 });
    }

    // Hash the provided token to compare with stored hash
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const db = await getDatabase();
    // Find user with valid token and not expired
    const user = await db.collection("users").findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
        return NextResponse.json({ message: "Token is invalid or has expired" }, { status: 400 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user: Set new password, remove token fields
    await db.collection("users").updateOne(
        { _id: user._id },
        { 
            $set: { password: hashedPassword },
            $unset: { passwordResetToken: "", passwordResetExpires: "" }
        }
    );

    return NextResponse.json({ message: "Password reset successful" }, { status: 200 });

  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
