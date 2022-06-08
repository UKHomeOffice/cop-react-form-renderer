const TYPE_COMPLETE = 'complete';
const TYPE_IN_PROGRESS = 'inProgress';
const TYPE_NOT_STARTED = 'notStarted';
const TYPE_CANNOT_START_YET = 'cannotStartYet';

export const StateTypes = {
  COMPLETE: TYPE_COMPLETE,
  IN_PROGRESS: TYPE_IN_PROGRESS,
  NOT_STARTED: TYPE_NOT_STARTED,
  CANNOT_START_YET: TYPE_CANNOT_START_YET,
};

const StateDetails = {
  [TYPE_COMPLETE]: { label: 'Completed', colour: 'dark-blue' },
  [TYPE_IN_PROGRESS]: { label: 'In Progress', colour: 'white' },
  [TYPE_NOT_STARTED]: { label: 'Not Started', colour: 'dark-grey' },
  [TYPE_CANNOT_START_YET]: { label: 'Cannot Start Yet', colour: 'dark-grey' },
};

const TaskStates = {
  TYPES: StateTypes,
  DETAILS: StateDetails,
};

export default TaskStates;
