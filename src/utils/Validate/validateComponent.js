// Local imports
import { ComponentTypes } from '../../models';
import showComponent from '../Component/showComponent';
import runAdditionalComponentValidation from './additional';
import validateDate from './validateDate';
import validateEmail from './validateEmail';
import validateRequired from './validateRequired';
import validateTime from './validateTime';

const validateContainer = (container, formData) => {
  const errors = [];
  if (Array.isArray(container.components)) {
    const fd = formData && container.fieldId ? formData[container.fieldId] : formData;
    container.components.forEach(component => {
      errors.push(validateComponent(component, fd));
    });
  }
  return errors.filter(e => !!e);
};

/**
 * Validates a single component.
 * @param {object} component The component to validate.
 * @param {object} formData The data to use that holds this component's value.
 * @returns The first encountered error with the component.
 */
const validateComponent = (component, formData) => {
  let error = undefined;
  let nestedId = undefined;
  const data = formData && typeof formData === 'object' ? formData : {};
  if (component && showComponent(component, formData)) {
    if (component.type === ComponentTypes.CONTAINER) {
      return validateContainer(component, formData);
    }
    const value = data[component.fieldId];
    delete component.propsInError;
    if (component.required) {
      error = validateRequired(value, component.label, component.custom_errors);
    }
    if (!error && component.type === ComponentTypes.RADIOS) {
      component.data.options.some((option) => {
        let nestedError;
        if (option.nested) {
          nestedError = validateComponent(option.nested, formData);
          error = nestedError.error;
          if(nestedError){
            nestedId = nestedError.id;
          }
          console.log('setting an error of ' + error + ' of type: ' + typeof(error));
        }
        return nestedError;
      });
    }
    if (!error && component.type === ComponentTypes.EMAIL) {
      error = validateEmail(value, component.label);
    }
    if (!error && component.type === ComponentTypes.DATE) {
      console.log("Validating date: " + component.fieldId + ", " + value);
      const { message, propsInError } = validateDate(value);
      component.propsInError = propsInError;
      error = message;
    }
    if (!error && component.type === ComponentTypes.TIME) {
      const { message, propsInError } = validateTime(value);
      component.propsInError = propsInError;
      error = message;
    }
    if (!error && component.additionalValidation) {
      error = runAdditionalComponentValidation(component, value);
      if (component.type === ComponentTypes.DATE && error) {
        component.propsInError = { day: true, month: true, year: true };
      }
    }
    component.error = error;
  }
  console.log("!!!! " + nestedId + ' componentid ' + component.id)
  const tmpId = nestedId ? nestedId : component.id
  return error ? { id: tmpId, error: error } : undefined;
};

export default validateComponent;