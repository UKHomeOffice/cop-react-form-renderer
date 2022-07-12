/**
 * Function returns true if the string parameter is longer than a given length, false
 * if it is not.
 * @param {string} string - the string to check the length of.
 * @param {number} config.value - the length that string.length must be greater than. 
 * @returns true if string.length is greater than config.value, false if not.
 */
const mustBeLongerThan = (string, config) => {
  if (!string) {
    // null, undefined and empty strings should be picked up by the required flag
    // and not considered here as they would be valid for optional fields.
    return true;
  }
  return (str.length > config.value);
};

export default mustBeLongerThan;
