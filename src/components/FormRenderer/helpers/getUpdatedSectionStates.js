import { TaskStates } from '../../../models';

/**
 * Updates the given task list sections with the latest states
 * @param {object} sections The JSON defining the sections in the task list
 * @param {object} tasks object with entry for each task containing currentPage and complete boolean flag 
 * {
     "TaskName": {
       "complete": true,
       "currentPage": "pageId"
     }
   }
 * @returns An JSON representation of the task list sections with up to date states
 */
const getUpdatedSectionStates = (sections, tasks) => {
  return sections.map((section, sectionIndex, sectionArray) => {
    return section.tasks.map((task, taskIndex, taskArray) => {
      if (tasks[task.name]) {
        if (tasks[task.name].complete) {
          task.state = TaskStates.TYPES.COMPLETE;
        } else if (tasks[task.name].currentPage) {
          task.state = TaskStates.TYPES.IN_PROGRESS;
        }
      } else {
        if (
          (taskIndex === 0 && sectionIndex === 0) || //First task in tasklist
          taskArray[taskIndex - 1]?.state === TaskStates.TYPES.COMPLETE || //any task after a complete task in same section
          (taskIndex === 0 && sectionArray[sectionIndex - 1]?.tasks.slice(-1)[0]?.state === TaskStates.TYPES.COMPLETE) //any task after a complete task in the preceeding section
        ) {
          task.state = TaskStates.TYPES.NOT_STARTED;
        } else {
          task.state = TaskStates.TYPES.CANNOT_START_YET;
        }
      }
      return task;
    });
  });
};

export default getUpdatedSectionStates;
