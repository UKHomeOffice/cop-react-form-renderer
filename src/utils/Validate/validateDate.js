// Global imports
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isToday from 'dayjs/plugin/isToday';
import isLeapYear from 'dayjs/plugin/isLeapYear';

//Local imports
import { DATE_FORMAT, formatString } from './additional/utils';

dayjs.extend(customParseFormat);
dayjs.extend(isToday);
dayjs.extend(isLeapYear)

const maxMonthDays = (month, year) => {
  if (month === '02') {
    return dayjs().year(year).isLeapYear() ? 29 : 28;
  } else if (['04', '06', '09', '11'].includes(month)) {
    return 30;
  }
  return 31;
};

export {maxMonthDays};

/**
 * Checks if a date passed is a valid date.
 * This will validate for 'leap years', missing components, invalid day, monnth or year components.
 * EXAMPLE USE : const { message, propsInError } = validateDate('2-11-2020')
 * @param {string} date  date as a string
 * @returns an object with an error message and instructions for which parts of the date are in error
 * or undefined for both if the date is valid
 */
const validateDate = (date) => {
  const formattedDate = formatString(date);
  const [day, month, year] = formattedDate.split('-');
  const intDay = parseInt(day, 10);
  const intMonth = parseInt(month, 10);


  if (year.length === 0) {
    return { message: 'Date must include a year', propsInError: { year: true } };
  }
  if (year.length !== 4) {
    return { message: 'Year must be 4 numbers', propsInError: { year: true } };
  }

  if (month.length === 0) {
    return { message: 'Date must include a month', propsInError: { month: true } };
  }
  if (intMonth > 12 || intMonth < 1) {
    return { message: 'Month must be between 1 and 12', propsInError: { month: true } };
  }

  if (day.length === 0) {
    return { message: 'Date must include a day', propsInError: { day: true } };
  }
  const maxDays = maxMonthDays(month, year);
  if (intDay > maxDays || intDay < 1) {
    return { message: `Day must be between 1 and ${maxDays}`, propsInError: { day: true } };
  }

  if (dayjs(formattedDate, DATE_FORMAT).format(DATE_FORMAT) !== formattedDate) {
    return { message: 'Enter a valid date', propsInError: { day: true, month: true, year: true } };
  }

  return { message: undefined, propsInError: undefined };
};

export default validateDate;
