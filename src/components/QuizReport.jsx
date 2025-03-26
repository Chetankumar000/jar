import React, { useState } from "react";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import QuizSection from "./QuizSection";
import QuizGraph from "./QuizGraph";

const QuizReport = ({
  correctAnswers,
  questionLen,
  selectedFilters,
  onFilterChange,
  Acc,
  Ach,
  Streak,
  Pace,
}) => {
  // State to toggle filter dropdown visibility
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // const [selectedFilters, setSelectedFilters] = useState({
  //   correct: false,
  //   wrong: false,
  //   notAttempted: false,
  // });

  // Toggle function for filter dropdown
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Handle filter checkbox changes
  // const handleCheckboxChange = (event) => {
  //   const { name, checked } = event.target;
  //   setSelectedFilters((prev) => ({
  //     ...prev,
  //     [name]: checked,
  //   }));
  // };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const updatedFilters = { ...selectedFilters, [name]: checked };
    onFilterChange(updatedFilters); // Notify parent
  };

  const formattedCorrectAnswers = String(correctAnswers).padStart(2, "0");
  const formattedQuestionLength = String(questionLen).padStart(2, "0");

  return (
    <div className="">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center 2xl:mt-4 space-y-4 md:space-y-0">
        {/* Left Section: Fraction and Performance Message */}
        <div className="flex items-center space-x-4">
          {/* Fraction Container */}
          <div className="flex text-sm 2xl:text-lg justify-center border-4 2xl:border-[0.35rem] border-[#39FF14] 2xl:w-20 2xl:h-20 w-14 h-14 rounded-full p-2 items-center shadow-md">
            <BlockMath
              math={`\\frac{${formattedCorrectAnswers}}{${formattedQuestionLength}}`}
            />
          </div>

          {/* Performance Message */}
          <div className="flex flex-col text-gray-700">
            <span className="2xl:text-2xl text-lg text-white">
              Congratulations, keep up the good work!
            </span>
            <span className="text-gray-300 2xl:text-lg text-xs">
              Let's review your performance...
            </span>
          </div>
        </div>

        {/* Right Section: Rank Button */}
        <div>
          <div className="text-white text-md 2xl:text-2xl py-2 px-6 bg-gradient-to-r from-[#004692] to-[#9D00FF] rounded-md shadow-md transition duration-200 ease-in-out">
            Test Rank: 1230
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-12 gap-4  2xl:gap-12 mt-4 2xl:mt-8">
        {/* Left Section */}
        <div className="col-span-12 md:col-span-5 space-y-8 2xl:space-y-12">
          {/* Inner Grid Row 1 */}
          <div className="grid grid-cols-2 gap-6 2xl:gap-12">
            <div className="relative bg-gradient-to-r from-[#004692BF] to-[#9D00FF] 2xl:h-[13rem] h-[9rem] text-white rounded-md shadow-md overflow-hidden flex flex-col justify-center items-end">
              {/* Left Image */}
              <img
                src="/img/target.png" // Replace with the correct file path
                alt="Pace Illustration"
                className="absolute 2xl:-left-14 -left-8 top-1/2 transform -translate-y-1/2 w-36 h-36  2xl:w-48 2xl:h-48"
              />

              {/* Content */}
              <div className="relative z-10 2xl:gap-12 gap-6 text-center flex flex-col justify-evenly 2xl:pr-10 pr-8 pt-2 items-stretch">
                <h2 className="text-md 2xl:text-xl font-bold">Accuracy</h2>
                <p className="2xl:text-md   pb-8  font-medium">
                  <span className="font-semibold text-5xl 2xl:text-5xl">
                    {Math.floor(Acc)}
                  </span>
                  <span className="text-xs">%</span>
                </p>
              </div>
            </div>
            <div className="relative bg-gradient-to-r from-[#004692BF] to-[#9D00FF] 2xl:h-[13rem] h-[9rem] text-white rounded-md shadow-md overflow-hidden flex flex-col justify-center items-end">
              {/* Left Image */}
              <img
                src="/img/clock.png" // Replace with the correct file path
                alt="Pace Illustration"
                className="absolute 2xl:-left-14 -left-8 top-1/2 transform -translate-y-1/2 w-36 h-36  2xl:w-48 2xl:h-48"
              />

              {/* Content */}
              <div className="relative z-10 2xl:gap-12 gap-6 text-center flex flex-col justify-center 2xl:pr-10 pr-8 pt-2 items-stretch">
                <h2 className="text-md 2xl:text-xl font-bold">Pace</h2>
                <p className="text-md pb-8 font-medium">
                  <span className="font-semibold text-5xl 2xl:text-5xl">
                    {Math.floor(Pace)}
                  </span>
                  <span className="text-xs">q/min</span>
                </p>
              </div>
            </div>
          </div>
          {/* Inner Grid Row 2 */}
          <div className="grid grid-cols-2 gap-4 2xl:gap-12">
            <div className="relative bg-gradient-to-r from-[#004692BF] to-[#9D00FF] 2xl:h-[13rem] h-[9rem] text-white rounded-md shadow-md overflow-hidden flex flex-col justify-center items-end">
              {/* Left Image */}
              <img
                src="/img/medal.png" // Replace with the correct file path
                alt="Pace Illustration"
                className="absolute 2xl:-left-14 -left-8 top-1/2 transform -translate-y-1/2  w-36 h-36  2xl:w-48 2xl:h-48"
              />

              {/* Content */}
              <div className="relative z-10 2xl:gap-12 gap-6 text-center flex flex-col justify-center 2xl:pr-8 pr-4 pt-2  items-stretch">
                <h2 className="text-md 2xl:text-xl font-bold">Achievements</h2>
                <p className="text-md pb-8  font-medium">
                  <span className="font-semibold  text-5xl 2xl:text-5xl">
                    {Math.floor(Ach)}
                  </span>
                  <span className="text-xs">%</span>
                </p>
              </div>
            </div>
            <div className="relative bg-gradient-to-r from-[#004692BF] to-[#9D00FF] 2xl:h-[13rem] h-[9rem]  text-white rounded-md shadow-md overflow-hidden flex flex-col justify-center items-end">
              {/* Left Image */}
              <img
                src="/img/fire.png" // Replace with the correct file path
                alt="Pace Illustration"
                className="absolute 2xl:-left-14 -left-8 top-1/2 transform -translate-y-1/2  w-36 h-36  2xl:w-48 2xl:h-48"
              />

              {/* Content */}
              <div className="relative z-10 2xl:gap-12 gap-6 text-center flex flex-col justify-center 2xl:pr-14 pr-10 pt-2 items-center">
                <h2 className="text-md 2xl:text-xl font-bold">Streak</h2>
                <p className="text-md pb-8 font-medium">
                  <span className="font-semibold 2xl:text-5xl text-5xl">
                    {Streak}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-[#0046924D] col-span-7 p-2 rounded-md shadow-md text-white">
          <QuizGraph />
        </div>
      </div>

      {/* Section Buttons and Filter Icon */}
      <div className="flex items-center justify-between 2xl:py-10 py-4 rounded-md">
        {/* Section Buttons */}
        <div className="flex space-x-4">
          <button className="border-2 border-[#004692] hover:bg-[#9D00FFBF] text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600">
            Section-A
          </button>
          <button className="border-2 border-[#004692] hover:bg-[#9D00FFBF] text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600">
            Section-B
          </button>
          <button className=" border-2 border-[#004692] hover:bg-[#9D00FFBF] text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600">
            Section-C
          </button>
        </div>

        {/* Filter Icon */}
        <div className="relative">
          <div
            className="text-white hover:text-gray-700 cursor-pointer"
            onClick={toggleFilter} // Toggle dropdown on click
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 12.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 018 17v-4.586L3.293 6.707A1 1 0 013 6V4z"
              />
            </svg>
          </div>

          {/* Dropdown Filter Options with Checkboxes */}
          {isFilterOpen && (
            <div className="absolute top-8 right-0 bg-[#004692]  rounded-md shadow-md p-4 w-40 z-20">
              <div className="flex flex-col space-y-2">
                <label className="flex items-center text-sm ">
                  <input
                    type="checkbox"
                    name="correct"
                    checked={selectedFilters.correct}
                    onChange={handleCheckboxChange}
                    className="mr-2 appearance-none h-4 w-4 border-2 border-[#9D00FF] rounded-md checked:bg-[#9D00FF]"
                  />
                  Correct
                </label>
                <label className="flex items-center text-sm ">
                  <input
                    type="checkbox"
                    name="wrong"
                    checked={selectedFilters.wrong}
                    onChange={handleCheckboxChange}
                    className="mr-2 appearance-none h-4 w-4 border-2 border-[#9D00FF] rounded-md checked:bg-[#9D00FF]"
                  />
                  Wrong
                </label>
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    name="unattempted"
                    checked={selectedFilters.unattempted}
                    onChange={handleCheckboxChange}
                    className="mr-2 appearance-none h-4 w-4 border-2 border-[#9D00FF] rounded-md checked:bg-[#9D00FF]"
                  />
                  Not Attempted
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quiz Section */}
    </div>
  );
};

export default QuizReport;
