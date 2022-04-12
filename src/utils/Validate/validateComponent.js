// Local imports
import { ComponentTypes } from '../../models';
import showComponent from '../Component/showComponent';
import validateEmail from './validateEmail';
import validateRequired from './validateRequired';
import validateDate from './validateDate';
import validateTime from './validateTime';
import runAdditionalComponentValidation from './additional';

/**
 * Validates a single component.
 * @param {object} component The component to validate.
 * @param {object} formData The data to use that holds this component's value.
 * @returns The first encountered error with the component.
 */
const validateComponent = (component, formData) => {
  let error = undefined;
  const data = formData && typeof formData === 'object' ? formData : {};
  if (component && showComponent(component, formData)) {
    const value = data[component.fieldId];
    delete component.propsInError;
    if (component.required) {
      error = validateRequired(value, component.label, component.custom_errors);
    }
    if (!error && component.type === ComponentTypes.EMAIL) {
      error = validateEmail(value, component.label);
    }
    if (!error && component.type === ComponentTypes.DATE && value) {
      const { message, propsInError } = validateDate(value);
      component.propsInError = propsInError;
      error = message;
    }
    if (!error && component.additionalValidation) {
      error = runAdditionalComponentValidation(component, value);
      if (component.type === ComponentTypes.DATE && error) {
        component.propsInError = { day: true, month: true, year: true };
      }
    }
    if (!error && component.type === ComponentTypes.TIME && value) {
      const { message, propsInError } = validateTime(value);
      component.propsInError = propsInError;
      error = message;
    }
    component.error = error;
  }
  return error ? { id: component.id, error: error } : undefined;
};

export default validateComponent;
