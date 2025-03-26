import React, { useState, useEffect, useCallback } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Lower.css";

const EndQuizIcon = () => (
  <div className="w-10 h-10 2xl:w-16 2xl:h-16">
    <svg viewBox="0 0 78 88" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.83333 75.5C6.54167 75.5 4.57986 74.684 2.94792 73.0521C1.31597 71.4201 0.5 69.4583 0.5 67.1667V25.5C0.5 18.5556 2.93056 12.6528 7.79167 7.79167C12.6528 2.93056 18.5556 0.5 25.5 0.5H50.5C57.4444 0.5 63.3472 2.93056 68.2083 7.79167C73.0694 12.6528 75.5 18.5556 75.5 25.5V67.1667C75.5 69.4583 74.684 71.4201 73.0521 73.0521C71.4201 74.684 69.4583 75.5 67.1667 75.5H8.83333ZM8.83333 67.1667H67.1667V25.5C67.1667 20.9167 65.5347 16.9931 62.2708 13.7292C59.0069 10.4653 55.0833 8.83333 50.5 8.83333H25.5C20.9167 8.83333 16.9931 10.4653 13.7292 13.7292C10.4653 16.9931 8.83333 20.9167 8.83333 25.5V67.1667ZM25.5 38C23.2083 38 21.2465 37.184 19.6146 35.5521C17.9826 33.9201 17.1667 31.9583 17.1667 29.6667C17.1667 27.375 17.9826 25.4132 19.6146 23.7812C21.2465 22.1493 23.2083 21.3333 25.5 21.3333C27.7917 21.3333 29.7535 22.1493 31.3854 23.7812C33.0174 25.4132 33.8333 27.375 33.8333 29.6667C33.8333 31.9583 33.0174 33.9201 31.3854 35.5521C29.7535 37.184 27.7917 38 25.5 38ZM50.5 38C48.2083 38 46.2465 37.184 44.6146 35.5521C42.9826 33.9201 42.1667 31.9583 42.1667 29.6667C42.1667 27.375 42.9826 25.4132 44.6146 23.7812C46.2465 22.1493 48.2083 21.3333 50.5 21.3333C52.7917 21.3333 54.7535 22.1493 56.3854 23.7812C58.0174 25.4132 58.8333 27.375 58.8333 29.6667C58.8333 31.9583 58.0174 33.9201 56.3854 35.5521C54.7535 37.184 52.7917 38 50.5 38ZM17.1667 67.1667V58.8333C17.1667 56.5417 17.9826 54.5799 19.6146 52.9479C21.2465 51.316 23.2083 50.5 25.5 50.5H50.5C52.7917 50.5 54.7535 51.316 56.3854 52.9479C58.0174 54.5799 58.8333 56.5417 58.8333 58.8333V67.1667H50.5V58.8333H42.1667V67.1667H33.8333V58.8333H25.5V67.1667H17.1667Z"
        fill="#9D00FF"
      />
    </svg>
  </div>
);

const Lower = ({
  options = [],
  onSelect,
  selectedResponse,
  onNext,
  onPrev,
  onEndQuiz,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (selectedResponse) {
      const index = selectedResponse.charCodeAt(0) - 65; // Convert 'A', 'B', 'C'... to index
      if (index >= 0 && index < options.length) {
        setActiveIndex(index);
      }
    } else {
      setActiveIndex(null);
    }
  }, [options, selectedResponse]);

  const handleOptionClick = useCallback(
    (index) => {
      setActiveIndex(index);
      onSelect(String.fromCharCode(65 + index)); // Convert index to 'A', 'B', 'C'...
    },
    [onSelect]
  );

  function getLetterFromNumber(num) {
    return String.fromCharCode(65 + num); // 64 is the ASCII code for '@', so 65 ('A') is 1.
  }

  return (
    <div className="relative w-full grid gap-2 2xl:gap-4 2xl:text-2xl place-items-center grid-cols-1 md:grid-cols-2">
      {options.map((option, index) => (
        <div
          key={index}
          className={`box flex items-center justify-center w-full p-3 ${
            activeIndex === index ? "active" : ""
          }`}
          onClick={() => handleOptionClick(index)}
        >
          <span className="mr-4 font-bold">
            {getLetterFromNumber(index) + ")"}
          </span>
          <span>{option}</span>
        </div>
      ))}

      <div className="circle">
        <button>
          <EndQuizIcon />
        </button>
      </div>

      <div className="flex md:hidden items-center justify-between w-full py-4">
        <button className="text-3xl text-white" onClick={onNext}>
          <FaArrowLeft />
        </button>
        <button className="text-3xl text-white" onClick={onPrev}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default React.memo(Lower);
