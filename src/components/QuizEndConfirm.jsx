import React from "react";
import useQuizStore from "../stores/useQuizStore";

const QuizEndConfirm = ({ responses, onCancel, onEndQuiz }) => {
  const res = responses.filter(
    (response) => response.userAnswer !== null
  ).length;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-lg shadow-xl w-11/12 max-w-md text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Are you sure you want to end the quiz?
        </h2>
        <p className="text-gray-200 mb-6">
          You have completed {res} out of 20 questions.
        </p>
        <div className="flex justify-between gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onEndQuiz}
            className="px-6 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-all"
          >
            End Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizEndConfirm;
