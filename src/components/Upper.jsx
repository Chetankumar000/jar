import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaBars } from "react-icons/fa";

const Upper = ({
  question,
  questionNo,
  onNext,
  onPrev,
  responses,
  questions,
  time,
  setcurrentQuesIndex,
}) => {
  const [showOptions, setShowOptions] = useState(true);

  // Countdown logic

  // Format the time as "mm:ss" with larger digits
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return (
      <>
        <span className="text-2xl font-bold">{minutes}</span>
        <span className="text-md"> mins </span>
        <span className="text-2xl font-bold">
          {remainingSeconds < 10 ? "0" : ""}
          {remainingSeconds}
        </span>
        <span className="text-md"> secs</span>
      </>
    );
  };

  // Helper to check if the question is attempted
  const isAttempted = (questionId) => {
    return responses.hasOwnProperty(questionId); // Checks if response exists for the question
  };

  // Get the question id for the current question
  // const currentQuestionId = questions?.id;

  return (
    <div className="relative my-2 mb-4 2xl:my-4 flex items-center md:px-10 md:py-2 bg-gradient-to-r from-[#004692] to-[#9D00FF] text-white rounded-md overflow-hidden md:overflow-visible">
      {/* Decorative top label */}
      {showOptions ? (
        <div className="absolute hidden md:flex -top-20 left-24 hexagon w-[400px] h-32 bg-[#000E1B] text-[#EDEDED] font-bold text-xl items-end py-6 justify-center">
          Question {questionNo + 1}
        </div>
      ) : (
        <div className="absolute hidden md:flex text-md w-full -top-16 left-12 hexagon3 bg-[#000E1B] h-28 text-white items-end pr-20 pl-36 py-4 justify-evenly">
          {responses.map((r, index) => (
            <div
              key={index}
              onClick={(e) => setcurrentQuesIndex(+e.target.innerText - 1)}
              className={`w-7 h-7 hidden text-xs md:flex items-center justify-center rounded-md cursor-pointer ${
                r.userAnswer !== null
                  ? "bg-[#39ff14]" // Green if the answer exists
                  : "bg-slate-600" // Default color for unanswered
              } ${questionNo === index && "border border-white shadow-lg"}`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="mx-8 my-8 py-3 flex justify-center h-[220px] 2xl:h-[320px] scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent 2xl:text-lg w-full text-center overflow-y-auto">
        {question}
      </div>

      {/* Bottom label for countdown */}
      <div className="absolute hidden md:flex -bottom-7 left-1/2 transform -translate-x-1/2 bg-[#000E1B] w-44 h-14 items-start py-1 justify-center text-white font-bold hexagon4">
        <div> {formatTime(time)}</div>
      </div>

      {/* Additional top-right element */}
      <div className="absolute hidden md:flex -right-16 -top-9 w-28 h-60 bg-[#000E1B] flex-col text-3xl items-start px-3 justify-evenly py-4 text-white font-bold hexagon2">
        <button
          className=""
          onClick={() => setShowOptions(!showOptions)}
          aria-label="Toggle options"
        >
          <FaBars />
        </button>
        <button className="" onClick={onPrev} aria-label="Previous question">
          <FaArrowLeft />
        </button>
        <button className="" onClick={onNext} aria-label="Next question">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Upper;
