import getPageId from './getPageId';

/**
 * Gets the pageId from the invoked CYA action and calls onChange if it is
 * different to the currentPageId.
 * @param {object} page The page on which the CYA action was invoked.
 * @param {string} currentPageId The current pageId.
 * @param {Function} onChange The handler to call if the pageId is different to the currentPageId.
 */
const cyaAction = (page, currentPageId, onChange) => {
  const pageId = getPageId(page.action, page.pageId);
  if (pageId !== currentPageId) {
    onChange(pageId);
  }
};

export default cyaAction;
