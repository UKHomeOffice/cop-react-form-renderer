// Local imports
import { ComponentTypes } from '../../models';
import showComponent from '../Component/showComponent';
import runAdditionalComponentValidation from './additional';
import validateCollection from './validateCollection';
import validateContainer from './validateContainer';
import validateDate from './validateDate';
import validateEmail from './validateEmail';
import validateRegex from './validateRegex';
import validateRequired from './validateRequired';
import validateTime from './validateTime';

/**
 * Validates a single component.
 * @param {object} component The component to validate.
 * @param {object} outerData The data to use that holds this component's value.
 * @param {object} formData The data at the top level of the form.
 * @returns The first encountered error with the component.
 */
const validateComponent = (component, outerData, formData) => {
  const fd = formData || outerData;
  if (!showComponent(component, fd)) {
    return undefined;
  }

  if (component.type === ComponentTypes.CONTAINER) {
    return validateContainer(component, outerData, fd);
  }
  let error = undefined;
  let properties = undefined;
  const data = outerData && typeof outerData === 'object' ? outerData : {};
  const value = data[component.fieldId];
  if (component.required) {
    error = validateRequired(value, component.label, component.custom_errors);
  }
  if (!error) {
    switch (component.type) {
      case ComponentTypes.COLLECTION:
        return validateCollection(component, value, fd);
      case ComponentTypes.EMAIL:
        error = validateEmail(value, component.label);
        break;
      case ComponentTypes.DATE:
      case ComponentTypes.TIME:
        const validator = component.type === ComponentTypes.DATE ? validateDate : validateTime;
        const { message, propsInError } = validator(value);
        properties = propsInError;
        error = message;
        break;
      case ComponentTypes.RADIOS:
        let nestedErrors = [];
        component.data.options?.forEach((option) => {
          if (option.nested && (formData[component.id] === option.value)) {
            nestedErrors = nestedErrors.concat(validateContainer({ components: option.nested }, formData));
          }
        });
        if (nestedErrors.length > 0) {
          return nestedErrors;
        }
        break;
      default:
        break;
    }
    if (!error && component.pattern) {
      error = validateRegex(value, component.label, component.pattern, component.custom_errors);
    }
    if (!error && component.additionalValidation) {
      error = runAdditionalComponentValidation(component, value);
      if (component.type === ComponentTypes.DATE && error) {
        properties = { day: true, month: true, year: true };
      }
    }
  }

  if (error) {
    return {
      id: component.full_path || component.id,
      error,
      properties
    };
  }
  return undefined;
};

export default validateComponent;
