"use client";
import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <div className="h-screen flex items-center justify-center">Loading...</div>;

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  if (session?.user?.role !== 'admin') {
     router.push("/"); // Redirect non-admins
     return null;
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 md:ml-64 p-8">
          {children}
      </main>
    </div>
  );
}
