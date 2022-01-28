// Local imports
import { formatDataForComponents } from './formatDataForComponent';

/**
 * Formats the data for all components on a page, according to each component's format configuration.
 * @param {object} page The page to format the components for.
 * @param {object} data The top-level form data.
 * @param {string} eventType What type of event initiated this call.
 */
const formatDataForPage = (page, data, eventType) => {
  formatDataForComponents(page.components, data, eventType);
};

/**
 * Formats the data for all components on a page, according to each component's format configuration.
 * @param {Array} pages The pages to format the components for.
 * @param {object} data The top-level form data.
 * @param {string} eventType What type of event initiated this call.
 */
export const formatDataForPages = (pages, data, eventType) => {
  pages.forEach(page => formatDataForPage(page, data, eventType));
};

export default formatDataForPage;
