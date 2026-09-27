import {
  getQuestionDifficulty,
} from "./github";

import {
  getQuestions,
  saveQuestions,
} from "../utils/storage";

export async function syncQuestionDifficulty(
  question
) {
  const folderName =
    `${question.id}-${question.title
      .toLowerCase()
      .replaceAll(" ", "-")}`;

  const difficulty =
    await getQuestionDifficulty(
      folderName
    );

  if (!difficulty) {
    return false;
  }

  const questions =
    getQuestions();

  const updatedQuestions =
    questions.map(
      (q) => {
        if (q.id === question.id) {
          return {
            ...q,
            difficulty: difficulty,
          };
        }

        return q;
      }
    );

  saveQuestions(
    updatedQuestions
  );

  return true;
}