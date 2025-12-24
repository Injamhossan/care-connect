"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast, Toaster } from "sonner";
import { HiOutlineCalendar, HiOutlineClock, HiOutlineLocationMarker, HiOutlineCurrencyDollar } from "react-icons/hi";

export default function BookServicePage({ params }) {
  // Try to unwrap params if it's a promise (Next.js 15+ changes), though client components usually receive resolved params.
  // Ideally, use React.use() hook if available, but safe access is fine.
  const [unwrappedParams, setUnwrappedParams] = useState(null);

  useEffect(() => {
    // Handle potential promise-based params
    if (params instanceof Promise) {
        params.then(setUnwrappedParams);
    } else {
        setUnwrappedParams(params);
    }
  }, [params]);

  const id = unwrappedParams?.id;
  
  const router = useRouter();
  const { data: session } = useSession();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    address: "",
    duration: "4 hours", // Default
    notes: ""
  });

  // Fetch Service Details
  useEffect(() => {
    if (!id) return;

    const fetchService = async () => {
      try {
        // We can reuse the public API or simply fetch by ID if we had an endpoint. 
        // Since we don't have a dedicated public API for single service by ID easily accessible from client without overhead,
        // let's assume we fetch from the list or a dedicated endpoint.
        // For now, let's fetch all services and find one, OR create a specific endpoint.
        // Let's rely on the fact that we can just fetch the service details if we have an API.
        // Wait, we don't have a public GET /api/services/[id]. 
        // Let's fetch ALL services temporarily or assume we can create a quick server action/api.
        
        // Better: Create a simple GET endpoint for service details to make this clean.
        // But for speed, let's use the one we created for admin/services if accessible or create /api/services/[id].
        
        // Let's Try finding it via the public services list which we used in the main page.
        // Or better yet, I will create a dedicated API route for single service fetching now.
        const res = await fetch(`/api/service-details?id=${id}`); 
        if (res.ok) {
           const data = await res.json();
           setService(data);
        } else {
           toast.error("Service not found");
        }
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
     if (!service) return 0;
     const hours = parseInt(formData.duration) || 0;
     return hours * service.startingPrice;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please login to book a service");
      router.push("/login");
      return;
    }
    setSubmitting(true);

    try {
      const bookingPayload = {
        serviceId: service._id,
        serviceName: service.title,
        image: service.image,
        date: formData.date,
        time: formData.time,
        address: formData.address,
        duration: formData.duration,
        price: calculateTotal(), // Simple calc
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      if (res.ok) {
        toast.success("Booking Request Sent!");
        setTimeout(() => router.push("/dashboard/my-bookings"), 1500);
      } else {
         toast.error("Failed to book service");
      }
    } catch (error) {
       toast.error("Something went wrong");
    } finally {
       setSubmitting(false);
    }
  };

  if (loading || !id) return <div className="p-8 text-center">Loading booking details...</div>;
  if (!service) return <div className="p-8 text-center">Service not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Book Service</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left: Form */}
        <div className="md:col-span-2 space-y-6">
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="font-semibold text-lg mb-4 text-gray-800">Booking Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-sm font-medium text-gray-700">Date</label>
                       <div className="relative">
                          <HiOutlineCalendar className="absolute left-3 top-3 text-gray-400 text-lg" />
                          <input 
                            type="date" 
                            name="date"
                            required
                            min={new Date().toISOString().split('T')[0]}
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#389482]/20 focus:border-[#389482] outline-none transition-all"
                          />
                       </div>
                    </div>
                    
                    <div className="space-y-1">
                       <label className="text-sm font-medium text-gray-700">Time</label>
                       <div className="relative">
                          <HiOutlineClock className="absolute left-3 top-3 text-gray-400 text-lg" />
                          <input 
                            type="time" 
                            name="time"
                            required
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#389482]/20 focus:border-[#389482] outline-none transition-all"
                          />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Service Duration</label>
                    <select 
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#389482]/20 focus:border-[#389482] outline-none transition-all"
                    >
                       <option value="2 hours">2 Hours</option>
                       <option value="4 hours">4 Hours (Half Day)</option>
                       <option value="8 hours">8 Hours (Full Day)</option>
                       <option value="12 hours">12 Hours</option>
                       <option value="24 hours">24 Hours (Live-in)</option>
                    </select>
                 </div>

                 <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Address</label>
                    <div className="relative">
                       <HiOutlineLocationMarker className="absolute left-3 top-3 text-gray-400 text-lg" />
                       <textarea 
                         name="address"
                         required
                         placeholder="Full address where service is needed..."
                         rows="3"
                         value={formData.address}
                         onChange={handleChange}
                         className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#389482]/20 focus:border-[#389482] outline-none transition-all resize-none"
                       />
                    </div>
                 </div>

                 <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Notes (Optional)</label>
                    <textarea 
                       name="notes"
                       placeholder="Special requirements or instructions..."
                       rows="2"
                       value={formData.notes}
                       onChange={handleChange}
                       className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#389482]/20 focus:border-[#389482] outline-none transition-all resize-none"
                    />
                 </div>

                 <button 
                   type="submit" 
                   disabled={submitting}
                   className="w-full bg-[#389482] text-white font-bold py-3 rounded-xl hover:bg-[#2f7f70] transition-colors shadow-lg shadow-[#389482]/20 disabled:opacity-70 disabled:cursor-not-allowed"
                 >
                   {submitting ? "Processing..." : "Confirm Booking Request"}
                 </button>

              </form>
           </div>
        </div>

        {/* Right: Summary */}
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
              <h3 className="font-bold text-gray-800 mb-4">Order Summary</h3>
              
              <div className="flex gap-4 mb-6">
                 <div className="w-20 h-20 rounded-lg overflow-hidden relative bg-gray-100 shrink-0">
                    <Image src={service.image} alt={service.title} fill className="object-cover" />
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-900 line-clamp-2">{service.title}</h4>
                    <p className="text-sm text-gray-500">{service.priceUnit ? `$${service.startingPrice}/${service.priceUnit}` : 'Custom Quote'}</p>
                 </div>
              </div>

              <div className="space-y-3 py-4 border-t border-dashed border-gray-200">
                 <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Service Rate</span>
                    <span className="font-medium">${service.startingPrice}/hr</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium">{formData.duration}</span>
                 </div>
                 {/* <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium">${calculateTotal()}</span>
                 </div> */}
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                 <span className="font-bold text-gray-900">Total Estimate</span>
                 <span className="font-bold text-xl text-[#389482]">${calculateTotal()}</span>
              </div>
              
              <p className="text-xs text-center text-gray-400 mt-6">
                 *Final price may vary based on specific requirements. You will not be charged until the booking is confirmed.
              </p>
           </div>
        </div>
      
      </div>
    </div>
  );
}
