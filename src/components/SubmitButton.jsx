import React from "react";

const SubmitButton = ({ text = "Submit", onClick, className = "" }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        className={`px-4 py-2 mt-1 2xl:mt-2  text-white rounded-md hover:bg-[#004692] transition-all duration-300 ${className}`}
      >
        {text}
      </button>
    </div>
  );
};

export default SubmitButton;
