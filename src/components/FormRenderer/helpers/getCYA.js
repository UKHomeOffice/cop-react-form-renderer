// Local imports
import { HubFormats } from '../../../models';

/**
 * Gets a configuration object for the Check your answers screen.
 * @param {string} pageId The current page identifier.
 * @param {object} hub The hub, if there is one.
 * @returns A configuration object for the Check your answers screen.
 */
const getCYA = (pageId, hub) => {
  if (pageId === 'hub' && hub === HubFormats.CYA) {
    return { title: '' };
  } else if (pageId === HubFormats.CYA) {
    return {};
  }
  return undefined;
};

export default getCYA;
