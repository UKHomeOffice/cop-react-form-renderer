// Local imports
import { formatDataForComponents } from './formatDataForComponent';
import { formatDataForPages } from './formatDataForPage';

/**
 * Formats the data for all components on a form, according to each component's format configuration.
 * @param {object} form The form to format the components for.
 * @param {object} data The top-level form data.
 * @param {string} eventType What type of event initiated this call.
 */
const formatDataForForm = (form, baseData, eventType) => {
  const data = {...baseData};
  formatDataForComponents(form.components, data, eventType);
  formatDataForPages(form.pages, data, eventType);
  return data;
};

export default formatDataForForm;
