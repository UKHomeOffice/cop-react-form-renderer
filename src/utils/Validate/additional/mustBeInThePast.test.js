import dayjs from 'dayjs';
import mustBeInThePast from './mustBeInThePast';

test('should return true given a date in the past', () => {
  const result = mustBeInThePast(dayjs().subtract(1, 'day').format('DD-MM-YYYY'));
  expect(result).toEqual(true);
});

test('should return false given a date in the future', () => {
  const result = mustBeInThePast(dayjs().add(1, 'day').format('DD-MM-YYYY'));
  expect(result).toEqual(false);
});

test('should return false given todays date', () => {
  const result = mustBeInThePast(dayjs().format('DD-MM-YYYY'));
  expect(result).toEqual(false);
});

test('should return true given todays date if todayAllowed is true', () => {
  const result = mustBeInThePast(dayjs().format('DD-MM-YYYY'), { todayAllowed: true });
  expect(result).toEqual(true);
});
