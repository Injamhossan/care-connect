"use client";
import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineMail, HiArrowLeft } from "react-icons/hi";
import { toast, Toaster } from "sonner";
import { motion } from "motion/react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        toast.success("Reset link sent to your email!");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
       toast.error("Failed to send request");
    } finally {
       setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      <Toaster position="top-right" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
      >
         <Link href="/login" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors">
            <HiArrowLeft className="mr-2" /> Back to Login
         </Link>

         {submitted ? (
            <div className="text-center py-8">
               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                  📧
               </div>
               <h2 className="text-2xl font-bold text-gray-900 mb-4">Check your email</h2>
               <p className="text-gray-600 mb-8">
                  We have sent a password reset link to <strong>{email}</strong>. 
               </p>
               <button 
                 onClick={() => setSubmitted(false)}
                 className="text-[#389482] font-semibold hover:underline"
               >
                 Click to resend
               </button>
            </div>
         ) : (
             <>
                <div className="mb-8">
                   <h1 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
                   <p className="text-gray-500">
                      Enter your email address and we'll send you instructions to reset your password.
                   </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                      <div className="relative">
                         <HiOutlineMail className="absolute left-4 top-3.5 text-gray-400 text-lg" />
                         <input 
                           type="email" 
                           required
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder="you@example.com"
                           className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#389482]/20 focus:border-[#389482] outline-none transition-all"
                         />
                      </div>
                   </div>

                   <button 
                     type="submit" 
                     disabled={submitting}
                     className="w-full bg-[#389482] text-white font-bold py-3.5 rounded-xl hover:bg-[#2f7f70] transition-colors shadow-lg shadow-[#389482]/20 disabled:opacity-70 disabled:cursor-not-allowed"
                   >
                     {submitting ? "Sending..." : "Send Reset Link"}
                   </button>
                </form>
             </>
         )}
      </motion.div>
    </div>
  );
}
