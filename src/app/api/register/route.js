import { NextResponse } from "next/server";
import { User } from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, contact, nid, password } = body;

    // Basic Validation
    if (!name || !email || !contact || !nid || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check for existing user
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = {
      name,
      email,
      contact,
      nid,
      password: hashedPassword,
      createdAt: new Date(),
      role: 'user', // Default role
    };

    await User.create(newUser);

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
