/**
 * Validates that a value is not nullish, which includes ensuring
 * a string isn't just whitespace, an array is not empty, etc.
 * @param {any} value The value to validate.
 * @param {string} label The label to use in any error message.
 * @returns An error if the value is nullish.
 */
const validateRequired = (value, label = '', customErrors) => {
  let hasValue = false;
  if (!!value || value === false || value === 0) {
    hasValue = true;
    if (typeof value === 'string') {
      hasValue = value.trim().length > 0;
    } else if (Array.isArray(value)) {
      hasValue = value.length > 0;
    }
  }
  if (!hasValue) {
    if(customErrors && Array.isArray(customErrors)){
      const result = customErrors.filter(error => {
        return error.type === 'required';
      })
      if(result && result.length > 0 && result[0].message){
        return result[0].message;
      }
    }
    const name = label ? label : 'Field';
    return `${name} is required`;
  }
  return undefined;
};

export default validateRequired;
