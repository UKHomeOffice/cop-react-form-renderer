// Local imports
import { ComponentTypes } from '../../models';
import showComponent from '../Component/showComponent';
import validateEmail from './validateEmail';
import validateRequired from './validateRequired';
import validateDate, { dateValidators } from './validateDate';

/**
 * Validates a single component.
 * @param {object} component The component to validate.
 * @param {object} formData The data to use that holds this component's value.
 * @returns The first encountered error with the component.
 */
const validateComponent = (component, formData) => {
  let error = undefined;
  const data = formData && typeof(formData) === 'object' ? formData : {};
  if (component && showComponent(component, formData)) {
    const value = data[component.fieldId];
    if (component.required) {
      error = validateRequired(value, component.label, component.custom_errors);
    }
    if (!error && component.type === ComponentTypes.EMAIL) {
      error = validateEmail(value, component.label);
    }
    if (!error && component.type === ComponentTypes.DATE && value) {
      const { message, propsinerror } = validateDate(value);
      component.propsinerror = propsinerror; 
      error = message;
      if(!error && component.datevalidation){
        component.datevalidation.forEach(validator => {
          if(!dateValidators[validator.function](value, validator.args)){
            error = validator.message;
            component.propsinerror = { day: true, month: true, year: true };
          }
        })
      }
    }
    component.error = error;
  }
  return error ? { id: component.id, error: error } : undefined;
};

export default validateComponent;
