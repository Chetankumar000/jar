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

export function getQuestions(topicId, difficulty) {
  return Promise.resolve(quizData.questions[topicId]?.[difficulty] || []);
}
