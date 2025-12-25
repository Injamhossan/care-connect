"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HiOutlineUser, HiOutlineMail, HiOutlineCalendar, HiOutlineBadgeCheck } from "react-icons/hi";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`);
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (error) {
        console.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#389482]"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
        <div className="text-sm text-gray-500">
          Total Users: <span className="font-bold text-[#389482]">{users.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="p-5 font-semibold text-gray-600 text-sm">User Profile</th>
                <th className="p-5 font-semibold text-gray-600 text-sm">Contact Info</th>
                <th className="p-5 font-semibold text-gray-600 text-sm">Role</th>
                <th className="p-5 font-semibold text-gray-600 text-sm">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden relative border border-gray-100 shrink-0">
                        {user.image ? (
                          <Image src={user.image} alt={user.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#389482] font-bold text-lg bg-[#389482]/10">
                            {user.name?.[0]?.toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-400">ID: {user._id.slice(-6)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <HiOutlineMail className="text-gray-400" />
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                      user.role === 'admin' 
                        ? 'bg-purple-50 text-purple-700 border border-purple-100' 
                        : 'bg-green-50 text-green-700 border border-green-100'
                    }`}>
                      {user.role === 'admin' && <HiOutlineBadgeCheck className="text-sm" />}
                      {user.role || 'user'}
                    </span>
                  </td>
                  <td className="p-5 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <HiOutlineCalendar className="text-gray-400" />
                      <span>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {users.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiOutlineUser className="text-2xl text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No users found</h3>
            <p className="text-gray-500">Wait for users to sign up.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;
