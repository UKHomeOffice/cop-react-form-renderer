import { FormPages, FormTypes, PageAction } from '../../../models';

const getNextHubPageId = (action) => {
  if (action?.type === PageAction.TYPES.SAVE_AND_RETURN) {
    return FormPages.HUB;
  }
  return action?.nextPageId || FormPages.HUB;
};

const getNextCYAPageId = (pages, currentPageId, action) => {
  if (action?.type === PageAction.TYPES.SAVE_AND_RETURN) {
    return undefined;
  }
  const nextIndex = pages.findIndex(p => p.id === currentPageId) + 1;
  return nextIndex < pages.length ? pages[nextIndex].id : FormPages.CYA;
};

const getNextWizardPageId = (pages, currentPageId, action) => {
  if (action?.type === PageAction.TYPES.SAVE_AND_RETURN) {
    return undefined;
  }
  const nextIndex = pages.findIndex(p => p.id === currentPageId) + 1;
  return nextIndex < pages.length ? pages[nextIndex].id : undefined;
};

const getNextFormPageId = (pages, action) => {
  if (action?.type === PageAction.TYPES.SAVE_AND_RETURN) {
    return undefined;
  }
  return pages.length > 0 ? pages[0].id : undefined;
};

const getNextPageId = (formType, pages, currentPageId, action) => {
  switch (formType) {
    case FormTypes.HUB:
      return getNextHubPageId(action);
    case FormTypes.CYA:
      return getNextCYAPageId(pages, currentPageId, action);
    case FormTypes.WIZARD:
      return getNextWizardPageId(pages, currentPageId, action);
    default:
      return getNextFormPageId(pages, action);
  }
};

export default getNextPageId;
