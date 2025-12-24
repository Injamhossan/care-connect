"use client";
import React from "react";
import Image from "next/image";
import BannerImg from "../../assets/hand.jpg"
import { FaShieldAlt, FaStar, FaArrowRight, FaClock, FaHeart } from "react-icons/fa";
import { motion } from "motion/react";

const Banner = () => {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden lg:pt-32 lg:pb-28">
      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Trusted Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e7f0eb] text-[#389482] text-sm font-semibold mb-8"
            >
              <FaShieldAlt className="text-[#389482]" />
              Trusted by 10,000+ Families
            </motion.div>

            {/* Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold text-[#1f242e] leading-[1.1] mb-6"
            >
              Compassionate <br />
              Care for Your  <br />
              <span className="text-[#389482]">
                Loved
              </span>{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#389482] to-[#ed825e]">
                Ones
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-lg mb-10 text-lg leading-relaxed text-gray-600"
            >
              Connect with verified, professional caregivers for babies, elderly, and those who need special attention. Quality care, peace of mind.
            </motion.p>

            {/* Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <button className="btn btn-primary bg-[#389482] text-white rounded-[20px] px-8 py-4 h-auto min-h-0 text-lg font-semibold shadow-lg shadow-emerald-200 hover:shadow-emerald-300 border-none transition-transform hover:scale-105 active:scale-95">
                Find a Caregiver <FaArrowRight className="ml-2" />
              </button>
              <button className="btn bg-transparent border-2 text-gray-700 hover:bg-gray-50 border-[#389482] rounded-[20px] px-8 py-4 h-auto min-h-0 text-lg font-semibold transition-transform hover:scale-105 active:scale-95">
                Learn More
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-8 pt-8 border-t border-gray-200"
            >
              <div>
                <h4 className="text-3xl font-bold text-[#1f242e]">10K+</h4>
                <p className="mt-1 text-sm text-gray-500">Happy Families</p>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div>
                <h4 className="text-3xl font-bold text-[#1f242e]">500+</h4>
                <p className="mt-1 text-sm text-gray-500">Verified Caregivers</p>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div>
                <h4 className="text-3xl font-bold text-[#1f242e] flex items-center gap-1">
                  4.9 <FaStar className="text-[#ed825e] text-2xl" />
                </h4>
                <p className="mt-1 text-sm text-gray-500">Average Rating</p>
              </div>
            </motion.div>
          </div>

          {/* Right Image/Graphics */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
             {/* Abstract Background Blotches */}
             <motion.div 
               animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.4, 0.5] }}
               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-3xl -z-10"
             ></motion.div>
             <motion.div 
               animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.3, 0.4] }}
               transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-100/40 rounded-full blur-3xl -z-10 flex"
             ></motion.div>

             {/* Main Circle Graphic */}
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="relative w-[450px] h-[450px] bg-gradient-to-br from-emerald-50 to-orange-50 rounded-full border-[3px] border-white shadow-2xl flex items-center justify-center overflow-hidden"
             >
                <div className="relative w-full h-full bg-[#DCECE9]">
                  <Image
                    src={BannerImg}
                    alt="Care Banner"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
             </motion.div>

             {/* Floating Cards */}
             
             {/* Top Card */}
             <motion.div 
               initial={{ x: 50, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ duration: 0.5, delay: 0.6 }}
               className="absolute flex items-center gap-4 p-4 bg-white shadow-xl top-10 right-10 rounded-2xl animate-bounce-slow"
             >
                <div className="w-12 h-12 rounded-full bg-[#e7f0eb] flex items-center justify-center text-[#389482]">
                   <FaShieldAlt size={24} />
                </div>
                <div>
                   <h5 className="font-bold text-gray-900">Verified</h5>
                   <p className="text-xs text-gray-500">Background Checked</p>
                </div>
             </motion.div>

             {/* Bottom Left Card */}
             <motion.div 
               initial={{ x: -50, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ duration: 0.5, delay: 0.8 }}
               className="absolute left-0 flex items-center gap-4 p-4 bg-white shadow-xl bottom-20 rounded-2xl animate-bounce-slow"
             >
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-[#ed825e]">
                   <FaClock size={24} />
                </div>
                <div>
                   <h5 className="font-bold text-gray-900">Flexible</h5>
                   <p className="text-xs text-gray-500">24/7 Availability</p>
                </div>
             </motion.div>

             {/* Bottom Right Card */}
             <motion.div 
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.5, delay: 1 }}
               className="absolute flex items-center gap-4 p-4 bg-white shadow-xl bottom-10 right-20 rounded-2xl animate-bounce-slow"
             >
                <div className="w-12 h-12 rounded-full bg-[#e7f0eb] flex items-center justify-center text-[#389482]">
                   <FaHeart size={24} />
                </div>
                <div>
                   <h5 className="font-bold text-gray-900">Caring</h5>
                   <p className="text-xs text-gray-500">Compassionate Staff</p>
                </div>
             </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
