// Global Imports
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isToday from 'dayjs/plugin/isToday';

//Local imports
import { DATE_FORMAT, formatString } from './utils';

dayjs.extend(customParseFormat);
dayjs.extend(isToday);

/**
 * Function returns true if the date parameter is a date after today, else returns false
 * @param {*} date - date string e.g. '03-12-2021'
 * @param {*} config.todayAllowed - true if today should be a valid date
 * @returns true if date is after current date
 */
const mustBeInTheFuture = (date, config) => {
  const afterToday = dayjs(formatString(date), DATE_FORMAT).isAfter(dayjs());
  if (afterToday) {
    return true;
  }
  return dayjs(formatString(date), DATE_FORMAT).isToday() && !!config?.todayAllowed;
};

export default mustBeInTheFuture;
