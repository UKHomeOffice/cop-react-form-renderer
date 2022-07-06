import mustBeLongerThan from './mustBeLongerThan';

describe('utils', () => {
  describe('Validate', () => {
    describe('additional', () => {
      describe('mustBeLongerThan', () => {
        test('should return true given a string longer than the given length', () => {
          const result = mustBeLongerThan('test', {value: 3});
          expect(result).toEqual(true);
        });

        test('should return false given a string shorter than the given length', () => {
          const result = mustBeLongerThan('to', {value: 3});
          expect(result).toEqual(false);
        });

        test('should return false given a string equal to the given length', () => {
          const result = mustBeLongerThan('dog', {value: 3});
          expect(result).toEqual(false);
        });
      });
    });
  });
});
