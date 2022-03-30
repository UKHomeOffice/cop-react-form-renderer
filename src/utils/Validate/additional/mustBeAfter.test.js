import dayjs from 'dayjs';
import mustBeAfter from './mustBeAfter';

import { DATE_FORMAT } from './utils';

describe('utils', () => {
  describe('Validate', () => {
    describe('additional', () => {
      describe('mustBeAfter', () => {
        test('should return true given a date after the given number of months in the future', () => {
          const date = dayjs().add(3, 'month').format(DATE_FORMAT);
          const result = mustBeAfter(date, { value: 1, unit: 'month' });
          expect(result).toEqual(true);
        });

        test('should return false given a date before the given number of months in the future', () => {
          const date = dayjs().add(3, 'month').format(DATE_FORMAT);
          const result = mustBeAfter(date, { value: 5, unit: 'month' });
          expect(result).toEqual(false);
        });

        test('should return true given a date after the given number of months in the past', () => {
          const date = dayjs().add(-3, 'month').format(DATE_FORMAT);
          const result = mustBeAfter(date, { value: -5, unit: 'month' });
          expect(result).toEqual(true);
        });

        test('should return false given a date before the given number of months in the past', () => {
          const date = dayjs().add(-10, 'month').format(DATE_FORMAT);
          const result = mustBeAfter(date, { value: -5, unit: 'month' });
          expect(result).toEqual(false);
        });

        test('should return true given a date after the given number of years in the future', () => {
          const date = dayjs().add(3, 'year').format(DATE_FORMAT);
          const result = mustBeAfter(date, { value: 1, unit: 'year' });
          expect(result).toEqual(true);
        });

        test('should return false given a date before the given number of years in the future', () => {
          const date = dayjs().add(15, 'year').format(DATE_FORMAT);
          const result = mustBeAfter(date, { value: 20, unit: 'year' });
          expect(result).toEqual(false);
        });

        test('should return true given a date after the given number of years in the past', () => {
          const date = dayjs().add(-15, 'year').format(DATE_FORMAT);
          const result = mustBeAfter(date, { value: -20, unit: 'year' });
          expect(result).toEqual(true);
        });

        test('should return false given a date before the given number of years in the past', () => {
          const date = dayjs().add(-25, 'year').format(DATE_FORMAT);
          const result = mustBeAfter(date, { value: -20, unit: 'year' });
          expect(result).toEqual(false);
        });

        test('should return true given a date after the given number of days in the future', () => {
          const date = dayjs().add(3, 'day').format(DATE_FORMAT);
          const result = mustBeAfter(date, { value: 1, unit: 'day' });
          expect(result).toEqual(true);
        });

        test('should return true given a date before the given number of days in the future', () => {
          const date = dayjs().add(250, 'day').format(DATE_FORMAT);
          const result = mustBeAfter(date, { value: 275, unit: 'day' });
          expect(result).toEqual(false);
        });
      });
    });
  });
});
