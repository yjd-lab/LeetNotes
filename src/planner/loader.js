import {
  getQuestions,
} from "../utils/storage";

import {
  createQueues,
  addToQueue,
} from "./queue";


// build queues from LeetNotes questions
export function loadQueues() {

  const questions =
    getQuestions();

  const queues =
    createQueues();

  questions.forEach(
    (question) => {

      addToQueue(
        queues,
        question
      );

    }
  );

  return queues;

}