export const JSON_ONLY_PROPERTIES = [
  'source',
  'use',
  'show_when',
  'options',
  'additionalValidation',
  'full_path',
  'shown'
];

/**
 * This method removes and properties that are entirely specific to the JSON
 * configuration and that should not be used as HTML attributes.
 * 
 * This is in place as certain properties being used as attributes result in
 * console errors.
 * 
 * @param {object} options The options object that contains attributes and JSON configuration properties.
 * @param {Array} alsoRemove An array of additional properties to remove.
 * @returns A clean(er) JSON object.
 */
const cleanAttributes = (options, alsoRemove = []) => {
  const removeKeys = Array.isArray(alsoRemove) ? [...JSON_ONLY_PROPERTIES, ...alsoRemove] : JSON_ONLY_PROPERTIES;
  if (options && typeof(options) === 'object') {
    return Object.keys(options).reduce((obj, key) => {
      if (!removeKeys.includes(key)) {
        obj[key] = options[key];
      }
      return obj;
    }, {});
  }
  return {};
};

export default cleanAttributes;
