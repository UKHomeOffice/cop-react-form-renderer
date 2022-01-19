// Local imports
import { FormPages, HubFormats } from '../../../models';

/**
 * Gets a configuration object for the Check your answers screen.
 * @param {string} pageId The current page identifier.
 * @param {object} hub The hub, if there is one.
 * @returns A configuration object for the Check your answers screen.
 */
const getCYA = (pageId, hub) => {
  if (pageId === FormPages.HUB && hub === HubFormats.CYA) {
    return { title: '' };
  } else if (pageId === FormPages.CYA) {
    return {};
  }
  return undefined;
};

export default getCYA;
