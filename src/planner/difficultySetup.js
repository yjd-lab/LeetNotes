import { getQuestions } from "../utils/storage";
import { syncQuestionDifficulty } from "../services/difficultySync";

function wait(milliseconds) {
  return new Promise(
    (resolve) =>
      setTimeout(resolve, milliseconds)
  );
}

export async function syncMissingDifficulties() {
  const questions = getQuestions();

  const missingQuestions =
    questions.filter(
      (question) =>
        !question.difficulty
    );

  for (const question of missingQuestions) {
    try {
      await syncQuestionDifficulty(
        question
      );
    }
    catch (error) {
      console.error(
        "Failed to sync:",
        question.id,
        question.title,
        error
      );
    }

    await wait(1000);
  }

  return getQuestions();
}