import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <div className="mb-3 rounded-lg">
      <summary
        onClick={toggleAccordion}
        className={`p-2 2xl:p-3 bg-[#004692] text-white font-bold cursor-pointer flex justify-between items-center rounded-lg ${
          isOpen ? "rounded-b-none" : ""
        }`}
      >
        <span className="font-semibold text-lg sm:text-sm font-inter">
          {title}
        </span>
        <span>
          {isOpen ? (
            <svg width="20" height="12" viewBox="0 0 20 13" fill="none">
              <path
                d="M10 0.333293L20 10.3333L17.6667 12.6666L10 4.99996L2.33333 12.6666L0 10.3333L10 0.333293Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg width="20" height="12" viewBox="0 0 28 17" fill="none">
              <path
                d="M14 16.65L0.5 3.15L3.65 0L14 10.35L24.35 0L27.5 3.15L14 16.65Z"
                fill="white"
              />
            </svg>
          )}
        </span>
      </summary>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden border-2 border-[#004692] rounded-b-lg"
          >
            <div className="p-4 max-h-60 overflow-auto">
              <p>{content}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function DifficultySelection() {
  const navigate = useNavigate();
  const { subjectId, topicId } = useParams();
  const [difficulty, setDifficulty] = useState("Easy");
  const location = useLocation();
  const { selectedClass } = location.state || {};

  const handleStartClick = () => {
    navigate("/quizstart", {
      state: {
        selectedClass,
        subjectId,
        topicId,
        difficulty,
      },
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="mx-auto 2xl:px-16">
      <div className="flex w-full items-center gap-6 mt-5">
        <div
          onClick={handleGoBack}
          className="cursor-pointer w-8 h-8 2xl:h-10 2xl:w-10"
        >
          <svg
            viewBox="0 0 68 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6045 38.1667L39.9378 61.5L34.0003 67.3334L0.666992 34L34.0003 0.666687L39.9378 6.50002L16.6045 29.8334H67.3337V38.1667H16.6045Z"
              fill="white"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-4xl font-bold font-inter mb-1">QUIZ TITLE</h1>
          <div className="flex space-x-3 text-md font-inter font-medium">
            <span>{topicId}</span>
            <span>|</span>
            <span>{subjectId}</span>
            <span>|</span>
            <span>{selectedClass}</span>
          </div>
        </div>
      </div>

      <div className="flex pl-12 mt-6 flex-col w-full items-center justify-center">
        {/* Accordions */}
        <div className="w-full mb-4">
          <Accordion
            title="RULES"
            content={
              <>
                <ul className="list-disc pl-5">
                  <li>
                    Each team will be asked <strong>2 questions</strong>, worth{" "}
                    <strong>10 marks each</strong>.
                    <ul className="list-circle pl-5">
                      <li>
                        <strong>Time Limit:</strong> 30 seconds per question.
                      </li>
                    </ul>
                  </li>
                  <li>
                    If the allotted team is unable to answer:
                    <ul className="list-circle pl-5">
                      <li>
                        The question will be{" "}
                        <strong>passed to subsequent teams</strong>.
                      </li>
                      <li>
                        Subsequent teams will have <strong>15 seconds</strong>{" "}
                        to answer.
                      </li>
                      <li>
                        <strong>Marks Awarded:</strong> 5 marks for each correct
                        answer.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Every team must choose their favorite subject from:
                    <ul className="list-circle pl-5">
                      <li>
                        <strong>Physics</strong>, <strong>Chemistry</strong>, or{" "}
                        <strong>Mathematics</strong>.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Teams will be asked <strong>2 questions</strong> from their
                    chosen subject.
                    <ul className="list-circle pl-5">
                      <li>
                        <strong>Time Limit:</strong> 60 seconds per question.
                      </li>
                      <li>
                        <strong>Marks Awarded:</strong> 15 marks for each
                        correct answer.
                      </li>
                    </ul>
                  </li>
                </ul>
              </>
            }
          />
          <Accordion
            title="SAMPLE QUESTIONS"
            content="Each correct answer awards you 10 points. No negative marking."
          />
          <Accordion
            title="TOPICS"
            content="Focus on the easy questions first to maximize your score."
          />
        </div>
        {/* Horizontal Columns */}
        <div className="grid grid-cols-12 gap-4 w-full">
          {/* Power-ups Column */}
          <div className="col-span-5 p-4 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4 font-inter text-center">
              POWERUPS
            </h3>

            {[
              { name: "Chance Booster", bg: "bg-[#FFD700]" },
              { name: "Neural Link", bg: "bg-[#00FFFF]" },
              { name: "Wisdom Wave", bg: "bg-[#ADD8E6]" },
            ].map((item, index) => (
              <button
                // onClick={() => handlePowerUpClick(item.name)}
                className={`block  w-full py-2 mb-2 font-semibold rounded-lg shadow-md ${item.bg} text-black  transition-all duration-200`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Filters Column */}
          <div className="col-span-2 p-4 border rounded-lg">
            <h3 className="text-xl font-semibold text-center font-inter mb-4">
              FILTERS
            </h3>
            <div className="flex flex-col space-y-2">
              {[1, 2, 3, 4].map((fil, ind) => {
                return (
                  <label className="flex items-center text-lg ">
                    <input
                      type="checkbox"
                      name="correct"
                      className="mr-2 appearance-none h-4 w-4 border-2 border-[#9D00FF] rounded-md checked:bg-[#9D00FF]"
                    />
                    Filter {fil}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Difficulty Column */}
          <div className="col-span-5 p-4 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4 font-inter text-center">
              DIFFICULTY
            </h3>

            {["Easy", "Medium", "Hard"].map((diff, ind) => {
              const colorMap = {
                Easy: "bg-green-500 hover:bg-green-600",
                Medium: "bg-yellow-500 hover:bg-yellow-600",
                Hard: "bg-red-500 hover:bg-red-600",
              };

              return (
                <button
                  key={ind}
                  onClick={() => setDifficulty(diff)}
                  className={`block w-full py-2 mb-2 font-semibold rounded-lg shadow-md transition-all duration-200 text-white ${
                    difficulty === diff
                      ? colorMap[diff]
                      : "bg-[#1E1E1E] hover:bg-gray-700"
                  }`}
                >
                  {diff}
                </button>
              );
            })}
          </div>
        </div>

        {/* Start Quiz Button */}
        <div className="mt-8 space-x-4">
          <button className="w-48 py-3 px-4 bg-[#004692] text-lg font-inter text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200">
            Sample Quiz
          </button>
          <button
            onClick={handleStartClick}
            className="w-48 py-3 px-4 bg-[#9D00FF] text-lg font-inter text-white font-semibold rounded-lg shadow-md hover:bg-purple transition-all duration-200"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default DifficultySelection;
