"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { HiOutlineMail, HiOutlinePhone, HiOutlineUser, HiOutlineCamera } from "react-icons/hi";
import { toast, Toaster } from "sonner";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    contact: "",
    image: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/update`);
        if (res.ok) {
          const data = await res.json();
          setUserData({
            name: data.name || "",
            email: data.email || "",
            contact: data.contact || "",
            image: data.image || ""
          });
        }
      } catch (error) {
        console.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchUserData();
    }
  }, [session]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userData.name,
          contact: userData.contact
        }),
      });

      if (res.ok) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
       toast.error("Something went wrong");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-[#389482]/10"></div>
        
        <div className="relative relative z-10 mx-auto w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4 bg-white flex items-center justify-center">
          {session?.user?.image ? (
            <Image 
              src={session.user.image} 
              alt="Profile" 
              fill
              className="rounded-full object-cover"
            />
          ) : (
             <div className="text-4xl text-[#389482] font-bold">
               {session?.user?.name?.[0] || userData.name?.[0] || "U"}
             </div>
          )}
          <button className="absolute bottom-0 right-0 p-2 bg-[#389482] text-white rounded-full hover:bg-[#2f7f70] transition-colors shadow-sm">
            <HiOutlineCamera />
          </button>
        </div>

        <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
        <p className="text-gray-500">{userData.email}</p>
        <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full uppercase ${
          session?.user?.role === 'admin' 
            ? 'bg-purple-100 text-purple-700' 
            : 'bg-green-100 text-green-700'
        }`}>
          {session?.user?.role === 'admin' ? 'Admin Account' : 'Client Account'}
        </span>
      </div>

      {/* Details Form */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm font-medium text-[#389482] hover:underline"
          >
            {isEditing ? 'Cancel Edit' : 'Edit Details'}
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-600">Full Name</label>
              <div className="relative">
                 <HiOutlineUser className="absolute left-3 top-3 text-gray-400 text-lg" />
                 <input 
                   type="text" 
                   value={userData.name}
                   onChange={(e) => setUserData({...userData, name: e.target.value})}
                   disabled={!isEditing}
                   className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#389482]/20 focus:border-[#389482] outline-none transition-all disabled:opacity-70"
                 />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-600">Email Address</label>
              <div className="relative">
                 <HiOutlineMail className="absolute left-3 top-3 text-gray-400 text-lg" />
                 <input 
                   type="email" 
                   value={userData.email}
                   disabled
                   className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-100 cursor-not-allowed outline-none text-gray-500"
                 />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-600">Contact Number</label>
              <div className="relative">
                 <HiOutlinePhone className="absolute left-3 top-3 text-gray-400 text-lg" />
                 <input 
                   type="tel" 
                   placeholder="+880 1..."
                   value={userData.contact}
                   onChange={(e) => setUserData({...userData, contact: e.target.value})}
                   disabled={!isEditing}
                   className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#389482]/20 focus:border-[#389482] outline-none transition-all disabled:opacity-70"
                 />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end pt-4">
              <button 
                onClick={handleUpdate}
                className="px-6 py-2.5 bg-[#389482] text-white font-medium rounded-xl hover:bg-[#2f7f70] transition-colors shadow-lg shadow-[#389482]/20"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
