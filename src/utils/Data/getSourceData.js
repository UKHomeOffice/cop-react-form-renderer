const getItemInArray = (arr, index) => {
  if (Array.isArray(arr)) {
    return arr[parseInt(index, 10)];
  }
  return undefined;
};

const isArrayProp = (prop) => {
  return prop.includes('[');
};

const getPropertyAndIndex = (prop) => {
  return prop.replace(']', '').split('[');
};

/**
 * Gets the value of a field within the top-level JSON form data,
 * based on a dot-separated field identifier.
 * 
 * Example:
 *   getSourceData({
 *     'alpha': {
 *       'bravo': 'Charlie'
 *     }
 *   }, 'alpha.bravo') will return the value 'Charlie'.
 * 
 * @param {object} data The top-level JSON form data to iterate through.
 * @param {string} fieldId The dot-separated path to the field.
 * @returns The value of the field specified.
 */
const getSourceData = (data, fieldId) => {
  if (!fieldId) {
    return undefined;
  }
  return fieldId.split('.').reduce((obj, prop) => {
    if (obj && isArrayProp(prop)) {
      const [ actualProp, index ] = getPropertyAndIndex(prop);
      return getItemInArray(obj[actualProp], index);
    }
    return obj ? obj[prop] : undefined;
  }, data);
};

export default getSourceData;
