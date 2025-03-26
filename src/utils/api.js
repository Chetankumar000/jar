// api.js
import quizData from "./quizData";

export function getClasses() {
  return Promise.resolve(quizData.classes);
}

export function getSubjects(classId) {
  return Promise.resolve(quizData.subjects[classId] || []);
}

export function getTopics(subjectId) {
  return Promise.resolve(quizData.topics[subjectId] || []);
}

// export function getQuestions(topicId, difficulty) {
//   return Promise.resolve(quizData.questions[topicId]?.[difficulty] || []);
// }

// import axios from "axios";

// const BASE_URL = "https://quizfullapp.onrender.com"; // Backend URL

// export const getQuestions = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/class6math/random`);
//     // Log only the data
//     return response.data; // Return only the data payload
//   } catch (error) {
//     console.error("Error fetching questions:", error.message); // Log error message
//     throw error; // Propagate the error to be handled by the caller
//   }
// };
