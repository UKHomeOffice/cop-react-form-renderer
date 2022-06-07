// Local imports
import validateComponent from './validateComponent';

const validateContainer = (container, formData) => {
  const errors = [];
  if (container && Array.isArray(container.components)) {
    const fd = formData && container.fieldId ? formData[container.fieldId] : formData;
    container.components.forEach(component => {
      errors.push(validateComponent(component, fd));
    });
  }
  return errors.filter(e => !!e);
};

export default validateContainer;
