import React, { useEffect, useState } from "react";
import Upper from "../components/Upper";
import Lower from "../components/Lower";
import { useParams } from "react-router";
// import { getQuestions } from "../utils/api";
import useQuizStore from "../stores/useQuizStore";
import QuizEndConfirm from "../components/QuizEndConfirm";
import { useNavigate } from "react-router";
import TimeUpScreen from "../components/TimeUpScreen";
import { useLocation } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";
import DrawerComponent from "../components/DrawerComponent";
import useAuthStore from "../stores/useAuthStore";
import SubmitLoading from "../components/SubmitLoading";
import LoadingScreen from "../components/LoadingScreen";

const QuizQuestionPage = () => {
  const {
    questions,
    currentQuesIndex,
    responses,
    loading,
    setQuestions,
    setLoading,
    nextQuestion,
    prevQuestion,
    addResponse,
    resetResponses,
    resetcurrentQuesIndex,
    setcurrentQuesIndex,
  } = useQuizStore();

  const user = useAuthStore.getState().user;
  const token = useAuthStore.getState().token;
  const setQuizId = useQuizStore((state) => state.setQuizId);
  const quizId = useQuizStore.getState().quizId;

  const location = useLocation();

  const { selectedClass, subjectId, topicId, difficulty } =
    location.state || {};

  const [showConfirm, setShowConfirm] = useState(false);
  const [time, setTime] = useState(300); // 30 seconds for the timer
  const [timeUp, setTimeUp] = useState(false); // Flag for time's up screen
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);

  console.log(responses);

  useEffect(() => {
    resetResponses();
    resetcurrentQuesIndex();
  }, []);

  // Fetch questions based on topicId and difficulty
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true); // Start loading
      try {
        const fetchedData = await getQuestions();
        const fetchedQuestions = fetchedData.questions;

        // Transform options into an array for easier rendering
        const formattedQuestions = fetchedQuestions.map((q) => ({
          ...q,
          options: [q.optiona, q.optionb, q.optionc, q.optiond],
        }));

        if (formattedQuestions.length > 0) {
          setQuestions(formattedQuestions); // Save questions in the store
        } else {
          console.warn(
            "No questions fetched for the given topic or difficulty."
          );
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    // Validate topicId and difficulty
    if (topicId && difficulty) {
      fetchQuestions();
    } else {
      console.warn("Invalid topicId or difficulty:", { topicId, difficulty });
    }
  }, [topicId, difficulty, setQuestions, setLoading]);

  useEffect(() => {
    if (!loading && questions && questions.length > 0 && time > 0) {
      const timerId = setTimeout(
        () => setTime((prevTime) => prevTime - 1),
        1000
      );
      return () => clearTimeout(timerId);
    }

    if (time === 0) {
      setTimeUp(true);
      setTimeout(() => {
        handleConfirm();
      }, 3000); // Redirect after 3 seconds
    }
  }, [loading, questions, time, navigate]);

  const getQuestions = async () => {
    try {
      const response = await fetch(
        "https://quizfullapp.onrender.com/quizStart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            step: 3,
            selectedClass: selectedClass,
            subjectName: subjectId,
            topicName: topicId,
            difficulty: difficulty,
            title: "Random Quiz",
            userId: user?.id,
            token: token,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(response || "Failed to fetch Questions");
      }

      const data = await response.json();
      console.log("Response Data:", data); // Log the response to see its structure
      // Assuming data is { data: { subjects: [...] } }
      setQuizId(data?.sessionId);
      return data || [];
    } catch (error) {
      console.error("Error fetching Questions:", error);
      return [];
    }
  };

  const handleResponse = (answer) => {
    const question = questions[currentQuesIndex];
    // Check correctness
    addResponse(question.id, answer); // Save response in the store
  };

  const handleConfirm = async () => {
    try {
      // Retrieve token (assuming it's stored in localStorage or context)
      // Adjust based on your auth flow
      setSubmitLoading(true);
      const response = await fetch(
        "https://quizfullapp.onrender.com/submitQuiz",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`, // Include token in the request
          },
          body: JSON.stringify({
            sessionId: quizId,
            timeTaken: 300 - time,
            userId: user?.id,
            answers: responses,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to Submit Quiz");
      }

      const data = await response.json();
      console.log(data);

      // Ensure data is returned correctly
      return data || [];
    } catch (error) {
      console.error("Error Submitting Quiz:", error);
      return [];
    } finally {
      setSubmitLoading(false);
      // Ensure navigation and state updates happen after the request
      navigate("/quizme/quizResult", { replace: true });
      setShowConfirm(false);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  // Display loading state
  if (loading) {
    return <LoadingScreen />;
  }

  // Display fallback state if no questions
  if (!questions || questions.length === 0) {
    return (
      <div className="no-questions">
        <p>No questions available. Please try again later.</p>
      </div>
    );
  }

  if (submitLoading) {
    return <SubmitLoading />;
  }

  if (timeUp) {
    return <TimeUpScreen />;
  }

  const currentQuestion = questions[currentQuesIndex]; // Fetch the current question
  console.log(responses[currentQuesIndex]?.userAnswer);

  return (
    <div className="px-24 pt-12 2xl:px-20">
      <div className="quiz-question-page">
        <DrawerComponent />
        <Upper
          question={currentQuestion.question} // Pass question text
          questionNo={currentQuesIndex} // Adjust index for display
          totalQuestions={questions.length} // Pass total questions count
          responses={responses}
          onNext={nextQuestion}
          onPrev={prevQuestion}
          questions={questions}
          time={time}
          setcurrentQuesIndex={setcurrentQuesIndex}
        />
        <Lower
          options={currentQuestion.options} // Pass options for the current question
          onSelect={handleResponse}
          selectedResponse={responses[currentQuesIndex]?.userAnswer} // Highlight user's response
          onNext={nextQuestion}
          onPrev={prevQuestion}
          onEndQuiz={() => setShowConfirm(true)}
        />
        <SubmitButton onClick={() => setShowConfirm(true)} />

        {showConfirm && (
          <QuizEndConfirm
            responses={responses}
            onCancel={handleCancel}
            onEndQuiz={handleConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default QuizQuestionPage;
