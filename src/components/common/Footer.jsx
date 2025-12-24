"use client";
import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import FooterImg from "../../assets/care-01.png"
import { FaHeart, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import { motion } from "motion/react";

const Footer = () => {
    const listVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5
            }
        })
    };

    return (
        <footer className="bg-[#1F242E] text-gray-300 pt-16 pb-8 border-t border-gray-800">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 mb-16 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                       <Link
                            href="/"
                            className="flex items-center gap-2 text-xl font-bold"
                        >
                            <Image
                            src={FooterImg}
                            alt="CareConnect Logo"
                            width={50}
                            height={50}
                            priority
                            />
                            <span className="text-white">
                            Care
                            <span className="text-[#389482]">Connect</span>
                            </span>
                        </Link>
                        <p className="mt-4 mb-6 text-sm leading-relaxed text-gray-400">
                            Connecting families with trusted caregivers for babies, elderly, and those in need of special care.
                        </p>
                        <div className="space-y-3">
                            <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3 text-sm cursor-pointer hover:text-[#389482] transition-colors">
                                <HiOutlineMail className="text-[#389482] text-lg" />
                                <span>hello@careconnect.com</span>
                            </motion.div>
                            <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3 text-sm cursor-pointer hover:text-[#389482] transition-colors">
                                <HiOutlinePhone className="text-[#389482] text-lg" />
                                <span>+1 (234) 567–890</span>
                            </motion.div>
                            <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3 text-sm cursor-pointer hover:text-[#389482] transition-colors">
                                <HiOutlineLocationMarker className="text-[#389482] text-lg" />
                                <span>123 Care Street, Health City</span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h4 className="mb-6 text-sm font-bold tracking-wide text-white uppercase">Services</h4>
                        <ul className="space-y-3 text-sm">
                            {["Baby Care", "Elderly Care", "Sick Person Care"].map((item, i) => (
                                <motion.li key={i} whileHover={{ x: 5 }}>
                                    <Link href="#" className="hover:text-[#389482] transition-colors">{item}</Link>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="mb-6 text-sm font-bold tracking-wide text-white uppercase">Company</h4>
                        <ul className="space-y-3 text-sm">
                            {["About Us", "Careers", "Contact"].map((item, i) => (
                                <motion.li key={i} whileHover={{ x: 5 }}>
                                    <Link href="#" className="hover:text-[#389482] transition-colors">{item}</Link>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                     {/* Support Links */}
                     <div>
                        <h4 className="mb-6 text-sm font-bold tracking-wide text-white uppercase">Support</h4>
                        <ul className="space-y-3 text-sm">
                            {["Help Center", "Privacy Policy", "Terms of Service"].map((item, i) => (
                                <motion.li key={i} whileHover={{ x: 5 }}>
                                    <Link href="#" className="hover:text-[#389482] transition-colors">{item}</Link>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col items-center justify-between gap-4 pt-8 border-t border-gray-800 md:flex-row">
                    <p className="text-sm text-gray-500">
                        &copy; 2025 CareConnect. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        {[
                            { Icon: FaFacebookF, href: "#" },
                            { Icon: FaTwitter, href: "#" },
                            { Icon: FaInstagram, href: "#" },
                            { Icon: FaLinkedinIn, href: "#" }
                        ].map((social, index) => (
                            <motion.a 
                                key={index}
                                href={social.href} 
                                whileHover={{ y: -3, backgroundColor: "#389482", color: "#ffffff" }}
                                className="flex items-center justify-center w-10 h-10 text-gray-400 transition-colors bg-gray-800 rounded-lg"
                            >
                                <social.Icon />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
