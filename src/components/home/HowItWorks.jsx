"use client";
import React from 'react';
import { FaSearch, FaCalendarAlt, FaUserCheck, FaHeart } from "react-icons/fa";
import { motion } from "motion/react";

const steps = [
    {
        id: 1,
        title: "Choose Your Service",
        description: "Select the type of care you need - baby, elderly, or sick person care.",
        icon: <FaSearch className="text-3xl text-[#389482]" />,
    },
    {
        id: 2,
        title: "Book Your Schedule",
        description: "Pick your preferred dates, duration, and location for the care service.",
        icon: <FaCalendarAlt className="text-3xl text-[#389482]" />,
    },
    {
        id: 3,
        title: "Get Matched",
        description: "We match you with verified, experienced caregivers in your area.",
        icon: <FaUserCheck className="text-3xl text-[#389482]" />,
    },
    {
        id: 4,
        title: "Receive Quality Care",
        description: "Your caregiver arrives on time and provides exceptional, compassionate care.",
        icon: <FaHeart className="text-3xl text-[#389482]" />,
    }
];

const HowItWorks = () => {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
             {/* Decorative Elements */}
            <motion.div 
               animate={{ y: [0, -20, 0], opacity: [0.5, 0.7, 0.5] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-0 left-0 w-64 h-64 bg-[#389482]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
            ></motion.div>
            <motion.div 
               animate={{ y: [0, 20, 0], opacity: [0.5, 0.7, 0.5] }}
               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
               className="absolute bottom-0 right-0 w-64 h-64 bg-[#ed825e]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
            ></motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-1.5 bg-[#ed825e]/10 rounded-full text-sm font-medium text-[#ed825e] mb-6"
                    >
                        How It Works
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-[#1f242e] mb-6 leading-tight"
                    >
                        Getting Care is Simple
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-gray-600"
                    >
                        Four easy steps to connect with professional caregivers for your loved ones.
                    </motion.p>
                </div>

                {/* Steps Diagram */}
                <div className="relative">
                    {/* Connecting Line (Hidden on mobile) */}
                    <div className="hidden lg:block absolute top-[3.75rem] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#389482]/20 via-[#389482]/40 to-[#389482]/20 -z-10"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                        {steps.map((step, index) => (
                            <motion.div 
                                key={step.id} 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="flex flex-col items-center text-center group"
                            >
                                {/* Icon Container */}
                                <div className="relative mb-8">
                                    <div className="w-32 h-32 bg-[#f4f7f6] rounded-4xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 group-hover:shadow-lg shadow-gray-100 border border-[#389482]/5">
                                        {step.icon}
                                    </div>
                                    {/* Step Number Badge */}
                                    <motion.div 
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.3 + (index * 0.2), type: "spring", stiffness: 200 }}
                                        className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#389482] text-white flex items-center justify-center font-bold text-lg border-4 border-white shadow-lg"
                                    >
                                        {step.id}
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-[#1f242e] mb-4 group-hover:text-[#389482] transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-sm lg:text-base px-2">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
