import getPageId from './getPageId';

/**
 * Gets the pageId from the invoked page action and calls onNavigate if it is
 * different to the currentPageId.
 * @param {object} action The invoked action.
 * @param {string} currentPageId The current pageId.
 * @param {Function} onNavigate The handler to call if the pageId is different to the currentPageId.
 */
const navigate = (action, currentPageId, onNavigate) => {
  const pageId = getPageId(action, currentPageId);
  if (pageId !== currentPageId) {
    onNavigate(pageId);
  }
};

export default navigate;
