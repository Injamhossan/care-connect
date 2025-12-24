"use client";
import React, { useState, useEffect } from "react";
import { HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineClock } from "react-icons/hi";
import Image from "next/image";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings");
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

    fetchBookings();
  }, []);

  if (loading) return <div>Loading bookings...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
        <button className="px-4 py-2 text-sm font-medium text-white bg-[#389482] rounded-lg hover:bg-[#2f7f70] transition-colors">
          New Booking
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-xl border border-gray-100">
           <p className="text-gray-500">You don't have any bookings yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div 
              key={booking._id} 
              className="flex flex-col md:flex-row bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="w-full md:w-48 h-48 md:h-auto bg-gray-200 relative">
                 {/* Fallback image logic needed or assume 'image' is in booking */}
                 {booking.image ? (
                     <Image src={booking.image} alt={booking.service} fill className="object-cover" />
                 ) : (
                     <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                       No Image
                     </div>
                 )}
              </div>

              {/* Content */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{booking.service}</h3>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-500 mt-4">
                    <div className="flex items-center gap-2">
                      <HiOutlineCalendar className="text-lg" />
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    {booking.time && (
                      <div className="flex items-center gap-2">
                        <HiOutlineClock className="text-lg" />
                        <span>{booking.time}</span>
                      </div>
                    )}
                    {booking.address && (
                      <div className="flex items-center gap-2">
                        <HiOutlineLocationMarker className="text-lg" />
                        <span>{booking.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                   <span className="font-bold text-lg text-[#389482]">{booking.price}</span>
                   <button className="text-sm text-gray-500 hover:text-[#389482] font-medium">
                     View Details
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
