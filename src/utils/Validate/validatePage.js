// Local imports
import validateComponent from './validateComponent';

/**
 * Validate all of the components on a page.
 * @param {Array} components The components to validate.
 * @param {object} formData The data to use that holds this components' values.
 * @returns An array containing all of the errors.
 */
const validatePage = (components, formData) => {
  const errors = [];
  if (Array.isArray(components)) {
    components.forEach(component => {
      errors.push(validateComponent(component, formData));
    });
  }
  return errors.filter(e => !!e);
};

export default validatePage;
