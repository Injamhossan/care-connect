import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";

const services = [
  {
    slug: "baby-care",
    title: "Baby Care",
    tagline: "Expert care for your little ones",
    description: "Our Baby Care service provides professional nannies and babysitters who are trained to look after infants and toddlers. We ensure a safe, engaging, and nurturing environment for your children while you are away.",
    startingPrice: 25,
    priceUnit: "hr",
    includedServices: [
        "Feeding & Diaper Care",
        "Sleep Training Support",
        "Educational Activities",
        "Safety First Approach",
        "Playtime Supervision"
    ],
    caregiverQualifications: [
        "Certified Child Care Professional",
        "First Aid & CPR Certified",
        "Background Checked",
        "Minimum 2 Years Experience"
    ],
    safetyAndTrust: [
        "Identity Verification",
        "Reference Checks",
        "Real-time Updates",
        "Insurance Coverage"
    ],
    bookingSteps: [
        "Select Service & Duration",
        "Meet Your Caregiver (Optional)",
        "Confirm Booking & Pay",
        "Relax while we care"
    ],
    isActive: true,
    image: "https://images.unsplash.com/photo-1549488497-6cb563cd655a?q=80&w=2070&auto=format&fit=crop", 
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    slug: "elderly-care",
    title: "Elderly Care",
    tagline: "Compassionate companionship for seniors",
    description: "Our Elderly Care service is designed to support seniors with daily living activities, ensuring they can live independently and comfortably in their own homes. Our caregivers are patient, respectful, and trained in senior care.",
    startingPrice: 30,
    priceUnit: "hr",
    includedServices: [
        "Daily Living Assistance",
        "Medication Reminders",
        "Mobility Support",
        "Companionship & Conversation",
        "Light Housekeeping"
    ],
    caregiverQualifications: [
        "Geriatric Care Certification",
        "Mobility Support Training",
        "First Aid Certified",
        "Compassionate & Patient"
    ],
    safetyAndTrust: [
        "Enhanced Background Checks",
        "Health Screening",
        "Emergency Protocols",
        "Family Support Line"
    ],
    bookingSteps: [
        "Consultation Call",
        "Care Plan Creation",
        "Caregiver Matching",
        "Service Starts"
    ],
    isActive: true,
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2000&auto=format&fit=crop",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    slug: "sick-person-care",
    title: "Sick Person Care",
    tagline: "Dedicated support for recovery and healing",
    description: "Recovering from an illness or surgery can be challenging. Our Sick Person Care service provides dedicated assistance to help manage medication, hygiene, and comfort during the recovery process.",
    startingPrice: 35,
    priceUnit: "hr",
    includedServices: [
        "Post-Surgery Care",
        "Medication Management",
        "Wound Care Assistance",
        "Recovery Monitoring",
        "Vital Signs Checking"
    ],
    caregiverQualifications: [
        "Nursing Assistant / RN",
        "Post-Operative Care Training",
        "Infection Control Knowledge",
        "Emergency Response Trained"
    ],
    safetyAndTrust: [
        "Medical Background Verified",
        "Hygiene Protocols",
        "Daily Health Logs",
        "Doctor Coordination"
    ],
    bookingSteps: [
        "Provide Medical Requirements",
        "Nurse/Caregiver Assignment",
        "Safety Assessment",
        "Care Begins"
    ],
    isActive: true,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=300",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export async function GET(req) {
  try {
    const db = await getDatabase();
    
    // Clear existing to avoid duplicates in the new DB
    await db.collection("services").deleteMany({}); 

    const result = await db.collection("services").insertMany(services);

    return NextResponse.json({ 
        message: "Services seeded successfully in care_connect", 
        insertedCount: result.insertedCount 
    });
  } catch (error) {
    console.error("Seeding Error:", error);
    return NextResponse.json({ message: "Error seeding services", error: error.message }, { status: 500 });
  }
}
