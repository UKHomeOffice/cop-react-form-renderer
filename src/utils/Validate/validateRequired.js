/**
 * Validates that a value is not nullish, which includes ensuring
 * a string isn't just whitespace, an array is not empty, etc.
 * @param {any} value The value to validate.
 * @param {string} label The label to use in any error message.
 * @returns An error if the value is nullish.
 */
const validateRequired = (value, label = '') => {
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
    const name = label ? label : 'Field';
    return `${name} is required`;
  }
  return undefined;
};

export default validateRequired;
