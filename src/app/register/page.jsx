"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Checkbox, Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlinePhone, HiOutlineIdentification } from "react-icons/hi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Image from "next/image";
import LoginImg from "../../assets/care-01.png";
import { motion } from "motion/react";

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    nid: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validatePassword = (password) => {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    
    if (password.length < minLength) return "Password must be at least 6 characters";
    if (!hasUpperCase) return "Password must contain at least one uppercase letter";
    if (!hasLowerCase) return "Password must contain at least one lowercase letter";
    return "";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Basic validation
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.contact) newErrors.contact = "Contact number is required";
    if (!formData.nid) newErrors.nid = "NID number is required";
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
         const data = await res.json();
         setErrors({ ...errors, form: data.message || "Registration failed" });
         return;
      }

      // Auto login after registration
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result.error) {
        setErrors({ ...errors, form: "Registration successful but login failed. Please login manually." });
        router.push("/login");
      } else {
        router.push("/dashboard");
      }

    } catch (error) {
       console.error("Registration error:", error);
       setErrors({ ...errors, form: "Something went wrong. Please try again." });
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
        {/* Left Section - Image/Color (Matching uploaded image layout) */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative items-center justify-center hidden w-full overflow-hidden bg-[#ed825e] md:flex md:w-1/2"
        >
             <div className="absolute inset-0 bg-[#ed825e]"></div> 
          
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))] from-black/10 to-transparent"></div>

          <div className="relative z-10 max-w-lg px-12 text-center text-white">
            <h2 className="mb-6 text-4xl font-bold tracking-tight">
              Join Our Care Community
            </h2>
            <p className="text-lg leading-relaxed text-green-50 opacity-90">
              Create an account to access verified caregivers, track bookings, and manage your care services all in one place.
            </p>
          </div>
        </motion.div>

        {/* Right Section - Form */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col justify-center w-full px-8 py-12 bg-white md:w-1/2 md:px-16 lg:px-24"
        >
          <div className="w-full max-w-md mx-auto">
             {/* Logo - Mobile only maybe? Or keep generic */}
            <div className="flex items-center gap-2 mb-8 md:hidden">
                 <span className="text-xl font-bold text-[#389482]">CareConnect</span>
            </div>

            <div className="mb-8">
                <Link
                href="/"
                className="flex items-center gap-2 mb-6 text-xl font-bold"
              >
                <Image
                  src={LoginImg}
                  alt="CareConnect Logo"
                  width={40}
                  height={40}
                  priority
                />
                <span className="text-2xl text-black">
                  Care
                  <span className="text-[#389482]">Connect</span>
                </span>
              </Link>
                <h1 className="mb-2 text-3xl font-bold text-gray-900">Create an account</h1>
                <p className="text-gray-500">Get started with CareConnect today.</p>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="flex items-center justify-center w-full gap-3 py-3 mb-6 transition-colors border border-gray-200 rounded-xl hover:bg-gray-50 group"
            >
              <FcGoogle className="text-xl" />
              <span className="font-medium text-gray-600 group-hover:text-gray-800">
                Continue with Google
              </span>
            </motion.button>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                or continue with email
              </span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {errors.form && (
              <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 rounded-lg">
                {errors.form}
              </div>
            )}
            <form className="space-y-4" onSubmit={handleSubmit}>
              
              {/* Name */}
              <div className="space-y-1">
                <label className="ml-1 text-sm font-semibold text-gray-700">Full Name</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <HiOutlineUser className="text-lg text-gray-400 transition-colors group-focus-within:text-[#389482]" />
                    </div>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full pl-11 pr-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#389482]/20 focus:border-[#389482] outline-none transition-all placeholder:text-gray-300 text-gray-700 bg-gray-50/30 focus:bg-white`}
                    />
                </div>
                {errors.name && <p className="ml-1 text-xs text-red-500">{errors.name}</p>}
              </div>

               {/* NID */}
               <div className="space-y-1">
                <label className="ml-1 text-sm font-semibold text-gray-700">NID No</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <HiOutlineIdentification className="text-lg text-gray-400 transition-colors group-focus-within:text-[#389482]" />
                    </div>
                    <input
                        type="text"
                        name="nid"
                        value={formData.nid}
                        onChange={handleChange}
                        placeholder="National ID Number"
                        className={`w-full pl-11 pr-4 py-3 border ${errors.nid ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#389482]/20 focus:border-[#389482] outline-none transition-all placeholder:text-gray-300 text-gray-700 bg-gray-50/30 focus:bg-white`}
                    />
                </div>
                 {errors.nid && <p className="ml-1 text-xs text-red-500">{errors.nid}</p>}
              </div>

               {/* Email & Contact Row */}
               <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="ml-1 text-sm font-semibold text-gray-700">Email</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <HiOutlineMail className="text-lg text-gray-400 transition-colors group-focus-within:text-[#389482]" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@email.com"
                            className={`w-full pl-11 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#389482]/20 focus:border-[#389482] outline-none transition-all placeholder:text-gray-300 text-gray-700 bg-gray-50/30 focus:bg-white`}
                        />
                    </div>
                     {errors.email && <p className="ml-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="ml-1 text-sm font-semibold text-gray-700">Contact</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <HiOutlinePhone className="text-lg text-gray-400 transition-colors group-focus-within:text-[#389482]" />
                        </div>
                        <input
                            type="tel"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            placeholder="017..."
                            className={`w-full pl-11 pr-4 py-3 border ${errors.contact ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#389482]/20 focus:border-[#389482] outline-none transition-all placeholder:text-gray-300 text-gray-700 bg-gray-50/30 focus:bg-white`}
                        />
                    </div>
                     {errors.contact && <p className="ml-1 text-xs text-red-500">{errors.contact}</p>}
                  </div>
               </div>


              {/* Password */}
              <div className="space-y-1">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Password
                  </label>
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
                    className={`w-full pl-11 pr-12 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#389482]/20 focus:border-[#389482] outline-none transition-all placeholder:text-gray-300 text-gray-700 bg-gray-50/30 focus:bg-white`}
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
                {errors.password && <p className="ml-1 text-xs text-red-500">{errors.password}</p>}
                <p className="text-[10px] text-gray-400 ml-1">Must be at least 6 characters, include 1 uppercase & 1 lowercase.</p>
              </div>

                <Flex align="center" gap="2" ml="1">
      <Checkbox size="1" />
      <Text size="1" color="gray">
        I agree to the{" "}
        <Link
          href="#"
          className="underline hover:text-[#389482]"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="#"
          className="underline hover:text-[#389482]"
        >
          Privacy Policy
        </Link>
      </Text>
    </Flex>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#389482] hover:bg-[#389482]-hover text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-[#389482]/30 active:scale-[0.98] mt-2"
              >
                Create Account
              </motion.button>
            </form>

            <p className="mt-8 text-sm text-center text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold hover:underline text-[#389482]"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RegisterPage;
