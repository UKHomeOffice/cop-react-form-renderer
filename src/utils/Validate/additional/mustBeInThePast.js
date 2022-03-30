// Global imports
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isToday from 'dayjs/plugin/isToday';


//Local imports
import { DATE_FORMAT, formatString } from './utils';

dayjs.extend(customParseFormat);
dayjs.extend(isToday);

/**
 * Function returns true if the date parameter is a date before today, else returns false
 * dayjs counts today as before today so also cover same day inputs
 * @param {string} date - date string e.g. '03-12-2021'
 * @param {boolean} config.todayAllowed - true if today should be a valid date
 * @returns true if date is before current date
 */
const mustBeInThePast = (date, config) => {
  const beforeToday = dayjs(formatString(date), DATE_FORMAT).isBefore(dayjs());
  const isToday = dayjs(formatString(date), DATE_FORMAT).isToday();
  if (beforeToday && !isToday) {
    return true;
  }
  return isToday && !!config?.todayAllowed;
};

export default mustBeInThePast;
