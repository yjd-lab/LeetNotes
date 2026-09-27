// create empty queues
export function createQueues() {

  return {

    easyQueue: [],

    mediumQueue: [],

    hardQueue: [],

  };

}

// add a question into the correct queue
export function addToQueue(
  queues,
  question
) {

  switch (
    question.difficulty
  ) {

    case "easy":

      queues.easyQueue.push(
        question
      );

      break;

    case "medium":

      queues.mediumQueue.push(
        question
      );

      break;

    case "hard":

      queues.hardQueue.push(
        question
      );

      break;

    default:

      console.warn(
        "Unknown difficulty:",
        question
      );

  }

}