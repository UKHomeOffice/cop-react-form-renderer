/**
 * Validates an components value against a given regex pattern.
 * 
 * An empty string for value is considered valid as not all components
 * with pattern validation have to be required. 
 * @param {*} value The value to validate.
 * @param {string} label The label to use in the default error message.
 * @param {string} pattern The regex pattern to validate against.
 * @param {array} customErrors The array of custom errors for the component.
 * @returns An error if the value doesn't match the regex pattern.
 */
const validateRegex = (value, label = '', pattern, customErrors) => {
  if (!value) {
    return undefined;
  }
  if (typeof value === 'string') {
    const regex = new RegExp(pattern);
    if (regex.test(value)) {
      return undefined;
    }
    if (Array.isArray(customErrors)) {
      const result = customErrors.filter((error) => {
        return error.type === 'pattern';
      });
      if (result?.[0]?.message) {
        return result[0].message;
      }
    }
  }
  if (label === '') {
    return 'Component failed regex validation';
  }
  return `${label} failed regex validation`;
};

export default validateRegex;
