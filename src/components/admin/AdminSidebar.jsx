"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineClipboardList,
  HiOutlineCalendar,
  HiOutlineLogout
} from "react-icons/hi";
import { signOut } from "next-auth/react";

const AdminSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: HiOutlineHome, href: "/admin" },
    { name: "All Users", icon: HiOutlineUserGroup, href: "/admin/all-users" },
    { name: "All Services", icon: HiOutlineClipboardList, href: "/admin/all-services" },
    { name: "All Bookings", icon: HiOutlineCalendar, href: "/admin/all-bookings" },
  ];

  return (
    <aside className="w-64 bg-[#1f242e] text-white min-h-screen hidden md:flex flex-col fixed left-0 top-0 bottom-0 z-50">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <span className="text-[#389482]">Care</span>Admin
        </h1>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-[#389482] text-white font-medium shadow-lg shadow-[#389482]/20"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon className="text-xl" />
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-6 mt-auto border-t border-white/10">
        <button 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
        >
          <HiOutlineLogout className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
