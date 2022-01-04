// Local imports
import { HubFormats } from '../../../models';

/**
 * Gets the current page to render, which may be undefined if the current page is the "hub".
 * @param {string} pageId The current page identifier.
 * @param {Array} pages All of the pages in the form.
 * @param {object} hub The hub, if there is one.
 * @returns The current page to render.
 */
const getPage = (pageId, pages, hub) => {
  if (pageId) {
    if (pageId === 'hub') {
      return hub === HubFormats.CYA ? undefined : hub;
    }
    return pages.find(p => p.id === pageId);
  }
  return undefined;
};

export default getPage;
