import dayjs from 'dayjs';
import mustBeBefore from './mustBeBefore';

import { DATE_FORMAT } from './utils';

test('should return true given a date before the given number of months in the future', () => {
  const date = dayjs().add(1, 'month').format(DATE_FORMAT);
  const result = mustBeBefore(date, { value: 3, unit: 'month' });
  expect(result).toEqual(true);
});

test('should return false given a date after the given number of months in the future', () => {
  const date = dayjs().add(5, 'month').format(DATE_FORMAT);
  const result = mustBeBefore(date, { value: 3, unit: 'month' });
  expect(result).toEqual(false);
});

test('should return true given a date before the given number of years in the future', () => {
  const date = dayjs().add(1, 'year').format(DATE_FORMAT);
  const result = mustBeBefore(date, { value: 3, unit: 'year' });
  expect(result).toEqual(true);
});

test('should return false given a date after the given number of years in the future', () => {
  const date = dayjs().add(20, 'year').format(DATE_FORMAT);
  const result = mustBeBefore(date, { value: 15, unit: 'year' });
  expect(result).toEqual(false);
});

test('should return true given a date before the given number of days in the future', () => {
  const date = dayjs().add(1, 'day').format(DATE_FORMAT);
  const result = mustBeBefore(date, { value: 3, unit: 'day' });
  expect(result).toEqual(true);
});

test('should return true given a date after the given number of days in the future', () => {
  const date = dayjs().add(275, 'day').format(DATE_FORMAT);
  const result = mustBeBefore(date, { value: 250, unit: 'day' });
  expect(result).toEqual(false);
});
