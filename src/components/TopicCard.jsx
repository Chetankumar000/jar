import React from "react";

const TopicCard = ({ topic, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(topic)}
      className={`relative h-[5.5rem] w-[7rem] 2xl:h-[8rem] 2xl:w-[10rem] 
        cursor-pointer group overflow-hidden rounded-sm 
        flex items-center justify-center 
        transition-all duration-300 
        ${
          isSelected
            ? "bg-[#9D00FF] border-2 border-[#ffffff] shadow-lg scale-105" // Selected state
            : "bg-[#000E1B] hover:bg-[#004692]" // Default state
        }`}
    >
      {/* Topic Name (moves to top on hover) */}
      <div
        className={`absolute text-xs 2xl:text-lg font-semibold 
          top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 
          text-white transition-all duration-1000 group-hover:top-2 group-hover:-translate-y-0 ${
            isSelected && "top-2 -translate-y-0"
          }`}
      >
        {topic}
      </div>

      {/* Description Overlay (appears below the title on hover) */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center 
          text-[0.7rem] text-white bg-gradient-to-r from-[#004692] to-[#9D00FF] 
          bg-opacity-90 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ${
            isSelected && "opacity-100"
          }`}
      >
        <div className="flex flex-col items-center text-center p-1">
          <div className="mb-2 2xl:text-lg text-sm font-semibold">{topic}</div>
          <div className="2xl:text-[0.8rem] text-[0.5rem] opacity-90">
            Description of {topic} Lorem ipsum dolor sit amet consectetur
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
