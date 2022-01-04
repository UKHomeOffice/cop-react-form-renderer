/**
 * Gets the pageId from the invoked CYA action.
 * @param {object} action The invoked action.
 * @param {string} pageId The id of the page on which the action was invoked.
 * @returns A page id.
 */
const getPageId = (action, pageId) => {
  if (action) {
    // TODO: Improve how this is handled.
    if (action.href) {
      return action.href.split('/').pop();
    } else if (action.url) {
      return action.url.split('/').pop();
    }
  }
  return pageId;
};

export default getPageId;
