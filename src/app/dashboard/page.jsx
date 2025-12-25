
"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import StatCard from "@/components/dashboard/StatCard";
import { HiOutlineCalendar, HiOutlineClock, HiOutlineCheckCircle, HiOutlineCurrencyDollar, HiOutlineUserGroup, HiOutlineTemplate } from "react-icons/hi";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0,
    recentBookings: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.role === 'admin') {
        // Admin Data Fetch
        try {
          const [usersRes, bookingsRes] = await Promise.all([
             fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`),
             fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings`)
          ]);

          if (usersRes.ok && bookingsRes.ok) {
            const users = await usersRes.json();
            const bookings = await bookingsRes.json();
            
            const revenue = bookings.reduce((acc, curr) => acc + (parseFloat(curr.price) || 0), 0);
            const pending = bookings.filter(b => b.status === 'Pending').length;

            setStats({
              totalUsers: users.length,
              totalBookings: bookings.length,
              totalRevenue: revenue,
              pendingBookings: pending,
              completedBookings: 0, // Not used for admin
              recentBookings: bookings.slice(0, 5)
            });
          }
        } catch (error) {
          console.error("Failed to fetch admin stats");
        }
      } else {
        // User Data Fetch
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`);
          if (res.ok) {
            const bookings = await res.json();
            
            // Calculate Stats
            const spent = bookings.reduce((acc, curr) => acc + (parseFloat(curr.price) || 0), 0);
            const pending = bookings.filter(b => b.status === 'Pending').length;
            const completed = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Completed').length;

            setStats({
              totalBookings: bookings.length,
              totalRevenue: spent, // Reusing variable for Total Spent
              pendingBookings: pending,
              completedBookings: completed,
              recentBookings: bookings.sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 5),
              totalUsers: 0 // Not used for user
            });
          }
        } catch (error) {
          console.error("Failed to fetch user stats");
        }
      }
      setLoading(false);
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  if (session?.user?.role === 'admin') {
    return (
      <div className="space-y-8">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
           <p className="text-gray-500 mt-1">Global statistics and platform activity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Users" 
            value={loading ? "..." : stats.totalUsers} 
            icon={HiOutlineUserGroup} 
            color="bg-purple-500"
          />
          <StatCard 
            title="Total Bookings" 
            value={loading ? "..." : stats.totalBookings} 
            icon={HiOutlineCalendar} 
            color="bg-blue-500"
          />
          <StatCard 
            title="Total Revenue" 
            value={loading ? "..." : `$${stats.totalRevenue}`} 
            icon={HiOutlineCurrencyDollar} 
            color="bg-green-500"
          />
           <StatCard 
            title="Pending Requests" 
            value={loading ? "..." : stats.pendingBookings} 
            icon={HiOutlineClock} 
            color="bg-orange-500"
          />
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
            <Link href="/dashboard/admin/bookings" className="text-sm text-[#389482] font-medium hover:underline">
              View All
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs text-gray-500 bg-gray-50 uppercase border-b border-gray-100">
                <tr>
                   <th className="px-4 py-3">Service</th>
                   <th className="px-4 py-3">User</th>
                   <th className="px-4 py-3">Price</th>
                   <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                 {stats.recentBookings.map((booking) => (
                   <tr key={booking._id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-medium text-gray-900">{booking.service}</td>
                      <td className="px-4 py-3 text-gray-600">{booking.userName || booking.userEmail}</td>
                      <td className="px-4 py-3 text-[#389482] font-bold">${booking.price}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                           booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 
                           booking.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 
                           'bg-gray-100 text-gray-600'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                   </tr>
                 ))}
                 {stats.recentBookings.length === 0 && (
                   <tr>
                     <td colSpan="4" className="text-center py-4 text-gray-500">No recent bookings</td>
                   </tr>
                 )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Regular User Dashboard
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
          value={loading ? "..." : stats.totalBookings} 
          icon={HiOutlineCalendar} 
          color="bg-blue-500"
        />
        <StatCard 
          title="Pending" 
          value={loading ? "..." : stats.pendingBookings} 
          icon={HiOutlineClock} 
          color="bg-orange-500"
        />
        <StatCard 
          title="Completed" 
          value={loading ? "..." : (stats.completedBookings || 0)} 
          icon={HiOutlineCheckCircle} 
          color="bg-green-500"
        />
        <StatCard 
          title="Total Spent" 
          value={loading ? "..." : `$${stats.totalRevenue}`} 
          icon={HiOutlineCurrencyDollar} 
          color="bg-purple-500"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
            <Link href="/dashboard/my-bookings" className="text-sm text-[#389482] font-medium hover:underline">
              View All
            </Link>
        </div>
        
        {stats.recentBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs text-gray-500 bg-gray-50 uppercase border-b border-gray-100">
                <tr>
                   <th className="px-4 py-3">Service</th>
                   <th className="px-4 py-3">Date</th>
                   <th className="px-4 py-3">Price</th>
                   <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                 {stats.recentBookings.map((booking) => (
                   <tr key={booking._id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-medium text-gray-900">{booking.service || booking.serviceName}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {new Date(booking.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-[#389482] font-bold">${booking.price}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                           booking.status === 'Confirmed' || booking.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                           booking.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 
                           'bg-gray-100 text-gray-600'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                   </tr>
                 ))}
              </tbody>
            </table>
          </div>
        ) : (
            <div className="text-center py-10 text-gray-500">
              <p>You have no recent bookings to show.</p>
              <Link href="/" className="inline-block mt-4 px-4 py-2 bg-[#389482] text-white rounded-lg hover:bg-[#2f7f70] transition-colors">
                Book a Service
              </Link>
            </div>
        )}
      </div>
    </div>
  );
}
