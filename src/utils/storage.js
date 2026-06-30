import defaultQuestions from "../data/questions";

export function getQuestions() {
  const saved = localStorage.getItem("questionsData");

  if (saved) {
    return JSON.parse(saved);
  }

  localStorage.setItem(
    "questionsData",
    JSON.stringify(defaultQuestions)
  );

  return defaultQuestions;
}

export function saveQuestions(questions) {
  localStorage.setItem(
    "questionsData",
    JSON.stringify(questions)
  );
}