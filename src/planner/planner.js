import {
  loadPlanner,
  savePlanner,
} from "./storage";

import {
  generateTodaysList,
} from "./generator";


// get today's date
function getTodayDate() {

  return new Date()
    .toLocaleDateString();

}


// return today's active revision list
export function getTodaysList(
  queues
) {

  const planner =
    loadPlanner();

  const today =
    getTodayDate();


  // no list exists yet
  const noListYet =
    planner.todayList === null;

  // the existing list was already
  // completed, but on an earlier day
  // (a new day has started, so a
  // fresh list should begin)
  const oldCompletedList =

    planner.todayList !== null &&

    planner.todayList.completed &&

    planner.todayList.generatedDate !==
      today;


  if (
    noListYet ||
    oldCompletedList
  ) {

    planner.todayList =
      generateTodaysList(
        planner,
        queues
      );

    savePlanner(
      planner
    );

  }


  return planner.todayList;

}


// mark one question completed
// toggle one question completed/uncompleted
export function completeQuestion(
  id,
  queues
) {

  const planner =
    loadPlanner();

  const today =
    getTodayDate();


  // safety check
  if (
    planner.todayList === null
  ) {

    return null;

  }


  // remember whether the list was completed
  const wasListCompleted =
    planner.todayList.completed;


  // remember whether this list
  // was generated before today
  const isOldList =

    planner.todayList.generatedDate !==
    today;


  // toggle the selected question
  planner.todayList.questions =
    planner.todayList.questions.map(
      (question) => {

        if (
          question.id === id
        ) {

          return {

            ...question,

            completed:
              !question.completed,

          };

        }

        return question;

      }
    );


  // check if every question is completed
  const allCompleted =
    planner.todayList.questions.every(
      (question) =>
        question.completed
    );


  // list has just been completed
  if (

    allCompleted &&

    !planner.todayList.completed

  ) {

    planner.todayList.completed =
      true;

    planner.revisionDayCount++;


    // old unfinished list
    // completed today
    if (isOldList) {

      planner.todayList =
        generateTodaysList(
          planner,
          queues
        );

    }

  }


  // list was previously completed
  // but a question was unchecked
  else if (

    !allCompleted &&

    wasListCompleted

  ) {

    planner.todayList.completed =
      false;

    planner.revisionDayCount--;

  }


  savePlanner(
    planner
  );


  return planner.todayList;

}