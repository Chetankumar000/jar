import React from "react";

const QuizLoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-90 text-white z-50">
      {/* Quiz-themed animated icon */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Outer circle with gradient spin */}
        <div className="absolute w-full h-full border-4 border-transparent rounded-full animate-spin-slow bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 bg-origin-border p-1">
          <div className="w-full h-full bg-gray-900 rounded-full"></div>
        </div>

        {/* Quiz icon (question mark) */}
        <div className="absolute text-4xl font-bold bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          ?
        </div>
      </div>

      {/* Loading text with typing animation */}
      <p className="mt-6 text-xl font-semibold animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-1">
        Preparing your quiz...
      </p>
    </div>
  );
};

export default QuizLoadingScreen;
