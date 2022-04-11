// Global imports
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// Local imports
import { DATE_FORMAT, formatString } from './utils';

dayjs.extend(customParseFormat);

/**
 * Function returns true if the date string parameter is for a date more than ('is before') N months
 * in the past, where N is the number of months parameter
 * NOTE:  the one minute reduction on the threshold date is a workaround for as apparent bug in the
 * day.js isBefore() function when checking on 'same dates'
 * @param {string} date - date string in a valid date format e.g. DD-MM-YYYY
 * @param {string} config.unit - day, month or year
 * @param {number} config.value - number of the unit to be after
 * @returns false if date is NOT after the no of months in the past.
 */
const mustBeAfter = (date, config) => {
  const dateToCompare = dayjs().add(config.value, config.unit);
  return dayjs(formatString(date), DATE_FORMAT).isAfter(dateToCompare);
};

export default mustBeAfter;
