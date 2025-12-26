import React from "react";

const Loader = ({ fullScreen = true }) => {
  return (
    <div className={`${fullScreen ? "fixed inset-0 min-h-screen" : "w-full py-20"} flex items-center justify-center bg-white/80 backdrop-blur-sm z-50`}>
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="w-16 h-16 border-4 border-[#389482]/20 border-t-[#389482] rounded-full animate-spin"></div>
        {/* Inner Ring */}
        <div className="absolute w-8 h-8 border-4 border-[#389482]/20 border-b-[#389482] rounded-full animate-spin direction-reverse"></div>
      </div>
    </div>
  );
};

export default Loader;
