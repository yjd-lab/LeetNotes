import { getQuestions } from "../utils/storage";
import { syncQuestionDifficulty } from "../services/difficultySync";

export async function syncMissingDifficulties() {
  const questions = getQuestions();

  const missingQuestions =
    questions.filter(
      (question) =>
        !question.difficulty
    );

  for (const question of missingQuestions) {
    await syncQuestionDifficulty(
      question
    );
  }

  return getQuestions();
}