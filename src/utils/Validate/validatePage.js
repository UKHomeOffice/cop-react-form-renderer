// Local imports
import validateComponent from './validateComponent';
import showFormPage from '../FormPage/showFormPage';

/**
 * Validate all of the components on a page.
 * @param {object} page The page to validate
 * @returns An array containing all of the errors.
 */
const validatePage = (page) => {
  if (showFormPage(page, page.formData) && Array.isArray(page.components)) {
    return page.components.reduce((errors, component) => {
      return errors.concat(validateComponent(component, page.formData));
    }, []).filter(e => !!e).flat();
  }
  return [];
};

export default validatePage;
