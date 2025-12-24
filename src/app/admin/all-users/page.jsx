"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HiOutlineMail, HiOutlinePhone, HiOutlineTrash } from "react-icons/hi";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users");
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (error) {
        console.error("Error fetching users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Registered Users</h1>
      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600">User</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Contact Info</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Joined</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#389482]/10 flex items-center justify-center text-[#389482] font-bold">
                      {user.image ? (
                        <Image src={user.image} alt={user.name} width={40} height={40} className="rounded-full" />
                      ) : (
                        user.name?.[0]
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Client</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <HiOutlineMail /> {user.email}
                    </div>
                    {user.contact && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <HiOutlinePhone /> {user.contact}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete User">
                    <HiOutlineTrash className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {users.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
}
