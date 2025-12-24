"use client";
import React from "react";
import { useSession } from "next-auth/react";
import StatCard from "@/components/dashboard/StatCard";
import { HiOutlineCalendar, HiOutlineClock, HiOutlineCheckCircle, HiOutlineCurrencyDollar } from "react-icons/hi";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {session?.user?.name?.split(" ")[0]}! 👋
        </h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your care services today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Bookings" 
          value="12" 
          icon={HiOutlineCalendar} 
          color="bg-blue-500"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Pending" 
          value="2" 
          icon={HiOutlineClock} 
          color="bg-orange-500"
        />
        <StatCard 
          title="Completed" 
          value="8" 
          icon={HiOutlineCheckCircle} 
          color="bg-green-500"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard 
          title="Total Spent" 
          value="$1,240" 
          icon={HiOutlineCurrencyDollar} 
          color="bg-purple-500"
        />
      </div>

      {/* Recent Activity Section (Placeholder for now) */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Bookings</h2>
        <div className="text-center py-10 text-gray-500">
          <p>You have no recent bookings to show.</p>
          <button className="mt-4 px-4 py-2 bg-[#389482] text-white rounded-lg hover:bg-[#2f7f70] transition-colors">
            Book a Service
          </button>
        </div>
      </div>
    </div>
  );
}
