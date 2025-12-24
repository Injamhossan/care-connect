import { NextResponse } from "next/server";
import { Service } from "@/models/Service";
import { ObjectId } from "mongodb";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID parameter is required" }, { status: 400 });
  }

  try {
    const service = await Service.findById(id);
    if (!service) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
