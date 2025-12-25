"use client";
import React from 'react';
import { motion } from 'motion/react';
import { HiOutlineChevronDown, HiOutlineQuestionMarkCircle } from "react-icons/hi";

const faqs = [
  {
    question: "How do I book a service?",
    answer: "You can book a service by browsing our available services, selecting the one that fits your needs, and clicking 'Book Now'. You will need to choose a date, time, and provide your address. Payment is required to confirm the booking."
  },
  {
    question: "Is CareConnect safe to use?",
    answer: "Yes, absolutely. All our caregivers go through a rigorous background check and verification process. We prioritize the safety and security of both our clients and caregivers."
  },
  {
    question: "Can I cancel a booking?",
    answer: "Yes, you can cancel a booking from your dashboard. However, cancellations made less than 24 hours before the scheduled time may be subject to a cancellation fee."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept major credit cards (Visa, MasterCard, American Express) and online payment methods. All payments are securely processed."
  },
  {
    question: "How do I become a caregiver?",
    answer: "If you are interested in becoming a caregiver, please visit our 'Careers' page or contact our support team. You will need to undergo a background check and training validation."
  },
  {
    question: "What if I'm not satisfied with the service?",
    answer: "Your satisfaction is our priority. If you are not happy with the service provided, please contact our support team immediately. We will investigate the issue and offer a resolution, which may include a refund or a replacement caregiver."
  },
  {
    question: "Do you offer services on weekends/holidays?",
    answer: "Yes, our services are available 7 days a week, including holidays. However, availability may vary depending on the specific service and caregiver."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = React.useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Header */}
      <section className="bg-white px-4 pt-10 pb-16 text-center border-b border-gray-100 lg:pt-24">
         <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-[#e7f0eb] rounded-full text-sm font-medium text-[#389482] mb-6"
        >
            FAQ
        </motion.div>
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#1f242e] mb-6"
        >
            Frequently Asked Questions
        </motion.h1>
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
            Everything you need to know about CareConnect services, billing, and safety.
        </motion.p>
      </section>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto px-4 mt-12 space-y-4">
        {faqs.map((faq, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
             <button 
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
             >
                <span className={`font-bold text-lg ${openIndex === index ? 'text-[#389482]' : 'text-gray-900'}`}>
                    {faq.question}
                </span>
                <HiOutlineChevronDown 
                    className={`text-xl text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-[#389482]' : ''}`}
                />
             </button>
             <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
             >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50 mt-2">
                    {faq.answer}
                </div>
             </div>
          </motion.div>
        ))}
        
        {/* Still have questions CTA */}
        <div className="mt-12 text-center p-8 bg-[#389482] rounded-3xl text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
             <div className="relative z-10">
                 <HiOutlineQuestionMarkCircle className="text-5xl mx-auto mb-4 text-emerald-100" />
                 <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
                 <p className="text-emerald-100 mb-8 max-w-md mx-auto">
                    Can't find the answer you're looking for? Please chat to our friendly team.
                 </p>
                 <a href="/contact" className="inline-block bg-white text-[#389482] px-8 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-lg">
                    Get in Touch
                 </a>
             </div>
        </div>
      </div>
    </div>
  );
}
