// eslint-disable-next-line no-control-regex
// const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
const HODS_EMAIL_REGEX = /^[a-z0-9._-]+@(digital\.)?homeoffice.gov.uk$/i;

/**
 * Validates an email address, ensuring it is in the correct domain and
 * complies with the Home Office email address standards.
 * 
 * Note that an empty string is not considered invalid. You should use
 * validateRequired (Validate.required) for that sort of validation.
 * @param {*} value The value to validate.
 * @param {string} label The label to use in any error message.
 * @returns An error if the email address is invalid.
 */
const validateEmail = (value, label = '') => {
  if (!!value) {
    if (typeof value === 'string') {
      if (HODS_EMAIL_REGEX.test(value)) {
        return undefined;
      }
    }
    const name = label ? label.toLowerCase() : 'email address';
    return `Enter ${name} in the correct format, like jane.doe@homeoffice.gov.uk`;
  }
  return undefined;
};

export default validateEmail;
