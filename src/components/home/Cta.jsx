"use client";
import React from 'react';
import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import { motion } from "motion/react";

const Cta = () => {
    return (
        <section className="py-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-24 text-center"
                >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-linear-to-br from-[#389482] to-[#2A7566]"></div>
                    
                    {/* Decorative blurred circles (optional for depth) */}
                    <div className="absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 translate-x-1/2 translate-y-1/2 rounded-full bg-black/10 blur-3xl"></div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl"
                        >
                            Ready to Find the Perfect <br className="hidden md:block" /> Caregiver?
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="max-w-2xl mx-auto mb-10 text-lg font-medium leading-relaxed text-emerald-50"
                        >
                            Join thousands of families who trust CareConnect for quality, compassionate care. Get started today with a free consultation.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-col items-center justify-center gap-5 sm:flex-row"
                        >
                            <button className="px-8 py-4 rounded-full bg-white text-[#389482] font-bold text-base hover:bg-gray-50 hover:shadow-lg transition-all flex items-center gap-2 group transform hover:scale-105 active:scale-95">
                                Book a Service
                                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                            </button>
                            <button className="flex items-center gap-2 px-8 py-4 text-base font-bold text-white transition-all transform bg-transparent border rounded-full border-white/30 hover:bg-white/10 hover:border-white hover:scale-105 active:scale-95">
                                <FaPhoneAlt className="text-sm" />
                                Call Us Now
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Cta;
