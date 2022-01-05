/**
 * Formats a string according to a format configuration object.
 * @param {object} format The format configuration object.
 * @param {string} value The string value to be formatted.
 * @returns A formatted version of the value.
 */
const formatData = (format, value) => {
  if (format && value) {
    switch (format.type) {
      case 'lowercase':
        return value.toLowerCase();
      case 'uppercase':
        return value.toUpperCase();
      default:
        return value;
    }
  }
  return value;
};

export default formatData;
