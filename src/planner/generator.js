// pick questions from a queue
// starting from its current pointer
export function pickQuestions(
  questionQueue,
  pointer,
  count
) {

  const selectedQuestions = [];

  while (

    pointer < questionQueue.length &&

    selectedQuestions.length < count

  ) {

    selectedQuestions.push(
      questionQueue[pointer]
    );

    pointer++;

  }

  return {

    questions: selectedQuestions,

    newPointer: pointer,

  };

}


// fill remaining slots from other queues
export function fillRemainingSlots(
  selectedQuestions,
  remainingCount,
  queues,
  planner
) {

  while (remainingCount > 0) {

    let addedQuestion = false;

    // Easy Queue
    if (

      planner.pointers.easy <
      queues.easyQueue.length

    ) {

      selectedQuestions.push(

        queues.easyQueue[
          planner.pointers.easy
        ]

      );

      planner.pointers.easy++;

      remainingCount--;

      addedQuestion = true;

    }

    if (remainingCount === 0) {

      break;

    }

    // Medium Queue
    if (

      planner.pointers.medium <
      queues.mediumQueue.length

    ) {

      selectedQuestions.push(

        queues.mediumQueue[
          planner.pointers.medium
        ]

      );

      planner.pointers.medium++;

      remainingCount--;

      addedQuestion = true;

    }

    if (remainingCount === 0) {

      break;

    }

    // Hard Queue
    if (

      planner.pointers.hard <
      queues.hardQueue.length

    ) {

      selectedQuestions.push(

        queues.hardQueue[
          planner.pointers.hard
        ]

      );

      planner.pointers.hard++;

      remainingCount--;

      addedQuestion = true;

    }

    // no questions available anywhere
    if (!addedQuestion) {

      break;

    }

  }

}



// shuffle questions while trying to avoid
// two questions with the same topic together
export function shuffleTodayList(
  questions
) {

  const remainingQuestions =
    [...questions];

  const shuffledQuestions = [];

  let previousTopic = null;

  while (
    remainingQuestions.length > 0
  ) {

    // get all questions whose topic
    // is different from the previous topic
    const availableQuestions =
      remainingQuestions.filter(
        (question) =>
          question.topic !== previousTopic
      );

    let selectedQuestion;

    // if we have questions with different topics
    if (
      availableQuestions.length > 0
    ) {

      // choose one randomly
      const randomIndex =
        Math.floor(
          Math.random() *
          availableQuestions.length
        );

      selectedQuestion =
        availableQuestions[
          randomIndex
        ];

    }

    // if avoiding the same topic is impossible
    else {

      selectedQuestion =
        remainingQuestions[0];

    }

    // find the selected question
    // in the remaining questions
    const selectedIndex =
      remainingQuestions.indexOf(
        selectedQuestion
      );

    // remove it from remaining questions
    remainingQuestions.splice(
      selectedIndex,
      1
    );

    // add it to the final shuffled list
    shuffledQuestions.push(
      selectedQuestion
    );

    previousTopic =
      selectedQuestion.topic;

  }

  return shuffledQuestions;

}




// generate today's revision list
export function generateTodaysList(
  planner,
  queues
) {

  // pick 3 Easy questions
  const easy =
    pickQuestions(

      queues.easyQueue,

      planner.pointers.easy,

      3

    );


  // pick 3 Medium questions
  const medium =
    pickQuestions(

      queues.mediumQueue,

      planner.pointers.medium,

      3

    );


  // update pointers
  planner.pointers.easy =
    easy.newPointer;

  planner.pointers.medium =
    medium.newPointer;


  // every 7th revision day
  // add one Hard question
  let hardQuestions = [];

  if (

    (planner.revisionDayCount + 1) % 7 === 0

  ) {

    const hard =
      pickQuestions(

        queues.hardQueue,

        planner.pointers.hard,

        1

      );

    planner.pointers.hard =
      hard.newPointer;

    hardQuestions =
      hard.questions;

  }


  // combine selected questions
  let selectedQuestions = [

    ...easy.questions,

    ...medium.questions,

    ...hardQuestions,

  ];


  // determine today's target
  const targetCount =

    (planner.revisionDayCount + 1) % 7 === 0

      ? 7

      : 6;


  // fill missing slots if a queue ended
  fillRemainingSlots(

    selectedQuestions,

    targetCount - selectedQuestions.length,

    queues,

    planner

  );


  // arrange questions
  selectedQuestions =
    shuffleTodayList(
      selectedQuestions
    );


  // create today's checklist
  return {

    generatedDate:
      new Date().toLocaleDateString(),

    completed: false,

    questions:

      selectedQuestions.map(
        (question) => ({

          ...question,

          completed: false,

        })
      ),

  };

}