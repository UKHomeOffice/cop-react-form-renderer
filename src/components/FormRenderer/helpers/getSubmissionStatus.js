import { PageAction } from '../../../models';
import getNextPageId from './getNextPageId';

const getSubmissionStatus = (formType, pages, currentPageId, action, formData) => {
  if (action?.type === PageAction.TYPES.SAVE_AND_RETURN) {
    return { page: currentPageId };
  }
  return { page: getNextPageId(formType, pages, currentPageId, action, formData) };
};

export default getSubmissionStatus;
