"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";

const InitialLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading or wait for hydration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds splash screen

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <Loader fullScreen={false} />
    </div>
  );
};

export default InitialLoader;
