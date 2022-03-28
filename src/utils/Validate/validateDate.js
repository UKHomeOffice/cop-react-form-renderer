import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isToday from 'dayjs/plugin/isToday'

dayjs.extend(customParseFormat);
dayjs.extend(isToday)
const DATE_FORMAT = 'DD-MM-YYYY';

/**
 * Checks if a date passed is a valid date.
 * This will validate for 'leap years', missing components, invalid day, monnth or year components.
 * EXAMPLE USE : const { message, propsinerror } = validateDate('2-11-2020')
 * @param {*} date  date as a string
 * @returns an object with an error message and instructions for which parts of the date are in error
 * or undefined for both if the date is valid
 */
const validateDate = (date) => {
  const formattedDate = formatString(date);
  const [day, month, year] = formattedDate.split('-');

  if (year.length === 0) {
    return { message: 'Date must include a year', propsinerror: { year: true } };
  }
  if (year.length !== 4) {
    return { message: 'Year must be 4 numbers', propsinerror: { year: true } };
  }

  if (month.length === 0) {
    return { message: 'Date must include a month', propsinerror: { month: true } };
  }
  if (month > 12 || month < 1) {
    return { message: 'Month must be between 1 and 12', propsinerror: { month: true } };
  }

  if (day.length === 0) {
    return { message: 'Date must include a day', propsinerror: { day: true } };
  }
  if (day > 31 || day < 1) {
    return { message: 'Day must be between 1 and 31', propsinerror: { day: true } };
  }

  /* eslint-disable-next-line */
  if (dayjs(formattedDate, DATE_FORMAT).format(DATE_FORMAT) !== formattedDate) {
    return { message: 'Enter a valid date', propsinerror: { day: true, month: true, year: true } };
  }

  return { message: undefined, propsinerror: undefined };
};

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

/**
 * Function returns false if the date string parameter is for a date more than N in the future
 * where N is the number of months parameter
 * @param {*} dateToCheck - date string in a valid date format e.g. DD-MM-YYYY
 * @param {*} monthsInFuture - max no of months in future for the date to be valid
 * @returns true if date is not after the no of months in future.
 */
const isDateBeforeFutureNoOfMonths = (date, monthsInFuture) => {
  return dayjs(formatString(date), DATE_FORMAT).isBefore(dayjs().add(monthsInFuture, 'month'));
};

/**
 * Function returns true if the date string parameter is for a date more than ('is before') N months
 * in the past, where N is the number of months parameter
 * NOTE:  the one minute reduction on the threshold date is a workaround for as apparent bug in the
 * day.js isBefore() function when checking on 'same dates'
 * @param {*} date - date string in a valid date format e.g. DD-MM-YYYY
 * @param {*} monthsInPast - max no of months in past for the date to be valid
 * @returns false if date is NOT after the no of months in the past.
 */
const isDateLessThanXMonthsAgo = (date, monthsInPast) => {
  const xMonthsAgo = dayjs().subtract(monthsInPast, 'month').subtract(1, 'minute');
  return dayjs(formatString(date), DATE_FORMAT).isAfter(xMonthsAgo);
};

/**
 * Function returns true if the date parameter is a date before today, else returns false
 * dayjs counts today as before today so also cover same day inputs
 * @param {*} date - date string e.g. '03-12-2021'
 * @returns true if date is before current date
 */
const isDateInPast = (date, todayAllowed) => {
  const beforeToday =  dayjs(formatString(date), DATE_FORMAT).isBefore(dayjs());
  const isToday = dayjs(formatString(date), DATE_FORMAT).isToday();
  let check = false;
  if(!isToday || (isToday && todayAllowed === 'true')){
    check = true;
  }
  return beforeToday && check;
};

/**
 * Function returns true if the date parameter is a date after today, else returns false
 * @param {*} date - date string e.g. '03-12-2021'
 * @returns true if date is after current date
 */
const isDateInFuture = (date) => {
  return dayjs(formatString(date), DATE_FORMAT).isAfter(dayjs());
};

const dateValidators = { isDateInFuture, isDateInPast, isDateBeforeFutureNoOfMonths, isDateLessThanXMonthsAgo };

export default validateDate;
export {
  dateValidators,
  formatString,
  formatInTwoDigits,
  isDateBeforeFutureNoOfMonths,
  isDateLessThanXMonthsAgo,
  isDateInFuture,
  isDateInPast,
};
