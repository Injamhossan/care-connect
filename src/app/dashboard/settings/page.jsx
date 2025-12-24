"use client";
import React, { useState } from "react";
import { Switch } from "@radix-ui/themes";
import { HiOutlineBell, HiOutlineShieldCheck, HiOutlineMoon } from "react-icons/hi";

const SettingsPage = () => {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
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
            {/* Using a simple toggle checkbox customized if Radix Switch isn't fully configured or for simplicity */}
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
          <button className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex justify-between items-center group">
            <span className="font-medium text-gray-700 group-hover:text-gray-900">Change Password</span>
            <span className="text-gray-400 text-sm">Last changed 30 days ago</span>
          </button>
           <button className="w-full text-left px-4 py-3 rounded-xl border border-red-200 hover:bg-red-50 transition-colors flex justify-between items-center group">
            <span className="font-medium text-red-600">Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
