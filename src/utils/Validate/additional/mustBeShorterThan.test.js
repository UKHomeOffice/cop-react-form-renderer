import mustBeShorterThan from './mustBeShorterThan';

describe('utils', () => {
  describe('Validate', () => {
    describe('additional', () => {
      describe('mustBeShorterThan', () => {
        test('should return true given a string shorter than the given length', () => {
          const result = mustBeShorterThan('to', {value: 3});
          expect(result).toEqual(true);
        });

        test('should return false given a string longer than the given length', () => {
          const result = mustBeShorterThan('test', {value: 3});
          expect(result).toEqual(false);
        });

        test('should return false given a string equal to the given length', () => {
          const result = mustBeShorterThan('dog', {value: 3});
          expect(result).toEqual(false);
        });

        test('should return false when string is undefined', () => {
          const result = mustBeShorterThan(undefined, {value: 3});
          expect(result).toEqual(false);
        });

        test('should return true when string is empty', () => {
          const result = mustBeShorterThan('', {value: 3});
          expect(result).toEqual(true);
        });

        test('should return true when string is null', () => {
          const result = mustBeShorterThan(null, {value: 3});
          expect(result).toEqual(true);
        });
      });
    });
  });
});
