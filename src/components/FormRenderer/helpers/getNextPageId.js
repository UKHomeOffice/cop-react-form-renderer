import { FormPages, FormTypes, PageAction } from '../../../models';
import FormPage from '../../../utils/FormPage';

const getNextHubPageId = (action) => {
  return action?.page || FormPages.HUB;
};

const getNextCYAPageId = (pages, currentPageId, formData) => {
  return getNextWizardPageId(pages, currentPageId, formData) || FormPages.CYA;
};

const getNextWizardPageId = (pages, currentPageId, formData) => {
  let nextIndex = pages.findIndex(p => p.id === currentPageId) + 1;
  let page = pages[nextIndex];
  while (page && !FormPage.show(page, formData)) {
    nextIndex++;
    page = pages[nextIndex];
  }
  return page?.id || undefined;
};

const getNextFormPageId = (pages) => {
  // A form has a single page... so always return that id.
  return pages.length > 0 ? pages[0].id : undefined;
};

const getNextPageId = (formType, pages, currentPageId, action, formData) => {
  if (action) {
    if (action.type === PageAction.TYPES.NAVIGATE) {
      return pages.find(p => p.id === action.page) ? action.page : undefined;
    }
    if (action.type === PageAction.TYPES.SAVE_AND_RETURN) {
      return formType === FormTypes.HUB ? FormPages.HUB : undefined;
    }
  }
  switch (formType) {
    case FormTypes.HUB:
      return getNextHubPageId(action);
    case FormTypes.CYA:
      return getNextCYAPageId(pages, currentPageId, formData);
    case FormTypes.TASK:
      return getNextHubPageId(action); 
    case FormTypes.WIZARD:
      return getNextWizardPageId(pages, currentPageId, formData);
    default:
      return getNextFormPageId(pages);
  }
};

export default getNextPageId;
