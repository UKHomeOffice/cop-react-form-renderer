/**
 * Function returns true if the string parameter is shorter than a given length, false
 * if it is not. An empty string will cause the function to return true - this is to  
 * allow non-required fields to use this kind of validation.
 * @param {string} string - the string to check the length of.
 * @param {number} config.value - the length that string.length must be less than. 
 * @returns true if string.length is greater than config.value, false if not.
 */
 const mustBeShorterThan = (string, config) => {
  if (!string) {
    return true;
  }
  return (string.length < config.value);
};

export default mustBeShorterThan;
