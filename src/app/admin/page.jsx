"use client";
import React from "react";
import StatCard from "@/components/dashboard/StatCard";
import { HiOutlineUserGroup, HiOutlineClipboardList, HiOutlineCalendar, HiOutlineCurrencyDollar } from "react-icons/hi";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500">Overview of system performance.</p>
      </div>

       {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value="150" 
          icon={HiOutlineUserGroup} 
          color="bg-purple-500"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Total Services" 
          value="24" 
          icon={HiOutlineClipboardList} 
          color="bg-blue-500"
        />
        <StatCard 
          title="Total Bookings" 
          value="45" 
          icon={HiOutlineCalendar} 
          color="bg-orange-500"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard 
          title="Revenue" 
          value="$5,240" 
          icon={HiOutlineCurrencyDollar} 
          color="bg-green-500"
          trend={{ value: 24, isPositive: true }}
        />
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
          <p className="text-gray-500 text-center py-10">No recent activity to display.</p>
      </div>
    </div>
  );
}
