import React, { useState, useEffect } from "react";
import { FaExpand, FaCompress } from "react-icons/fa";
import Chatbot from "./Chatbot";

const QuizSection = ({ questions = [] }) => {
  const [selectedQuestionQno, setSelectedQuestionQno] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  console.log(questions);

  // Ensure the first question is selected when questions change
  useEffect(() => {
    if (questions.length > 0) {
      const validSelection = questions.some(
        (q) => q.qno === selectedQuestionQno
      );
      if (!validSelection) {
        setSelectedQuestionQno(questions[0]?.qno);
      }
    } else {
      setSelectedQuestionQno(null);
    }
  }, [questions, selectedQuestionQno]);

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages((prev) => [...prev, { text: chatInput, sender: "user" }]);
      setChatInput("");

      // Simulated bot response
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          { text: "This is a bot response.", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  const toggleFullScreen = () => setIsFullScreen((prev) => !prev);

  // Update option styling logic to match new question format
  const getOptionStyle = (optionKey, questionQno) => {
    const question = questions.find((q) => q.qno === questionQno);

    if (!question) {
      console.error(`Question with qno ${questionQno} not found.`);
      return "bg-gray-500 text-white";
    }

    const { correctAnswer, userAnswer } = question;

    if (userAnswer === "Not Answered") {
      return optionKey === correctAnswer
        ? "bg-yellow-500 text-black"
        : "bg-black text-white";
    }

    if (optionKey === correctAnswer) {
      return "bg-green-500 text-white"; // Correct answer
    }

    if (optionKey === userAnswer) {
      return "bg-red-500 text-white"; // Wrong selected answer
    }

    return "bg-black text-white";
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-60 rounded-md border-2 border-[#004692] text-white">
        <p>No questions available</p>
      </div>
    );
  }

  const selectedQuestion = questions.find((q) => q.qno === selectedQuestionQno);

  return (
    <div
      className={`grid grid-cols-12 ${
        isFullScreen
          ? "fixed inset-0 z-50 bg-black w-screen h-screen"
          : "h-[60vh]"
      } gap-4 border-2 border-[#004692] rounded-lg`}
    >
      {/* Questions List Column */}
      <div className="col-span-3 rounded-l-md border-r-2 border-[#004692]">
        <div className="py-2 flex items-center bg-[#004692] justify-center">
          <h2 className="text-md font-semibold text-white">Questions</h2>
        </div>
        <div
          className={`space-y-1 py-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-black ${
            !isFullScreen ? "max-h-[calc(61vh-4rem)]" : "h-[calc(100vh-4rem)]"
          }`}
        >
          {questions.map((question, index) => (
            <button
              key={question.qno}
              onClick={() => setSelectedQuestionQno(question.qno)}
              className={`block w-full py-2 text-center text-md transition-colors duration-200 ${
                selectedQuestionQno === question.qno
                  ? "bg-[#9D00FF] text-white"
                  : "bg-black text-white"
              }`}
              aria-pressed={selectedQuestionQno === question.qno}
            >
              Question {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Question Detail Column */}
      <div
        className={`p-4 rounded-md shadow-lg relative overflow-hidden ${
          isFullScreen ? "col-span-6 h-full" : "col-span-9"
        }`}
      >
        <div className="flex justify-end items-center mb-4">
          <button
            onClick={toggleFullScreen}
            className="text-sm px-3 py-1 text-white rounded flex items-center space-x-2 transition-transform duration-200 ease-in-out transform hover:scale-110"
            aria-label={isFullScreen ? "Exit Full Screen" : "Full Screen"}
          >
            {isFullScreen ? (
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 25.5V17.1667H3.27778V20.7778L7.58333 16.4722L9.52778 18.4167L5.22222 22.7222H8.83333V25.5H0.5ZM17.1667 25.5V22.7222H20.7778L16.4722 18.4167L18.4167 16.4722L22.7222 20.7778V17.1667H25.5V25.5H17.1667ZM7.58333 9.52778L3.27778 5.22222V8.83333H0.5V0.5H8.83333V3.27778H5.22222L9.52778 7.58333L7.58333 9.52778ZM18.4167 9.52778L16.4722 7.58333L20.7778 3.27778H17.1667V0.5H25.5V8.83333H22.7222V5.22222L18.4167 9.52778Z"
                  fill="white"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 25.5V17.1667H3.27778V20.7778L7.58333 16.4722L9.52778 18.4167L5.22222 22.7222H8.83333V25.5H0.5ZM17.1667 25.5V22.7222H20.7778L16.4722 18.4167L18.4167 16.4722L22.7222 20.7778V17.1667H25.5V25.5H17.1667ZM7.58333 9.52778L3.27778 5.22222V8.83333H0.5V0.5H8.83333V3.27778H5.22222L9.52778 7.58333L7.58333 9.52778ZM18.4167 9.52778L16.4722 7.58333L20.7778 3.27778H17.1667V0.5H25.5V8.83333H22.7222V5.22222L18.4167 9.52778Z"
                  fill="white"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Full Content Display */}
        <div
          className={`overflow-y-visible pr-2 ${
            isFullScreen ? "h-full" : "max-h-[calc(60vh-5rem)]"
          }`}
        >
          {/* Question Text */}
          <p className="mb-4 2xl:text-lg text-sm bg-[#0046924D] 2xl:p-4 p-2 rounded-md text-white">
            {selectedQuestion?.question}
          </p>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4 text-center">
            {selectedQuestion &&
              Object.entries(selectedQuestion.options).map(([key, value]) => (
                <div
                  key={key}
                  className={`2xl:p-2 p-1  2xl:text-lg text-sm rounded-md transition-colors duration-200 border border-[#004692] flex items-center justify-center text-white ${getOptionStyle(
                    key,
                    selectedQuestionQno
                  )}`}
                >
                  {key}) {value}
                </div>
              ))}
          </div>

          {/* Solution */}
          <div className="mt-4">
            <h3 className="font-semibold 2xl:text-lg text-sm">Solution</h3>
            <p className="mt-1 2xl:text-md text-sm rounded-md 2xl:p-4 p-2 bg-[#0046924D]  text-white">
              The correct answer is Option {selectedQuestion?.correctAnswer}.
              <div className="py-3 font-bold">Explaination : </div>
              <div>{selectedQuestion?.explanation}</div>
            </p>
          </div>
        </div>
      </div>
      {isFullScreen && (
        <Chatbot
          chatMessages={chatMessages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          handleSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};

export default QuizSection;
