// Local imports
import getCYA from './getCYA';
import getPage from './getPage';

/**
 * Sets up the state of the form, including the current page and the Check your answers screen.
 * @param {string} pageId The current page identifier.
 * @param {Array} pages All of the pages in the form.
 * @param {object} hub The hub, if there is one.
 * @returns The current state of the form.
 */
const getFormState = (pageId, pages, hub) => {
  return {
    pageId,
    cya: getCYA(pageId, hub),
    page: getPage(pageId, pages, hub)
  };
};

export default getFormState;
