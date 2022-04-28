import dayjs from 'dayjs';
import mustBeInTheFuture from './mustBeInTheFuture';

describe('utils', () => {
  describe('Validate', () => {
    describe('additional', () => {
      describe('mustBeInTheFuture', () => {
        test('should return false given a date in the past', () => {
          const result = mustBeInTheFuture(dayjs().subtract(1, 'day').format('DD-MM-YYYY'));
          expect(result).toEqual(false);
        });

        test('should return true given a date in the future', () => {
          const result = mustBeInTheFuture(dayjs().add(1, 'day').format('DD-MM-YYYY'));
          expect(result).toEqual(true);
        });

        test('should return false given todays date', () => {
          const result = mustBeInTheFuture(dayjs().format('DD-MM-YYYY'));
          expect(result).toEqual(false);
        });

        test('should return true given todays date if todayAllowed is true', () => {
          const result = mustBeInTheFuture(dayjs().format('DD-MM-YYYY'), { todayAllowed: true });
          expect(result).toEqual(true);
        });
      });
    });
  });
});
