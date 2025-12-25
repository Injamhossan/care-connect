"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  HiOutlineHome, 
  HiOutlineCalendar, 
  HiOutlineUser, 
  HiOutlineCog, 
  HiOutlineLogout,
  HiMenu,
  HiX
} from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import { motion } from "motion/react";
import { HiOutlineUserGroup } from "react-icons/hi";

const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const userMenuItems = [
    { name: "Overview", icon: HiOutlineHome, href: "/dashboard" },
    { name: "My Bookings", icon: HiOutlineCalendar, href: "/dashboard/my-bookings" },
    { name: "Profile", icon: HiOutlineUser, href: "/dashboard/profile" },
    { name: "Settings", icon: HiOutlineCog, href: "/dashboard/settings" },
  ];

  const adminMenuItems = [
    { name: "Overview", icon: HiOutlineHome, href: "/dashboard" },
    { name: "Manage Users", icon: HiOutlineUserGroup, href: "/dashboard/admin/users" },
    { name: "All Bookings", icon: HiOutlineCalendar, href: "/dashboard/admin/bookings" },
    { name: "Profile", icon: HiOutlineUser, href: "/dashboard/profile" },
    { name: "Settings", icon: HiOutlineCog, href: "/dashboard/settings" },
  ];

  const menuItems = session?.user?.role === 'admin' ? adminMenuItems : userMenuItems;

  return (
    <aside className="w-full bg-white border-r border-gray-100 md:w-64 md:min-h-[calc(100vh-80px)]">
      
      {/* Mobile Menu Toggle Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 md:hidden">
        <span className="text-sm font-bold tracking-wider text-gray-700 uppercase">Dashboard Menu</span>
        <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 focus:outline-none"
        >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Menu Content - Collapsible on Mobile */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block w-full`}>
          <div className="p-4 md:p-6">
            <h2 className="mb-4 text-xs font-bold tracking-wider text-gray-400 uppercase">
              {session?.user?.role === 'admin' ? 'Admin Menu' : 'Menu'}
            </h2>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
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

          <div className="p-4 mt-auto border-t border-gray-100 md:p-6">
            <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center w-full gap-3 px-4 py-3 text-red-500 transition-colors hover:bg-red-50 rounded-xl"
            >
              <HiOutlineLogout className="text-xl" />
              <span>Logout</span>
            </button>
          </div>
      </div>
    </aside>
  );
};

export default Sidebar;
