"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  HiOutlineHome, 
  HiOutlineCalendar, 
  HiOutlineUser, 
  HiOutlineCog, 
  HiOutlineLogout 
} from "react-icons/hi";
import { signOut } from "next-auth/react";
import { motion } from "motion/react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", icon: HiOutlineHome, href: "/dashboard" },
    { name: "My Bookings", icon: HiOutlineCalendar, href: "/dashboard/my-bookings" },
    { name: "Profile", icon: HiOutlineUser, href: "/dashboard/profile" },
    { name: "Settings", icon: HiOutlineCog, href: "/dashboard/settings" },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-100 min-h-[calc(100vh-80px)] hidden md:block">
      <div className="p-6">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
          Menu
        </h2>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-[#389482]/10 text-[#389482] font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className={`text-xl ${isActive ? "text-[#389482]" : "text-gray-400"}`} />
                  <span>{item.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-gray-100 mt-auto">
        <button 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-colors"
        >
          <HiOutlineLogout className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
