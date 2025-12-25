"use client";
import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, Toaster } from "sonner";
import { HiOutlineLockClosed } from "react-icons/hi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion } from "motion/react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
        toast.error("Invalid link. Please try again.");
        return;
    }

    if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
    }

    if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: formData.password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Password reset successfully!");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
       toast.error("Something went wrong");
    } finally {
       setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
         <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h1>
            <p className="text-gray-500">
               Enter your new password below.
            </p>
         </div>

         <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">New Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <HiOutlineLockClosed className="text-lg text-gray-400" />
                    </div>
                    <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="New password"
                    className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#389482]/20 focus:border-[#389482] outline-none transition-all"
                    />
                     <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 cursor-pointer hover:text-gray-600"
                    >
                        {showPassword ? <AiOutlineEyeInvisible className="text-xl" /> : <AiOutlineEye className="text-xl" />}
                    </button>
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">Confirm Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <HiOutlineLockClosed className="text-lg text-gray-400" />
                    </div>
                    <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="Confirm new password"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#389482]/20 focus:border-[#389482] outline-none transition-all"
                    />
                </div>
            </div>

            <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-[#389482] text-white font-bold py-3.5 rounded-xl hover:bg-[#2f7f70] transition-colors shadow-lg shadow-[#389482]/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {submitting ? "Resetting..." : "Reset Password"}
            </button>
         </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
        <Toaster position="top-right" />
        <Suspense fallback={<div>Loading...</div>}>
            <ResetFormWithTransition />
        </Suspense>
    </div>
  );
}

function ResetFormWithTransition() {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
        >
            <ResetPasswordForm />
        </motion.div>
    )
}
