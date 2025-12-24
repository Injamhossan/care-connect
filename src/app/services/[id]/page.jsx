import React from "react";
import { Service } from "@/models/Service";
import Image from "next/image";
import { notFound } from "next/navigation";
import { 
  HiCheckCircle, 
  HiShieldCheck, 
  HiAcademicCap, 
  HiClipboardList, 
  HiCurrencyDollar 
} from "react-icons/hi";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

// Generic placeholder if no image provided in DB
const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2000&auto=format&fit=crop";

export default async function ServiceDetailsPage(props) {
  const params = await props.params;
  const { id } = params;
  const service = await Service.findById(id);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section with Image */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <Image
          src={service.image || PLACEHOLDER_IMAGE}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 text-white">
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors backdrop-blur-md bg-white/10 px-4 py-2 rounded-full text-sm"
          >
            <BsArrowLeft /> Back to Services
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            {service.title}
          </h1>
          {service.tagline && (
            <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl">
              {service.tagline}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            
            {/* Description Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this Service</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                {service.description}
              </p>
            </div>

            {/* Included Services */}
            {service.includedServices?.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-100 rounded-xl text-[#389482]">
                    <HiCheckCircle className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">What's Included</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.includedServices.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-[#389482]/5 transition-colors group">
                      <HiCheckCircle className="text-[#389482] text-xl mt-0.5 group-hover:scale-110 transition-transform" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Caregiver Qualifications */}
            {service.caregiverQualifications?.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                    <HiAcademicCap className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Caregiver Qualifications</h2>
                </div>
                <ul className="space-y-4">
                  {service.caregiverQualifications.map((qual, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                      {qual}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Safety & Trust */}
            {service.safetyAndTrust?.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                    <HiShieldCheck className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Safety & Trust</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {service.safetyAndTrust.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                         <HiShieldCheck className="text-gray-300 text-lg" />
                         <span className="text-gray-600">{item}</span>
                      </div>
                   ))}
                </div>
              </div>
            )}

            {/* Booking Steps */}
             {service.bookingSteps?.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
                    <HiClipboardList className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">How it Works</h2>
                </div>
                <div className="space-y-6">
                   {service.bookingSteps.map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                         <div className="flex-none flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#389482] text-white flex items-center justify-center font-bold text-sm">
                              {idx + 1}
                            </div>
                            {idx !== service.bookingSteps.length - 1 && (
                               <div className="w-0.5 h-full bg-gray-100" />
                            )}
                         </div>
                         <div className="pb-6">
                            <p className="text-gray-800 font-medium">{step}</p>
                         </div>
                      </div>
                   ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-96 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 sticky top-24">
              <div className="mb-6">
                <p className="text-gray-500 text-sm font-medium mb-1">Starting from</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#1f242e]">${service.startingPrice}</span>
                  <span className="text-gray-500 font-medium">/{service.priceUnit || 'hr'}</span>
                </div>
              </div>

              <hr className="border-dashed border-gray-200 mb-6" />

              <div className="space-y-4 mb-8">
                 <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Service Status</span>
                    <span className={`px-3 py-1 rounded-full font-medium ${service.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {service.isActive ? 'Active' : 'Unavailable'}
                    </span>
                 </div>
                 <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium text-gray-900">Customizable</span>
                 </div>
              </div>

              <Link 
                href={`/dashboard/book-service/${id}`}
                className="w-full bg-[#389482] hover:bg-[#2f7f70] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#389482]/30 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Book This Service <BsArrowRight className="text-lg" />
              </Link>
              
              <p className="text-xs text-center text-gray-400 mt-4">
                No payment required until service confirmation.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
