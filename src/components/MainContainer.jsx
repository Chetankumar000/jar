import React, { useState, useEffect } from "react";
import Upper from "./Upper";
import Lower from "./Lower";
import { useParams } from "react-router";
import { getQuestions } from "../utils/api";

const MainContainer = () => {
  const [currentQuesIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true); // To handle the loading state
  const { topicId, difficulty } = useParams();

  // Fetch questions based on topicId and difficulty
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getQuestions(topicId, difficulty);
        setQuestions(fetchedQuestions);
        setLoading(false); // Set loading to false after fetching questions
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchQuestions();
  }, [topicId, difficulty]);

  const nextQuestion = () => {
    if (currentQuesIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuesIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuesIndex > 0) {
      setCurrentQuestionIndex(currentQuesIndex - 1);
    }
  };

  const handleResponse = (answer) => {
    const question = questions[currentQuesIndex];
    const isCorrect = answer === question.correctAnswer;
    setResponses((prevResponses) => ({
      ...prevResponses,
      [question.id]: { answer, isCorrect },
    }));
  };

  // Ensure to render only after questions are loaded
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!questions.length) {
    return <div>No questions available. Hey </div>;
  }

  const currentQuestion = questions[currentQuesIndex];

  return (
    <div className="">
      <Upper
        question={currentQuestion.questionText}
        onNext={nextQuestion}
        onPrev={prevQuestion}
        questionNo={currentQuesIndex}
        responses={responses} // Adding 1 to show the actual question number
      />
      <Lower
        options={currentQuestion.options}
        onSelect={handleResponse}
        selectedResponse={responses[currentQuestion.id]?.answer}
        onNext={nextQuestion}
        onPrev={prevQuestion}
      />
    </div>
  );
};

export default MainContainer;
