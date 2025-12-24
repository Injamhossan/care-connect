"use client";
import React, { useState, useEffect } from "react";
import { HiCheck, HiX, HiOutlineClock } from "react-icons/hi";
import { toast, Toaster } from "sonner";

export default function AllBookingsPage() {
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
      console.error("Error fetching bookings");
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
        toast.success(`Booking ${newStatus} successfully`);
        fetchBookings(); // Refresh list
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (loading) return <div>Loading bookings...</div>;

  return (
    <div>
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Bookings</h1>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600">Service</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Client</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Date/Time</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4">
                  <p className="font-bold text-gray-900">{booking.service}</p>
                  <p className="text-sm text-[#389482] font-semibold">{booking.price}</p>
                </td>
                <td className="px-6 py-4 text-sm">
                   <p className="font-medium text-gray-900">{booking.userName || "Unknown"}</p>
                   <p className="text-gray-500">{booking.userEmail}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <p>{new Date(booking.date).toLocaleDateString()}</p>
                  <p>{booking.time}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    booking.status === 'Confirmed' 
                      ? 'bg-green-100 text-green-700' 
                      : booking.status === 'Rejected'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {booking.status === 'Pending' && <HiOutlineClock />}
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {booking.status === 'Pending' && (
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleStatusUpdate(booking._id, 'Confirmed')}
                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors" 
                        title="Accept Booking"
                      >
                        <HiCheck className="text-lg" />
                      </button>
                      <button 
                         onClick={() => handleStatusUpdate(booking._id, 'Rejected')}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors" 
                        title="Reject Booking"
                      >
                        <HiX className="text-lg" />
                      </button>
                    </div>
                  )}
                  {booking.status !== 'Pending' && (
                     <span className="text-xs text-gray-400 italic">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No bookings found.
          </div>
        )}
      </div>
    </div>
  );
}
