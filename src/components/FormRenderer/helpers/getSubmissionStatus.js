import { FormPages, FormTypes, PageAction } from '../../../models';
import getNextPageId from './getNextPageId';

const getSubmissionStatus = (formType, pages, currentPageId, action, formData, currentTask) => {
  if (formType === FormTypes.TASK) {
    const formStatus = formData.formStatus ? formData.formStatus : {};
    formStatus.tasks = formStatus.tasks ? formStatus.tasks : {};
    formStatus.tasks[currentTask.name] = formStatus.tasks[currentTask.name] ? formStatus.tasks[currentTask.name] : {};

    if (currentPageId === FormPages.CYA) {
      formStatus.tasks[currentTask.name].complete = true;
    } else if (currentPageId === FormPages.SUBMIT) { 
      formStatus.tasks[currentTask.name].complete = true;
    } else{
      formStatus.tasks[currentTask.name] = {
        complete: false,
        currentPage: action.page
      };
    }
    return formStatus;
  }

  if (action?.type === PageAction.TYPES.SAVE_AND_RETURN) {
    return { page: currentPageId };
  }
  return { page: getNextPageId(formType, pages, currentPageId, action, formData) };
};

export default getSubmissionStatus;
