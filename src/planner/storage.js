// default planner used when the app runs for the first time
const defaultPlanner = {

  // current position in each queue
  pointers: {

    easy: 0,

    medium: 0,

    hard: 0,

  },

  // number of completed revision days
  revisionDayCount: 0,

  // today's generated revision list
  todayList: null,

};

// load planner from localStorage
export function loadPlanner() {

  const savedPlanner =
    localStorage.getItem("planner");

  if (savedPlanner) {

    return JSON.parse(
      savedPlanner
    );

  }

  return defaultPlanner;

}

// save planner to localStorage
export function savePlanner(
  planner
) {

  localStorage.setItem(
    "planner",
    JSON.stringify(planner)
  );

}

export default defaultPlanner;