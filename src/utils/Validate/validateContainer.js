// Local imports
import validateComponent from './validateComponent';

/**
 * Validates all components within a container.
 * @param {object} container The container to validate.
 * @param {object} outerData The data to use that holds this component's value.
 * @param {object} formData The data at the top level of the form.
 * @returns Errors for all components within the container.
 */
const validateContainer = (container, outerData, formData) => {
  const fd = formData || outerData;
  const errors = [];
  if (container && Array.isArray(container.components)) {
    const containerData = outerData && container.fieldId ? outerData[container.fieldId] : outerData;
    container.components.forEach(component => {
      errors.push(validateComponent(component, containerData, fd));
    });
  }
  return errors.filter(e => !!e);
};

export default validateContainer;
