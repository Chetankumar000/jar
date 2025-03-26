import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import QuizReport from "../components/QuizReport";
import QuizGraph from "../components/QuizGraph";
import QuizSection from "../components/QuizSection";
import useAuthStore from "../stores/useAuthStore"; // Assuming user details are stored
import useQuizStore from "../stores/useQuizStore";

const QuizResult = () => {
  const { user, token } = useAuthStore(); // Get user details
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const quizId = useQuizStore.getState().quizId;
  const [acc, setAcc] = useState(0);
  const [pace, setPace] = useState(0);
  const [ach, setAch] = useState(0);
  const [streak, setStreak] = useState(0);

  // Track the selected filters (correct, wrong, unattempted)
  const [selectedFilters, setSelectedFilters] = useState({
    correct: false,
    wrong: false,
    unattempted: false,
  });

  const bodyData = user
    ? { userId: user?.id, token: token }
    : { sessionId: quizId };

  // Fetch quiz results from API
  useEffect(() => {
    const fetchQuizResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://quizfullapp.onrender.com/quizResult",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch quiz results");
        }

        const data = await response.json();
        console.log("Responses:", data); // Log the response to see its structure

        setQuestions(data.questions || []);
        setAcc(data.accuracy);
        setAch(data?.achievement);
        setStreak(data?.streak);
        setPace(data?.pace);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizResults();
  }, [user?.id]);

  // Handle filter selection
  const handleFilterChange = (filter) => {
    setSelectedFilters(filter);
  };

  // // Calculate the correct answers count
  const correctAnswers = questions.filter(
    (question) => question?.isCorrect
  ).length;

  // Filter questions based on selected filters
  const filteredQuestions = questions.filter((question) => {
    if (!Object.values(selectedFilters).includes(true)) {
      return true; // Show all questions if no filters are selected
    }

    if (selectedFilters.correct && question.isCorrect) return true;
    if (
      selectedFilters.wrong &&
      question.userAnswer !== "Not Answered" &&
      !question.isCorrect
    )
      return true;
    if (selectedFilters.unattempted && question.userAnswer === "Not Answered")
      return true;

    return false;
  });

  return (
    <div className="w-full h-full">
      {/* <Header /> */}

      <div className="flex-1 flex flex-col py-2 2xl:mx-8 mx-12 shadow-lg rounded-lg ">
        {loading ? (
          <div className="text-center text-white py-6">
            Loading quiz results...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-6">{error}</div>
        ) : (
          <div className="2xl:px-16">
            <QuizReport
              correctAnswers={correctAnswers}
              questionLen={questions.length}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              Acc={acc}
              Ach={ach}
              Streak={streak}
              Pace={pace}
            />

            {/* Pass filtered questions to QuizSection */}
            <QuizSection questions={filteredQuestions} />
          </div>
        )}
      </div>

      {/* <QuizGraph /> */}
    </div>
  );
};

export default QuizResult;
