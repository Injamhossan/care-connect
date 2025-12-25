import { NextResponse } from "next/server";
import { User } from "@/models/User";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      // For security, do not reveal if user does not exist
      return NextResponse.json({ message: "If your email is registered, you will receive a reset link." }, { status: 200 });
    }

    if (user.provider === 'google') {
       return NextResponse.json({ message: "This email is registered with Google. Please sign in with Google." }, { status: 400 });
    }

    // Generate Token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    
    // Expires in 10 mins
    const passwordResetExpires = Date.now() + 10 * 60 * 1000; 

    await User.update(email, {
       passwordResetToken,
       passwordResetExpires
    });

    const resetURL = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    // MOCK EMAIL SENDING
    console.log("==========================================");
    console.log("MOCK EMAIL SERVICE: PASSWORD RESET LINK");
    console.log(`To: ${email}`);
    console.log(`Link: ${resetURL}`);
    console.log("==========================================");

    return NextResponse.json({ message: "Reset link sent!" }, { status: 200 });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
