import {
  getQuestionDifficulty,
} from "./github";

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

  return difficulty;
}