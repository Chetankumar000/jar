import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-95 text-white z-50">
      {/* Glowing Dual Ring Loader */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 rounded-full border-4 border-transparent animate-spin-fast animate-spin border-t-blue-400 border-l-purple-500"></div>
        <div className="absolute w-16 h-16 rounded-full border-4 border-transparent animate-spin-slow  border-t-pink-500 border-r-purple-500"></div>
        <div className="w-12 h-12 bg-white rounded-full shadow-lg"></div>
      </div>

      {/* Stylish Loading Text with Neon Glow */}
      <p className="mt-8 text-2xl font-bold text-white tracking-widest animate-pulse">
        Loading<span className="text-blue-400">.</span>
        <span className="text-purple-400">.</span>
        <span className="text-pink-400">.</span>
      </p>

      {/* Glassmorphism Effect */}
      <div className="absolute bottom-10 px-6 py-3 text-sm text-gray-300 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg border border-gray-500">
        Fetching data, please wait...
      </div>
    </div>
  );
};

export default LoadingScreen;
