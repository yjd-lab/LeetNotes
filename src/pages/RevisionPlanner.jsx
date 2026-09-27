import {
  useEffect,
  useState,
} from "react";

import {
  getTodaysList,
  completeQuestion,
} from "../planner/planner";

import {
  loadQueues,
} from "../planner/loader";


function RevisionPlanner() {

  const [queues, setQueues] =
    useState(null);

  const [todayList, setTodayList] =
    useState(null);


  useEffect(() => {

    const loadedQueues =
      loadQueues();

    setQueues(
      loadedQueues
    );

    setTodayList(
      getTodaysList(
        loadedQueues
      )
    );

  }, []);


  function handleComplete(id) {

    const updatedList =
      completeQuestion(
        id,
        queues
      );

    setTodayList(
      updatedList
    );

  }


  if (
    !queues ||
    !todayList
  ) {

    return <h1>Loading...</h1>;

  }


  return (

    <div>

      <h1>
        Today's Revision
      </h1>


      {todayList.questions.map(
        (question) => (

          <div
            key={question.id}
          >

            <input
              type="checkbox"
              checked={
                question.completed
              }
              onChange={() =>
                handleComplete(
                  question.id
                )
              }
            />

            {question.id}
            {" - "}
            {question.title}

          </div>

        )
      )}

    </div>

  );

}


export default RevisionPlanner;