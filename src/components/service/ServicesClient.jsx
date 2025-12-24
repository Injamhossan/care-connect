"use client";
import React from "react";
import { FaShieldAlt, FaClock, FaAward, FaHandHoldingHeart } from "react-icons/fa";
import { FaBaby, FaUserNurse, FaHeartbeat, FaStethoscope } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";

const features = [
  {
    icon: <FaShieldAlt className="text-2xl text-[#389482]" />,
    title: "Verified Caregivers",
    description: "All caregivers undergo thorough background checks and verification",
    bg: "bg-[#e7f0eb]",
  },
  {
    icon: <FaClock className="text-2xl text-[#389482]" />,
    title: "Flexible Scheduling",
    description: "Book care services that fit your schedule, from hours to 24/7 care",
    bg: "bg-[#e7f0eb]",
  },
  {
    icon: <FaAward className="text-2xl text-[#389482]" />,
    title: "Quality Guaranteed",
    description: "Satisfaction guaranteed with our trained and experienced caregivers",
    bg: "bg-[#e7f0eb]",
  },
  {
    icon: <FaHandHoldingHeart className="text-2xl text-[#389482]" />,
    title: "Personalized Care",
    description: "Care plans tailored to meet your specific needs and preferences",
    bg: "bg-[#e7f0eb]",
  },
];

// Helper to get icon based on title/category
const getServiceIcon = (title) => {
  const lowerTitle = title?.toLowerCase() || "";
  if (lowerTitle.includes("baby") || lowerTitle.includes("child")) return <FaBaby className="text-2xl text-[#389482]" />;
  if (lowerTitle.includes("elder") || lowerTitle.includes("senior")) return <FaUserNurse className="text-2xl text-white" />;
  if (lowerTitle.includes("sick") || lowerTitle.includes("patient")) return <FaHeartbeat className="text-2xl text-[#389482]" />;
  return <FaStethoscope className="text-2xl text-[#389482]" />;
};

const ServicesClient = ({ services = [] }) => {
  return (
    <div className="min-h-screen pb-20 bg-white">
      {/* Header Section */}
      <section className="px-4 pt-10 pb-16 text-center lg:pt-25">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 bg-[#e7f0eb] rounded-full text-sm font-medium text-[#389482] mb-6"
        >
           Our Services
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-[#1f242e] mb-6 max-w-3xl mx-auto leading-tight"
        >
          Professional Care Services for <br /> Every Need
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg text-gray-600"
        >
          From infant care to elderly assistance, our verified caregivers provide compassionate, reliable care that gives you peace of mind.
        </motion.p>
      </section>

      {/* Features Grid */}
      <section className="px-4 mx-auto mb-24 max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 transition-shadow bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                
              <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-[#1f242e] mb-2">{feature.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-500">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Cards */}
      <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {services.length === 0 ? (
           <div className="text-center text-gray-500 py-10">
             No services found.
           </div>
        ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service, idx) => {
             const isHighlight = idx === 1; // Example highlight logic

             return (
            <motion.div 
              key={service._id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + (idx * 0.2) }}
              className={`rounded-3xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl group ${
                isHighlight ? "bg-[#389482] text-white shadow-lg shadow-[#389482]/30" : "bg-white border border-gray-100 shadow-sm"
              }`}
            >
              {/* Image Header */}
              <div className="relative h-56 overflow-hidden bg-gray-100">
                 {service.image ? (
                   <Image 
                     src={service.image} 
                     alt={service.title} 
                     fill 
                     className="object-cover transition-transform duration-500 group-hover:scale-105"
                   />
                 ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                 )}
                 {/* Curve Overlay */}
                 <div className={`absolute -bottom-1 left-0 right-0 h-6 ${isHighlight ? "bg-[#389482]" : "bg-white"} rounded-t-4xl`}></div>
              </div>

              <div className="flex flex-col p-8 grow">
                 {/* Icon */}
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${isHighlight ? "bg-white/20" : "bg-[#389482]/10"}`}>
                    {getServiceIcon(service.title)}
                 </div>

                 <h3 className={`text-2xl font-bold mb-3 ${isHighlight ? "text-white" : "text-[#1f242e]"}`}>
                    {service.title}
                 </h3>
                 <p className={`mb-8 leading-relaxed line-clamp-3 ${isHighlight ? "text-white/80" : "text-gray-600"}`}>
                    {service.description}
                 </p>

                 {/* Included Services Preview */}
                 {service.includedServices && (
                     <div className="mb-8 space-y-3 grow">
                        {service.includedServices.slice(0, 4).map((feature, fIdx) => (
                            <div key={fIdx} className={`flex items-center gap-3 text-sm font-medium ${isHighlight ? "text-white/90" : "text-gray-600"}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${isHighlight ? "bg-white" : "bg-[#389482]"}`}></div>
                                {feature}
                            </div>
                        ))}
                     </div>
                 )}

                  {/* Divider */}
                  <div className={`h-px w-full mb-6 ${isHighlight ? "bg-white/20" : "bg-gray-100"}`}></div>

                 {/* Price & Action */}
                 <div className="flex items-center justify-between mt-auto">
                    <div>
                        <p className={`text-xs mb-1 ${isHighlight ? "text-white/70" : "text-gray-500"}`}>Starting at</p>
                        <div className="flex items-baseline gap-1">
                            <span className={`text-2xl font-bold ${isHighlight ? "text-white" : "text-[#1f242e]"}`}>${service.startingPrice}</span>
                            <span className={`text-sm font-medium ${isHighlight ? "text-white/70" : "text-gray-500"}`}>/{service.priceUnit || 'hr'}</span>
                        </div>
                    </div>
                    <Link
                      href={`/services/${service._id}`} 
                      className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${
                        isHighlight 
                        ? "bg-white text-[#389482] hover:bg-gray-100" 
                        : "bg-[#389482] text-white hover:bg-[#2f7f70]"
                    }`}>
                        View Details
                        <BsArrowRight className="text-lg" />
                    </Link>
                 </div>
              </div>
            </motion.div>
             )
        })}
        </div>
        )}
      </section>
    </div>
  );
};

export default ServicesClient;
