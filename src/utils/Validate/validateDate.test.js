import dayjs from 'dayjs';
import validateDate, {
  formatInTwoDigits,
  isDateBeforeFutureNoOfMonths,
  isDateLessThanXMonthsAgo,
  formatString,
  isDateInFuture,
  isDateInPast
} from './ValidateDate';

//////////////////////////////
//Test utility functions
//////////////////////////////
test('single digit string value is prepended with leading zero', () => {
  const result = formatInTwoDigits('1');
  expect(result).toEqual('01');
});

test('double digit string value is returned unchanged', () => {
  const result = formatInTwoDigits('12');
  expect(result).toEqual('12');
});

test('if value passed in contains a non digit value the result is returned as empty string', () => {
  const result = formatInTwoDigits('%');
  expect(result).toEqual('');
});

test('should add leading zeros to day and month if missing', () => {
  const formatted = formatString('5-3-2022');
  expect(formatted).toEqual('05-03-2022');
});

test('should leave string unmodified if leading zeros in place', () => {
  const date = '05-03-2022';
  const formatted = formatString(date);
  expect(formatted).toEqual(date);
});

//////////////////////////////
//Test time boundary functions
//////////////////////////////
test('should return false if date string parameter is more than 18 months in the future', () => {
  const dateInFuture = dayjs().add(19, 'month').format('DD-MM-YYYY');
  const result = isDateBeforeFutureNoOfMonths(dateInFuture, 18);
  expect(result).toEqual(false);
});

test('should return true if date string parameter is NOT more than 18 months in the future', () => {
  const dateInFuture = dayjs().add(18, 'month').format('DD-MM-YYYY');
  const result = isDateBeforeFutureNoOfMonths(dateInFuture, 18);
  expect(result).toEqual(true);
});

test('should return false if date string parameter is more than 1 month in the past', () => {
  const dateInPast = dayjs().subtract(2, 'month').format('DD-MM-YYYY');
  const result = isDateLessThanXMonthsAgo(dateInPast, 1);
  expect(result).toEqual(false);
});

test('should return true if date string parameter is NOT more than 1 month in the past', () => {
  const dateInPast = dayjs().subtract(15, 'day').format('DD-MM-YYYY');
  const result = isDateLessThanXMonthsAgo(dateInPast, 1);
  expect(result).toEqual(true);
});

test('future check should return false given a date in the past', () => { 
  const result = isDateInFuture(dayjs().subtract(1, 'day').format('DD-MM-YYYY'));
  expect(result).toEqual(false);
})

test('future check should return true given a date in the future', () => {
  const result = isDateInFuture(dayjs().add(1, 'day').format('DD-MM-YYYY'));
  expect(result).toEqual(true);
})

test('future check should return false given todays date', () => {
  const result = isDateInFuture(dayjs().format('DD-MM-YYYY'));
  expect(result).toEqual(false);
})

test('past check should return true given a date in the past', () => { 
  const result = isDateInPast(dayjs().subtract(1, 'day').format('DD-MM-YYYY'));
  expect(result).toEqual(true);
})

test('past check should return false given a date in the future', () => {
  const result = isDateInPast(dayjs().add(1, 'day').format('DD-MM-YYYY'));
  expect(result).toEqual(false);
})

test('past check should return false given todays date', () => {
  const result = isDateInPast(dayjs().format('DD-MM-YYYY'));
  expect(result).toEqual(false);
})

//////////////////////////////
//Test validation of date functions
//////////////////////////////
test('should return undefined if a date string is valid', () => {
  const output = validateDate('28-02-2024', 'DD-MM-YYYY');
  expect(output).toEqual({ message: undefined, propsinerror: undefined });
});

test('should return undefined to a correct leap year date', () => {
  const output = validateDate('29-02-2024', 'DD-MM-YYYY');
  expect(output).toEqual({ message: undefined, propsinerror: undefined });
});

test('should validate false if NOT a leap year & 29 Feb is entered', () => {
  const output = validateDate('29-02-2023', 'DD-MM-YYYY');
  expect(output).toEqual({ message: 'Enter a valid date', propsinerror: { day: true, month: true, year: true } });
});

test('should return an error if no year is given', () => {
  const output = validateDate('29-02-', 'DD-MM-YYYY');
  expect(output).toEqual({ message: 'Date must include a year', propsinerror: { year: true } });
});
test('should return an error if the year contains less than 4 numbers', () => {
  const output = validateDate('29-02-20', 'DD-MM-YYYY');
  expect(output).toEqual({ message: 'Year must be 4 numbers', propsinerror: { year: true } });
});

test('should return an error if the year contains more than 4 numbers', () => {
  const output = validateDate('29-02-20202', 'DD-MM-YYYY');
  expect(output).toEqual({ message: 'Year must be 4 numbers', propsinerror: { year: true } });
});

test('should return an error if no month is given', () => {
  const output = validateDate('29--2020', 'DD-MM-YYYY');
  expect(output).toEqual({ message: 'Date must include a month', propsinerror: { month: true } });
});
test('should return an error if the month is not between 1 and 12', () => {
  const output = validateDate('29-14-2020', 'DD-MM-YYYY');
  expect(output).toEqual({ message: 'Month must be between 1 and 12', propsinerror: { month: true } });
});

test('should return an error if no day is given', () => {
  const output = validateDate('-03-2020', 'DD-MM-YYYY');
  expect(output).toEqual({ message: 'Date must include a day', propsinerror: { day: true } });
});
test('should return an error if the day is not between 1 and 31', () => {
  const output = validateDate('45-12-2020', 'DD-MM-YYYY');
  expect(output).toEqual({ message: 'Day must be between 1 and 31', propsinerror: { day: true } });
});
