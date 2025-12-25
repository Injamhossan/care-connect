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
        name: "Salah Johnson",
        role: "Father of Two",
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
        role: "Son",
        service: "Sick Person Care",
        image: TestImg, 
        rating: 5
    }
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-white">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-3xl mx-auto mb-16 text-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-1.5 bg-[#389482]/10 rounded-full text-sm font-medium text-[#389482] mb-6 border border-[#389482]/20"
                    >
                        Testimonials
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl"
                    >
                        Trusted by Thousands of Families
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-gray-600"
                    >
                        See what our happy customers have to say about their experience with CareConnect.
                    </motion.p>
                </div>

                {/* Testimonial Cards */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <motion.div 
                            key={testimonial.id} 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-[#389482]/30 transition-all duration-300 flex flex-col h-full hover:bg-white hover:shadow-xl hover:shadow-[#389482]/5"
                        >
                            {/* Quote Icon */}
                            <div className="mb-6">
                                <FaQuoteLeft className="text-4xl text-[#389482]/20" />
                            </div>

                            {/* Quote Text */}
                            <p className="flex-grow mb-8 text-lg italic leading-relaxed text-gray-600">
                                "{testimonial.quote}"
                            </p>

                            {/* Rating */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <FaStar key={i} className="text-[#ED825E] text-sm" />
                                ))}
                            </div>

                            {/* User Profile */}
                            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
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
                                        <h4 className="text-sm font-bold text-gray-900">{testimonial.name}</h4>
                                        <p className="text-xs text-gray-500">{testimonial.role}</p>
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
