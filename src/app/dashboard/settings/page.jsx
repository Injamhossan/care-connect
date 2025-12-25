"use client";
import React, { useState } from "react";
import { Switch } from "@radix-ui/themes";
import { HiOutlineBell, HiOutlineShieldCheck, HiOutlineMoon } from "react-icons/hi";

import { toast } from "sonner";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const SettingsPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  
  // Password Change State
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passData, setPassData] = useState({ current: "", new: "", confirm: "" });
  const [loadingPass, setLoadingPass] = useState(false);

  // Delete Account State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handlePassChange = (e) => setPassData({...passData, [e.target.name]: e.target.value});

  const submitPasswordChange = async (e) => {
    e.preventDefault();
    if (passData.new !== passData.confirm) {
        toast.error("New passwords do not match");
        return;
    }
    if (passData.new.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
    }
    
    setLoadingPass(true);
    try {
        const res = await fetch("/api/user/change-password", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                currentPassword: passData.current, 
                newPassword: passData.new 
            })
        });

        const data = await res.json();
        if (res.ok) {
            toast.success("Password changed successfully");
            setIsChangingPassword(false);
            setPassData({ current: "", new: "", confirm: "" });
        } else {
            toast.error(data.message || "Failed to change password");
        }
    } catch (error) {
        toast.error("Something went wrong");
    } finally {
        setLoadingPass(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (session?.user?.role === 'admin') {
        toast.error("Admins cannot delete their account");
        setIsDeleteModalOpen(false);
        return;
    }

    setDeleting(true);
    try {
        const res = await fetch("/api/user/delete-account", { method: "DELETE" });
        const data = await res.json();
        
        if (res.ok) {
            toast.success("Account deleted successfully");
            await signOut({ callbackUrl: "/" });
        } else {
            toast.error(data.message || "Failed to delete account");
            setIsDeleteModalOpen(false);
        }
    } catch (error) {
        toast.error("Something went wrong");
        setIsDeleteModalOpen(false);
    } finally {
        setDeleting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 relative">
      <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <HiOutlineBell className="text-xl" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-gray-800">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive booking updates via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#389482]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-gray-50">
            <div>
              <p className="font-medium text-gray-800">SMS Notifications</p>
              <p className="text-sm text-gray-500">Receive booking updates via SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={smsNotifs} onChange={() => setSmsNotifs(!smsNotifs)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#389482]"></div>
            </label>
          </div>
        </div>
      </div>

       {/* Security */}
       <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
            <HiOutlineShieldCheck className="text-xl" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Security</h2>
        </div>

        <div className="space-y-4">
          {!isChangingPassword ? (
              <button 
                onClick={() => setIsChangingPassword(true)}
                className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex justify-between items-center group"
              >
                <span className="font-medium text-gray-700 group-hover:text-gray-900">Change Password</span>
                <span className="text-gray-400 text-sm">Last changed 30 days ago</span>
              </button>
          ) : (
              <form onSubmit={submitPasswordChange} className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4 animate-in fade-in slide-in-from-top-2">
                  <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Current Password</label>
                      <input 
                        type="password" 
                        name="current" 
                        required 
                        value={passData.current}
                        onChange={handlePassChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#389482]"
                      />
                  </div>
                  <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">New Password</label>
                      <input 
                        type="password" 
                        name="new" 
                        required 
                        value={passData.new}
                        onChange={handlePassChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#389482]"
                      />
                  </div>
                  <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Confirm New Password</label>
                      <input 
                        type="password" 
                        name="confirm" 
                        required 
                        value={passData.confirm}
                        onChange={handlePassChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#389482]"
                      />
                  </div>
                  <div className="flex gap-3 justify-end pt-2">
                      <button 
                        type="button" 
                        onClick={() => setIsChangingPassword(false)}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                      >
                          Cancel
                      </button>
                      <button 
                        type="submit" 
                        disabled={loadingPass}
                        className="px-4 py-2 text-sm bg-[#389482] text-white rounded-lg hover:bg-[#2f7f70] disabled:opacity-50"
                      >
                          {loadingPass ? "Updating..." : "Update Password"}
                      </button>
                  </div>
              </form>
          )}

           <button 
            onClick={() => setIsDeleteModalOpen(true)}
            className="w-full text-left px-4 py-3 rounded-xl border border-red-200 hover:bg-red-50 transition-colors flex justify-between items-center group"
           >
            <span className="font-medium text-red-600">Delete Account</span>
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
                <h3 className="text-xl font-bold text-gray-900">Delete Account?</h3>
                <p className="text-gray-600">
                    Are you sure you want to delete your account? This action cannot be undone and you will lose all your booking history.
                </p>
                <div className="flex gap-3 pt-4">
                    <button 
                        onClick={() => setIsDeleteModalOpen(false)}
                        className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleDeleteAccount}
                        disabled={deleting}
                        className="flex-1 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors disabled:opacity-70"
                    >
                        {deleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
