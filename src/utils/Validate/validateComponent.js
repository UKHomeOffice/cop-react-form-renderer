// Local imports
import validateRequired from './validateRequired';

/**
 * Validates a single component.
 * @param {object} component The component to validate.
 * @param {object} formData The data to use that holds this component's value.
 * @returns The first encountered error with the component.
 */
const validateComponent = (component, formData) => {
  let error = undefined;
  const data = formData && typeof(formData) === 'object' ? formData : {};
  if (component) {
    const value = data[component.fieldId];
    if (component.required) {
      error = validateRequired(value, component.label);
    }
    component.error = error;
  }
  return error ? { id: component.id, error: error } : undefined;
};

export default validateComponent;
