"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HiOutlineCalendar, HiOutlineClock, HiOutlineLocationMarker, HiDotsHorizontal, HiOutlineClipboardList } from "react-icons/hi";
import { toast, Toaster } from "sonner";

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/admin/bookings");
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (error) {
      console.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        toast.success(`Booking marked as ${newStatus}`);
        fetchBookings(); // Refresh
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
       toast.error("Something went wrong");
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return 'bg-green-100 text-green-700';
      case 'Completed': return 'bg-gray-100 text-gray-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-orange-100 text-orange-700';
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#389482]"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manage Bookings</h1>
        <div className="text-sm text-gray-500">
          Total: <span className="font-bold text-[#389482]">{bookings.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="p-5 font-semibold text-gray-600 text-sm">Service Info</th>
                <th className="p-5 font-semibold text-gray-600 text-sm">Customer</th>
                <th className="p-5 font-semibold text-gray-600 text-sm">Schedule</th>
                <th className="p-5 font-semibold text-gray-600 text-sm">Price</th>
                <th className="p-5 font-semibold text-gray-600 text-sm">Status</th>
                <th className="p-5 font-semibold text-gray-600 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden relative shrink-0">
                        {booking.image ? (
                           <Image src={booking.image} alt={booking.service} fill className="object-cover" />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{booking.service}</div>
                        <div className="text-xs text-gray-500">{booking.duration}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                     <div className="text-sm font-medium text-gray-900">{booking.userName || 'Unknown'}</div>
                     <div className="text-xs text-gray-500">{booking.userEmail}</div>
                  </td>
                  <td className="p-5">
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <HiOutlineCalendar className="text-gray-400" />
                        <span>{new Date(booking.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HiOutlineClock className="text-gray-400" />
                        <span>{booking.time}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 font-bold text-[#389482]">
                    ${booking.price}
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-5">
                    <select 
                      onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                      value={booking.status}
                      className="text-sm border border-gray-200 rounded-lg p-1.5 bg-white focus:ring-2 focus:ring-[#389482]/20 outline-none cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
         {bookings.length === 0 && (
          <div className="p-12 text-center text-gray-500">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <HiOutlineClipboardList className="text-2xl text-gray-300" />
             </div>
             <div>No bookings found.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookingsPage;
