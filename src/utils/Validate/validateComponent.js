// Local imports
import { ComponentTypes } from '../../models';
import showComponent from '../Component/showComponent';
import runAdditionalComponentValidation from './additional';
import validateCollection from './validateCollection';
import validateContainer from './validateContainer';
import validateDate from './validateDate';
import validateEmail from './validateEmail';
import validateRequired from './validateRequired';
import validateTime from './validateTime';

/**
 * Validates a single component.
 * @param {object} component The component to validate.
 * @param {object} formData The data to use that holds this component's value.
 * @returns The first encountered error with the component.
 */
const validateComponent = (component, formData) => {
  if (!showComponent(component, formData)) {
    return undefined;
  }
  let error = undefined;
  let nestedId = undefined;
  let propertiesInError = undefined;
  const data = formData && typeof formData === 'object' ? formData : {};

  if (component.type === ComponentTypes.CONTAINER) {
    return validateContainer(component, formData);
  }
  const value = data[component.fieldId];
  if (component.required) {
    error = validateRequired(value, component.label, component.custom_errors);
  }
  if (!error) {
    switch (component.type) {
      case ComponentTypes.COLLECTION:
        return validateCollection(component, value);
      case ComponentTypes.EMAIL:
        error = validateEmail(value, component.label);
        break;
      case ComponentTypes.DATE:
      case ComponentTypes.TIME:
        const validator = component.type === ComponentTypes.DATE ? validateDate : validateTime;
        const { message, propsInError } = validator(value);
        propertiesInError = propsInError;
        error = message;
        break;
      case ComponentTypes.RADIOS:
        let nestedErrors = [];
        console.log(component.data.options);
        component.data.options?.forEach((option) => {
          console.log("Validating option: " + JSON.stringify(option));
          if (option.nested && option.shown) {
            nestedErrors.concat(validateContainer({components: option.nested}, formData));
          }
        });
        return nestedErrors;
      default:
        break;
    }
    if (!error && component.additionalValidation) {
      error = runAdditionalComponentValidation(component, value);
      if (component.type === ComponentTypes.DATE && error) {
        propertiesInError = { day: true, month: true, year: true };
      }
    }
  }

  if (error) {
    return {
      id: nestedId || component.full_path || component.id,
      error: error,
      properties: propertiesInError
    };
  }
  return undefined;
};

export default validateComponent;
