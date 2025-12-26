"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast, Toaster } from "sonner";
import { HiOutlineCalendar, HiOutlineClock, HiOutlineLocationMarker, HiOutlineCurrencyDollar, HiOutlineOfficeBuilding } from "react-icons/hi";

const DIVISIONS = ["Barisal", "Chittagong", "Dhaka", "Khulna", "Mymensingh", "Rajshahi", "Rangpur", "Sylhet"];

export default function BookServicePage({ params }) {
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
    division: "",
    district: "",
    city: "",
    area: "",
    address: "", // Specific address/road/house
    duration: "4 hours", // Default
    notes: ""
  });

  // Fetch Service Details
  useEffect(() => {
    if (!id) return;

    const fetchService = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/service-details?id=${id}`); 
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

  // Prevent Admin Access
  useEffect(() => {
    if (session?.user?.role === 'admin') {
      toast.error("Admins cannot book services. Please login as a user.");
      router.push("/dashboard"); // Redirect to dashboard or home
    }
  }, [session, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
     if (!service) return 0;
     const hours = parseInt(formData.duration) || 0;
     return hours * service.startingPrice;
  };

  // Payment State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: ""
  });

  const handlePaymentChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'cardNumber') {
       value = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim().slice(0, 19);
    }
    if (e.target.name === 'expiry') {
       value = value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1/').slice(0, 5);
    }
    if (e.target.name === 'cvv') {
       value = value.replace(/\D/g, '').slice(0, 3);
    }
    setPaymentData({ ...paymentData, [e.target.name]: value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please login to book a service");
      router.push("/login");
      return;
    }

    if (session?.user?.role === 'admin') {
      toast.error("Admins cannot book services!");
      return;
    }
    
    // Open Payment Modal
    setShowPaymentModal(true);
  };

  const confirmPaymentAndBooking = async (e) => {
     e.preventDefault();
     setSubmitting(true);

     // Simulate Payment Processing
     await new Promise(resolve => setTimeout(resolve, 1500)); 

     try {
      const bookingPayload = {
        serviceId: service._id,
        serviceName: service.title,
        image: service.image,
        date: formData.date,
        time: formData.time,
        // Store address as an object for detailed location management
        address: {
            division: formData.division,
            district: formData.district,
            city: formData.city,
            area: formData.area,
            details: formData.address // Street/Road/House
        },
        duration: formData.duration,
        price: calculateTotal(),
        notes: formData.notes,
        paymentInfo: {
            status: 'Paid',
            method: 'Credit Card',
            transactionId: 'TXN' + Math.floor(Math.random() * 100000000),
            date: new Date()
        }
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      if (res.ok) {
        toast.success("Payment Successful! Booking Request Sent.");
        setShowPaymentModal(false);
        setTimeout(() => router.push("/dashboard/my-bookings"), 1500);
      } else {
         toast.error("Failed to book service");
         setSubmitting(false);
      }
    } catch (error) {
       toast.error("Something went wrong");
       setSubmitting(false);
    }
  };

  if (loading || !id) return <div className="p-8 text-center">Loading booking details...</div>;
  if (!service) return <div className="p-8 text-center">Service not found</div>;

  return (
    <div className="relative max-w-4xl mx-auto">
      <Toaster position="top-right" />
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Book Service</h1>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        
        {/* Left: Form */}
        <div className="space-y-6 md:col-span-2">
           <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
              <h2 className="mb-4 text-lg font-semibold text-gray-800">Booking Details</h2>
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-sm font-medium text-gray-700">Date</label>
                       <div className="relative">
                          <HiOutlineCalendar className="absolute text-lg text-gray-400 left-3 top-3" />
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
                          <HiOutlineClock className="absolute text-lg text-gray-400 left-3 top-3" />
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
                 
                 {/* Location Details */}
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-sm font-medium text-gray-700">Division</label>
                       <select 
                          name="division"
                          required
                          value={formData.division}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#389482]/20 focus:border-[#389482] outline-none transition-all"
                       >
                          <option value="">Select Division</option>
                          {DIVISIONS.map(div => <option key={div} value={div}>{div}</option>)}
                       </select>
                    </div>
                    <div className="space-y-1">
                       <label className="text-sm font-medium text-gray-700">District</label>
                       <input 
                          type="text"
                          name="district"
                          required
                          placeholder="e.g. Dhaka"
                          value={formData.district}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#389482]/20 focus:border-[#389482] outline-none transition-all"
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-sm font-medium text-gray-700">City/Upazila</label>
                       <input 
                          type="text"
                          name="city"
                          required
                          placeholder="e.g. Gulshan"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#389482]/20 focus:border-[#389482] outline-none transition-all"
                       />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Area/Thana</label>
                        <input 
                           type="text"
                           name="area"
                           required
                           placeholder="e.g. Sector 10"
                           value={formData.area}
                           onChange={handleChange}
                           className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#389482]/20 focus:border-[#389482] outline-none transition-all"
                        />
                     </div>
                 </div>

                 <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Full Address</label>
                    <div className="relative">
                       <HiOutlineLocationMarker className="absolute text-lg text-gray-400 left-3 top-3" />
                       <textarea 
                         name="address"
                         required
                         placeholder="House No, Road No, Flat No..."
                         rows="2"
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
                   className="w-full bg-[#389482] text-white font-bold py-3 rounded-xl hover:bg-[#2f7f70] transition-colors shadow-lg shadow-[#389482]/20"
                 >
                   Proceed to Payment
                 </button>

              </form>
           </div>
        </div>

        {/* Right: Summary */}
        <div className="space-y-6">
           <div className="sticky p-6 bg-white border border-gray-100 shadow-sm rounded-2xl top-24">
              <h3 className="mb-4 font-bold text-gray-800">Order Summary</h3>
              
              <div className="flex gap-4 mb-6">
                 <div className="relative w-20 h-20 overflow-hidden bg-gray-100 rounded-lg shrink-0">
                    <Image src={service.image} alt={service.title} fill className="object-cover" />
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-900 line-clamp-2">{service.title}</h4>
                    <p className="text-sm text-gray-500">{service.priceUnit ? `$${service.startingPrice}/${service.priceUnit}` : 'Custom Quote'}</p>
                 </div>
              </div>

              <div className="py-4 space-y-3 border-t border-gray-200 border-dashed">
                 <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Service Rate</span>
                    <span className="font-medium">${service.startingPrice}/hr</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium">{formData.duration}</span>
                 </div>
                 {formData.division && (
                    <div className="flex justify-between text-sm">
                       <span className="text-gray-500">Location</span>
                       <span className="font-medium truncate max-w-[150px]">{formData.area}, {formData.city}, {formData.division}</span>
                    </div>
                 )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                 <span className="font-bold text-gray-900">Total Estimate</span>
                 <span className="font-bold text-xl text-[#389482]">${calculateTotal()}</span>
              </div>
              
              <p className="mt-6 text-xs text-center text-gray-400">
                 *Final price may vary based on specific requirements. Advance payment required.
              </p>
           </div>
        </div>
      
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
           <div className="w-full max-w-md p-6 space-y-6 bg-white shadow-2xl rounded-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                 <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                    <HiOutlineCurrencyDollar className="text-[#389482] text-2xl" />
                    Secure Payment
                 </h3>
                 <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>

              <div className="flex items-center justify-between p-4 border border-blue-100 bg-blue-50 rounded-xl">
                 <span className="font-medium text-blue-800">Total Amount</span>
                 <span className="text-xl font-bold text-blue-800">${calculateTotal()}</span>
              </div>

              <form onSubmit={confirmPaymentAndBooking} className="space-y-4">
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Card Holder Name</label>
                    <input 
                      required 
                      name="name"
                      placeholder="John Doe"
                      value={paymentData.name}
                      onChange={handlePaymentChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#389482]/20 outline-none"
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Card Number</label>
                    <input 
                      required 
                      name="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      maxLength="19"
                      value={paymentData.cardNumber}
                      onChange={handlePaymentChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#389482]/20 outline-none font-mono"
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-xs font-bold text-gray-500 uppercase">Expiry</label>
                       <input 
                         required 
                         name="expiry"
                         placeholder="MM/YY"
                         maxLength="5"
                         value={paymentData.expiry}
                         onChange={handlePaymentChange}
                         className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#389482]/20 outline-none font-mono text-center"
                       />
                    </div>
                    <div className="space-y-1">
                       <label className="text-xs font-bold text-gray-500 uppercase">CVV</label>
                       <input 
                         required 
                         type="password"
                         name="cvv"
                         placeholder="123"
                         maxLength="3"
                         value={paymentData.cvv}
                         onChange={handlePaymentChange}
                         className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#389482]/20 outline-none font-mono text-center"
                       />
                    </div>
                 </div>

                 <button 
                   type="submit" 
                   disabled={submitting}
                   className="w-full bg-[#389482] text-white font-bold py-3.5 rounded-xl hover:bg-[#2f7f70] transition-colors shadow-lg shadow-[#389482]/20 mt-4 disabled:opacity-70 flex items-center justify-center gap-2"
                 >
                   {submitting ? (
                     <>Processing Payment...</>
                   ) : (
                     <>Pay ${calculateTotal()} & Confirm</>
                   )}
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
