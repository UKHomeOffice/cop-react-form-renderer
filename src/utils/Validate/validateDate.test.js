import validateDate from './validateDate';
import { maxMonthDays } from './validateDate';

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
  expect(output).toEqual({ message: 'Day must be between 1 and 28', propsinerror: { day: true } });
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

test('should correctly identify the maximum numbers of days in a given month and year', () => {
  let max = maxMonthDays('02', '2024');
  expect(max).toEqual(29);

  max = maxMonthDays('02', '2023');
  expect(max).toEqual(28);

  max = maxMonthDays('06', '2023');
  expect(max).toEqual(30);

  max = maxMonthDays('07', '2023');
  expect(max).toEqual(31);
});
