// Local imports
import getFormPage from './getFormPage';

/**
 * Converts pages objects defined in the JSON to page objects for rendering.
 * @param {Array} pages The JSON pages.
 * @param {Array} components The components defined at the top-level of the form.
 * @param {object} formData The top-level form data, used for setting up components.
 * @returns An array of page objects for rendering.
 */
const getFormPages = (pages, components, formData) => {
  if (Array.isArray(pages)) {
    return pages.map((options, index) => ({
      ...getFormPage(options, components, formData),
      index
    }));
  }
  return [];
};

export default getFormPages;
