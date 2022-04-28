// Global imports
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// Local imports
import { DATE_FORMAT, formatString } from './utils';

dayjs.extend(customParseFormat);

/**
 * Function returns false if the date string parameter is for a date more than N in the future
 * where N is the number of months parameter
 * @param {string} dateToCheck - date string in a valid date format e.g. DD-MM-YYYY
 * @param {string} config.unit - day, month or year
 * @param {number} config.value - number of the unit to be before
 * @returns true if date is not after the no of months in future.
 */
const mustBeBefore = (date, config) => {
  const dateToCompare = dayjs().add(config.value, config.unit);
  return dayjs(formatString(date), DATE_FORMAT).isBefore(dateToCompare);
};

export default mustBeBefore;
