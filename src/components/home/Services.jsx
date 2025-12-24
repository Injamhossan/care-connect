"use client";
import React from 'react';
import { FaBaby, FaUserNurse, FaHeartbeat } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { motion } from "motion/react";

const services = [
    {
        id: 1,
        title: "Baby Care",
        description: "Professional nannies and babysitters who provide loving, attentive care for your little ones. From newborns to toddlers.",
        features: ["Feeding & Diaper Care", "Sleep Training", "Educational Activities", "Safety First"],
        price: "25",
        icon: <FaBaby className="text-2xl text-[#389482]" />,
        iconBg: "bg-[#389482]/10",
        delay: 0
    },
    {
        id: 2,
        title: "Elderly Care",
        description: "Compassionate companions and caregivers for seniors who need assistance with daily activities or companionship.",
        features: ["Daily Assistance", "Medication Reminders", "Mobility Support", "Companionship"],
        price: "30",
        icon: <FaUserNurse className="text-2xl text-[#389482]" />,
        iconBg: "bg-[#389482]/10",
        delay: 0.2
    },
    {
        id: 3,
        title: "Sick Person Care",
        description: "Trained caregivers to assist those recovering from illness or surgery, ensuring comfort and proper care.",
        features: ["Post-Surgery Care", "Medication Management", "Recovery Support", "Health Monitoring"],
        price: "35",
        icon: <FaHeartbeat className="text-2xl text-[#389482]" />,
        iconBg: "bg-[#389482]/10",
        delay: 0.4
    }
];

const Services = () => {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-[#389482] mb-6"
                    >
                        Our Services
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                    >
                        Care Services Tailored to Your Needs
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-gray-600"
                    >
                        We offer specialized care services for every stage of life, delivered by vetted, compassionate professionals.
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {services.map((service) => (
                        <motion.div 
                            key={service.id} 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: service.delay }}
                            className="bg-white rounded-3xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group"
                        >
                            {/* Icon */}
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${service.iconBg}`}>
                                {service.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                {service.description}
                            </p>

                            {/* Features List */}
                            <div className="space-y-3 mb-8 grow">
                                {service.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-gray-600 text-sm font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#389482]/60"></div>
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-gray-100 w-full mb-6"></div>

                            {/* Footer */}
                            <div className="flex items-center justify-between mt-auto">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Starting at</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-[#1f242e]">${service.price}</span>
                                        <span className="text-gray-500 text-sm font-medium">/hr</span>
                                    </div>
                                </div>
                                <button className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 font-medium hover:border-[#389482] hover:text-[#389482] transition-colors flex items-center gap-2 text-sm group-hover:border-[#389482] group-hover:text-[#389482]">
                                    Learn More
                                    <BsArrowRight className="text-lg" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Button */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center"
                >
                    <button className="btn btn-primary text-white rounded-full bg-[#389482] border-none px-8 py-3 h-auto min-h-0 text-base font-semibold shadow-lg shadow-[#389482]/20 hover:shadow-[#389482]/30 transition-all hover:scale-105 active:scale-95">
                        View All Services
                        <BsArrowRight className="ml-2 text-lg" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
