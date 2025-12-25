"use client";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import LoginImg from "../../assets/care-01.png";
import Image from "next/image";
import { motion } from "motion/react";
const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid email or password");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="flex min-h-[calc(100vh-80px)]"
    >
      <div className="flex w-full min-h-screen">
        {/* Left Section - Form */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col justify-center w-full px-8 py-12 bg-white md:w-1/2 md:px-16 lg:px-24"
        >
          <div className="w-full max-w-md mx-auto">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-10">
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-bold"
              >
                <Image
                  src={LoginImg}
                  alt="CareConnect Logo"
                  width={50}
                  height={50}
                  priority
                />
                <span className="text-black text-[30px]">
                  Care
                  <span className="text-[#389482]">Connect</span>
                </span>
              </Link>
            </div>

            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              Welcome back
            </h1>
            <p className="mb-8 text-gray-500">
              Login to manage your bookings and care services.
            </p>
            
            {error && (
              <div className="p-3 mb-4 text-sm text-red-500 rounded-lg bg-red-50">
                {error}
              </div>
            )}

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3.5 hover:bg-gray-50 transition-colors mb-8 group"
            >
              <FcGoogle className="text-2xl" />
              <span className="font-medium text-gray-600 group-hover:text-gray-800">
                Continue with Google
              </span>
            </motion.button>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                or continue with email
              </span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label className="ml-1 text-sm font-semibold text-gray-700">
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <HiOutlineMail className="text-lg text-gray-400 transition-colors group-focus-within:text-[#389482]" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#389482]/20 focus:border-[#389482] outline-none transition-all placeholder:text-gray-300 text-gray-700 bg-gray-50/30 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-[#389482] hover:text-[#389482]-hover"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <HiOutlineLockClosed className="text-lg text-gray-400 transition-colors group-focus-within:text-[#389482]" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#389482]/20 focus:border-[#389482] outline-none transition-all placeholder:text-gray-300 text-gray-700 bg-gray-50/30 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 cursor-pointer hover:text-gray-600"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="text-xl" />
                    ) : (
                      <AiOutlineEye className="text-xl" />
                    )}
                  </button>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#389482] hover:bg-[#389482]-hover text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-[#389482]/30 active:scale-[0.98] mt-2"
              >
                Sign In
              </motion.button>
            </form>

            <p className="mt-8 text-sm text-center text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold hover:underline text-[#389482]"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
        {/* Right Section - Image/Color */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative items-center justify-center hidden w-1/2 overflow-hidden md:flex bg-[#389482]"
        >
          {/* Background Pattern/Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))] from-black/10 to-transparent"></div>

          <div className="relative z-10 max-w-lg px-12 text-center text-white">
            <h2 className="mb-6 text-5xl font-bold tracking-tight">
              Quality Care, <br />
              Trusted Service
            </h2>
            <p className="text-lg leading-relaxed text-green-50 opacity-90">
              Join thousands of families who trust CareConnect for reliable,
              compassionate care services.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
