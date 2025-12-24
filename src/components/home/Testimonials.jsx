"use client";
import React from 'react';
import Image from 'next/image';
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import TestImg from '../../assets/test-1.jpg'
import TestImg2 from '../../assets/test-2.jpg'
import { motion } from "motion/react";

const testimonials = [
    {
        id: 1,
        quote: "Finding a reliable babysitter used to be so stressful. CareConnect matched us with Maria, who has become like family. Our kids adore her!",
        name: "Sarah Johnson",
        role: "Mother of Two",
        service: "Baby Care",
        image: TestImg, 
        rating: 5
    },
    {
        id: 2,
        quote: "My father needed daily assistance after his hip surgery. The caregiver from CareConnect was professional, patient, and genuinely caring.",
        name: "Michael Chen",
        role: "Son & Caregiver",
        service: "Elderly Care",
        image: TestImg2, 
        rating: 5
    },
    {
        id: 3,
        quote: "After my mother's surgery, we needed someone to help her recover at home. The care was exceptional – she's back on her feet now!",
        name: "Emily Rodriguez",
        role: "Daughter",
        service: "Sick Person Care",
        image: TestImg, 
        rating: 5
    }
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-[#1F242E]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-1.5 bg-[#2A303C] rounded-full text-sm font-medium text-[#389482] mb-6 border border-[#389482]/20"
                    >
                        Testimonials
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                    >
                        Trusted by Thousands of Families
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-gray-400"
                    >
                        See what our happy customers have to say about their experience with CareConnect.
                    </motion.p>
                </div>

                {/* Testimonial Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div 
                            key={testimonial.id} 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-[#2A323E] rounded-3xl p-8 border border-gray-700/50 hover:border-[#389482]/30 transition-all duration-300 flex flex-col h-full hover:bg-[#2e3744]"
                        >
                            {/* Quote Icon */}
                            <div className="mb-6">
                                <FaQuoteLeft className="text-4xl text-[#389482]/20" />
                            </div>

                            {/* Quote Text */}
                            <p className="text-gray-300 text-lg leading-relaxed mb-8 italic flex-grow">
                                "{testimonial.quote}"
                            </p>

                            {/* Rating */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <FaStar key={i} className="text-[#ED825E] text-sm" />
                                ))}
                            </div>

                            {/* User Profile */}
                            <div className="flex items-center justify-between border-t border-gray-700 pt-6">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#389482]/20">
                                        <Image 
                                            src={testimonial.image} 
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm">{testimonial.name}</h4>
                                        <p className="text-gray-500 text-xs">{testimonial.role}</p>
                                    </div>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-[#389482]/10 text-[#389482] text-xs font-medium border border-[#389482]/20">
                                    {testimonial.service}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
