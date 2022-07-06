/**
 * Function returns true if the string parameter is shorter than a given length, false
 * if it is not.
 * @param {string} string - the string to check the length of.
 * @param {boolean} config.value - the value that string.length must be less than. 
 * @returns true if string.length is less than config.value, false if not.
 */
 const mustBeShorterThan = (string, config) => {
  return (string.length < config.value);
};

export default mustBeShorterThan;
