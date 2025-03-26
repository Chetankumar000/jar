import React from "react";

const TimeUpScreen = () => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-lg shadow-xl w-11/12 max-w-md text-center">
        <h2 className="text-3xl font-semibold text-white mb-4">Time's Up!</h2>
        <p className="text-gray-200 mb-6">Redirecting to the results page...</p>

        {/* Custom Loader */}
        <div className="w-12 h-12 border-4 border-t-transparent border-white border-solid rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default TimeUpScreen;
