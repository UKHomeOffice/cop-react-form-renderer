// Local imports
import validateComponent from './validateComponent';
import showFormPage from '../FormPage/showFormPage';

/**
 * Validate all of the components on a page.
 * @param {object} page The page to validate, contains:
 * @param {Array} components The components to validate.
 * @param {object} formData The data to use that holds this components' values.
 * @returns An array containing all of the errors.
 */
 const validatePage = (page) => {
  if (Array.isArray(page.components) && showFormPage(page, page.formData)) {
    return page.components.reduce((errors, component) => {
      return errors.concat(validateComponent(component, page.formData));
    }, []).filter(e => !!e).flat();
  }
  return [];
};

export default validatePage;
