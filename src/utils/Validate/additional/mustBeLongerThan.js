/**
 * Function returns true if the string parameter is longer than a given length, false
 * if it is not.
 * @param {string} string - the string to check the length of.
 * @param {boolean} config.value - the value that string.length must be greater than. 
 * @returns true if string.length is greater than config.value, false if not.
 */
const mustBeLongerThan = (string, config) => {
  return (string.length > config.value);
};

export default mustBeLongerThan;
