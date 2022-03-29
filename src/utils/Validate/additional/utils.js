const isNumeric = (value) => {
  return /^-?\d+$/.test(value);
};

const formatString = (date) => {
  const [day, month, year] = date.split('-');
  return `${formatInTwoDigits(day)}-${formatInTwoDigits(month)}-${year}`;
};

/**
 * Prepends a leading zero if the 'date component' parameter contains only a single digit.
 * if the parameter contains more than one digit it is returned unchanged.
 * If the parameter contains a non-numeric value it returned as an empty string.
 * @param {*} dateComponent - the value representing a day or month.
 * @returns  the value (appended with a leading zero, if the value passed in was a single digit)
 */
const formatInTwoDigits = (dateComponent) => {
  let result = '';

  if (isNumeric(dateComponent)) {
    if (dateComponent.toString().length === 1) {
      result = `0${dateComponent}`;
    } else {
      result = dateComponent;
    }
  }
  return result;
};

const DATE_FORMAT = 'DD-MM-YYYY';

export { DATE_FORMAT, formatString };
