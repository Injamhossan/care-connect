"use client";
import React from "react";
import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-8">
        <h1 className="text-9xl font-bold text-[#389482]/10 select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-gray-900">Page Not Found</span>
        </div>
      </div>
      
      <p className="text-gray-500 max-w-md mb-8">
        Oops! The page you are looking for might have been removed, had its name changed, or comes is temporarily unavailable.
      </p>

      <Link 
        href="/"
        className="flex items-center gap-2 bg-[#389482] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#2f7f70] transition-all shadow-lg shadow-[#389482]/20 hover:scale-105 active:scale-95"
      >
        <HiOutlineHome className="text-xl" />
        Back to Home
      </Link>
    </div>
  );
}
