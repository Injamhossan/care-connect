"use client";
import React, { useState, useEffect } from "react";
import { HiOutlineCurrencyDollar, HiOutlineCalendar, HiOutlineCreditCard } from "react-icons/hi";
import Loader from "@/components/common/Loader";

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch("/api/admin/payments");
        if (res.ok) {
          const data = await res.json();
          setPayments(data);
        }
      } catch (error) {
        console.error("Error fetching payments");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader fullScreen={false} /></div>;

  const totalRevenue = payments.reduce((acc, curr) => acc + (parseFloat(curr.price) || 0), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
         <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
         <div className="bg-white px-6 py-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
               <HiOutlineCurrencyDollar className="text-xl" />
            </div>
            <div>
               <p className="text-xs text-gray-500 uppercase font-bold">Total Revenue</p>
               <p className="text-xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600">Transaction ID</th>
              <th className="px-6 py-4 font-semibold text-gray-600">User</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Service</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Date</th>
              <th className="px-6 py-4 font-semibold text-gray-600 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {payments.map((payment) => (
              <tr key={payment._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                     <HiOutlineCreditCard className="text-gray-400" />
                     <span className="font-mono text-sm text-gray-600">{payment.paymentInfo?.transactionId || 'N/A'}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                   <p className="font-medium text-gray-900">{payment.userName || "Unknown"}</p>
                   <p className="text-xs text-gray-500">{payment.userEmail}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {payment.service}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                     <HiOutlineCalendar className="text-gray-400" />
                     {payment.paymentInfo?.date ? new Date(payment.paymentInfo.date).toLocaleDateString() : 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-block font-bold text-[#389482] bg-[#389482]/10 px-3 py-1 rounded-lg">
                    ${payment.price}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {payments.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No payment records found.
          </div>
        )}
      </div>
    </div>
  );
}
