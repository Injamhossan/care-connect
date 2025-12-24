"use client";
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { BiMessageDetail } from "react-icons/bi";

const ContactPage = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted:", formState);
        alert("Thank you! We will get back to you soon.");
    };

    const contactInfo = [
        {
            icon: <FaPhoneAlt />,
            title: "Phone",
            details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
            color: "text-blue-500",
            bg: "bg-blue-50"
        },
        {
            icon: <FaEnvelope />,
            title: "Email",
            details: ["hello@careconnect.com", "support@careconnect.com"],
            color: "text-[#389482]",
            bg: "bg-[#e7f0eb]"
        },
        {
            icon: <FaMapMarkerAlt />,
            title: "Office",
            details: ["123 Care Avenue, Suite 100", "Health City, HC 90210"],
            color: "text-purple-500",
            bg: "bg-purple-50"
        }
    ];

    return (
        <div className="min-h-screen pb-20 bg-gray-50/50">
            {/* Header */}
            <section className="px-4 pt-10 pb-16 text-center bg-white border-b border-gray-100 lg:pt-25">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block px-4 py-1.5 bg-[#e7f0eb] rounded-full text-sm font-medium text-[#389482] mb-6"
                >
                    Contact Us
                </motion.div>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold text-[#1f242e] mb-6"
                >
                    We&apos;d Love to Hear from You
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-2xl mx-auto text-lg text-gray-600"
                >
                    Have questions about our care services? Need help finding the right caregiver? Reach out to us today.
                </motion.p>
            </section>

            <div className="px-4 mx-auto mt-12 max-w-7xl sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                    
                    {/* Contact Info Cards */}
                    <div className="space-y-6 lg:col-span-1">
                        {contactInfo.map((info, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="flex items-start gap-4 p-6 transition-shadow bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md"
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${info.bg} ${info.color} text-xl`}>
                                    {info.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#1f242e] text-lg mb-2">{info.title}</h3>
                                    {info.details.map((detail, i) => (
                                        <p key={i} className="text-sm leading-relaxed text-gray-600">{detail}</p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}

                        {/* FAQ Teaser */}
                        <motion.div
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ duration: 0.5, delay: 0.4 }}
                             className="bg-linear-to-br from-[#389482] to-[#2A7566] p-8 rounded-3xl text-white mt-8 relative overflow-hidden"
                        >
                             <div className="absolute top-0 right-0 w-32 h-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-2xl"></div>
                             <BiMessageDetail className="mb-4 text-4xl text-emerald-100" />
                             <h3 className="mb-2 text-xl font-bold">Need quick answers?</h3>
                             <p className="mb-6 text-sm leading-relaxed text-emerald-100">
                                 Check out our Frequently Asked Questions section to find answers to common queries.
                             </p>
                             <button className="px-5 py-2 bg-white text-[#389482] rounded-lg text-sm font-bold hover:bg-emerald-50 transition-colors">
                                 Visit FAQ
                             </button>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <motion.div 
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6, delay: 0.2 }}
                         className="p-8 bg-white border border-gray-100 shadow-xl lg:col-span-2 rounded-3xl md:p-10"
                    >
                        <h2 className="text-2xl font-bold text-[#1f242e] mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="ml-1 text-sm font-semibold text-gray-700">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="John Doe"
                                        className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#389482] focus:ring-0 outline-none transition-all placeholder:text-gray-400"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="ml-1 text-sm font-semibold text-gray-700">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="john@example.com"
                                        className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#389482] focus:ring-0 outline-none transition-all placeholder:text-gray-400"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="ml-1 text-sm font-semibold text-gray-700">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    placeholder="How can we help?"
                                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#389482] focus:ring-0 outline-none transition-all placeholder:text-gray-400"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="ml-1 text-sm font-semibold text-gray-700">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows="5"
                                    placeholder="Tell us more about your needs..."
                                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#389482] focus:ring-0 outline-none transition-all placeholder:text-gray-400 resize-none"
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full btn btn-primary bg-[#389482] border-none text-white h-auto py-4 rounded-xl text-lg font-bold shadow-lg shadow-[#389482]/20 hover:shadow-[#389482]/30 hover:bg-[#2f7f70] flex items-center justify-center gap-2"
                            >
                                Send Message
                                <FaPaperPlane className="text-sm" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
