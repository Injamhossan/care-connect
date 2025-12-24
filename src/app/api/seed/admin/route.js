import { NextResponse } from "next/server";
import { User } from "@/models/User";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    const adminEmail = "admin@careconnect.com";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      return NextResponse.json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const adminUser = {
      name: "Super Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      contact: "01700000000",
      nid: "0000000000",
      createdAt: new Date(),
    };

    await User.create(adminUser);

    return NextResponse.json({ message: "Admin created successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
