"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { FaHandHoldingHeart, FaUsers, FaStar, FaShieldAlt, FaCheckCircle, FaHeart } from 'react-icons/fa';
import AboutHero from '../../assets/hand.jpg'; // Reusing this as it's a good generic "care" image
import Test1 from '../../assets/test-1.jpg';
import Test2 from '../../assets/test-2.jpg';

const stats = [
    { label: "Years of Service", value: "10+" },
    { label: "Families Served", value: "15k+" },
    { label: "Qualified Caregivers", value: "500+" },
    { label: "Happy Clients", value: "98%" },
];

const values = [
    {
        icon: <FaHandHoldingHeart className="text-3xl text-[#389482]" />,
        title: "Compassion",
        description: "We treat every individual with the utmost kindness, empathy, and respect, just like family."
    },
    {
        icon: <FaShieldAlt className="text-3xl text-[#389482]" />,
        title: "Trust & Safety",
        description: " rigorous background checks and vetting processes ensure your loved ones are in safe hands."
    },
    {
        icon: <FaStar className="text-3xl text-[#389482]" />,
        title: "Excellence",
        description: "We are committed to maintaining the highest standards of care and continuous improvement."
    },
    {
        icon: <FaUsers className="text-3xl text-[#389482]" />,
        title: "Community",
        description: "Building strong, supportive relationships between families and caregivers is at our core."
    }
];

const AboutPage = () => {
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
                    About Us
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold text-[#1f242e] mb-6 max-w-4xl mx-auto leading-tight"
                >
                    We Are Dedicating to <br />
                    <span className="text-[#389482]">Caring for Your Loved Ones</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-2xl mx-auto text-lg text-gray-600"
                >
                    At CareConnect, our mission is to provide accessible, reliable, and compassionate care services that empower families and enhance quality of life.
                </motion.p>
            </section>

            {/* Story Section */}
            <section className="px-4 mx-auto mb-24 max-w-7xl sm:px-6 lg:px-8">
                <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative overflow-hidden shadow-2xl h-125 rounded-3xl"
                    >
                        <Image
                            src={AboutHero}
                            alt="Caregiver holding hands"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-end p-8 bg-linear-to-t from-black/60 to-transparent">
                            <div className="text-white">
                                <p className="mb-2 text-lg font-medium">Since 2015</p>
                                <h3 className="text-3xl font-bold">Making a difference in thousands of lives.</h3>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-[#1f242e] mb-6">Our Story</h2>
                        <p className="mb-6 text-lg leading-relaxed text-gray-600">
                            Founded on the belief that everyone deserves high-quality care, CareConnect started helping a few local families find trusted babysitters. Over the years, we recognized the growing need for specialized care for the elderly and those recovering from illness.
                        </p>
                        <p className="mb-8 text-lg leading-relaxed text-gray-600">
                            Today, we are a comprehensive care platform connecting vetted professionals with families across the country. We believe in the power of human connection and the peace of mind that comes with knowing your loved ones are safe and happy.
                        </p>

                        <div className="flex flex-col gap-6 sm:flex-row">
                           <div className="flex items-start gap-3">
                                <FaCheckCircle className="text-[#389482] mt-1 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-[#1f242e]">Verified Professionals</h4>
                                    <p className="text-sm text-gray-500">Every caregiver matches our high standards.</p>
                                </div>
                           </div>
                           <div className="flex items-start gap-3">
                                <FaCheckCircle className="text-[#389482] mt-1 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-[#1f242e]">24/7 Support</h4>
                                    <p className="text-sm text-gray-500">We are always here when you need us.</p>
                                </div>
                           </div>
                        </div>
                    </motion.div>
                </div>
            </section>

             {/* Stats Section */}
             <section className="bg-[#389482] py-20 mb-24">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 text-center text-white md:grid-cols-4">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <h3 className="mb-2 text-4xl font-bold md:text-5xl">{stat.value}</h3>
                                <p className="font-medium text-emerald-100">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="px-4 mx-auto mb-24 max-w-7xl sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1f242e] mb-4">Our Core Values</h2>
                    <p className="max-w-2xl mx-auto text-gray-600">The principles that guide us in everything we do.</p>
                </div>
                
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {values.map((val, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="p-8 text-center transition-shadow bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl"
                        >
                            <div className="w-16 h-16 mx-auto bg-[#e7f0eb] rounded-full flex items-center justify-center mb-6">
                                {val.icon}
                            </div>
                            <h3 className="text-xl font-bold text-[#1f242e] mb-3">{val.title}</h3>
                            <p className="text-sm leading-relaxed text-gray-600">
                                {val.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Team/Join Section */}
            <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-900 rounded-[3rem] overflow-hidden relative"
                >
                    <div className="absolute inset-0 opacity-20">
                         {/* Abstract background graphics */}
                         <div className="absolute top-0 right-0 w-96 h-96 bg-[#389482] blur-[100px] rounded-full"></div>
                         <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 blur-[100px] rounded-full"></div>
                    </div>

                    <div className="relative z-10 grid items-center grid-cols-1 gap-12 p-12 lg:grid-cols-2 lg:p-24">
                        <div>
                            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                                Ready to join our mission?
                            </h2>
                            <p className="mb-8 text-lg leading-relaxed text-gray-300">
                                Whether you are looking for care or want to become a caregiver, we are excited to have you as part of our community.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/register" className="px-8 py-3 bg-[#389482] text-white rounded-full font-bold hover:bg-[#2f7f70] transition-colors">
                                    Become a Caregiver
                                </Link>
                                <Link href="/contact" className="px-8 py-3 font-bold text-white transition-colors rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-4 translate-y-8">
                                <div className="relative h-48 overflow-hidden rounded-2xl">
                                    <Image src={Test1} alt="Team member" fill className="object-cover" />
                                </div>
                                <div className="rounded-2xl overflow-hidden h-32 relative bg-[#389482] flex items-center justify-center">
                                    <FaHeart className="text-4xl text-white" />
                                </div>
                             </div>
                             <div className="space-y-4">
                                <div className="relative flex items-center justify-center h-32 overflow-hidden bg-gray-800 rounded-2xl">
                                     <span className="text-2xl font-bold text-white">Join Us</span>
                                </div>
                                <div className="relative h-48 overflow-hidden rounded-2xl">
                                    <Image src={Test2} alt="Team member" fill className="object-cover" />
                                </div>
                             </div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default AboutPage;
