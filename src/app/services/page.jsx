import React from "react";
import { Service } from "@/models/Service";
import ServicesClient from "@/components/service/ServicesClient";

// Force dynamic rendering since we are fetching data
export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  let services = [];
  try {
     services = await Service.findAll();
  } catch (err) {
    console.error("Error loading services:", err);
  }

  const serializedServices = services.map(service => ({
    ...service,
    _id: service._id.toString(),
  }));

  return <ServicesClient services={serializedServices} />;
}
