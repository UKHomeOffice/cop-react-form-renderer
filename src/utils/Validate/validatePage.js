// Local imports
import validateComponent from './validateComponent';
import showFormPage from '../FormPage/showFormPage';

/**
 * Validate all of the components on a page.
 * @param {Array} components The components to validate.
 * @param {object} formData The data to use that holds this components' values.
 * @returns An array containing all of the errors.
 */
const validatePage = (components, formData, page) => {
  if (Array.isArray(components) && showFormPage(page, formData)) {
    return components.reduce((errors, component) => {
      return errors.concat(validateComponent(component, formData));
    }, []).filter(e => !!e).flat();
  }
  return [];
};

export default validatePage;
