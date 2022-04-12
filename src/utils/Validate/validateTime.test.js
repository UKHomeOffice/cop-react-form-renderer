import validateTime from './validateTime';

describe('utils', () => {
  describe('Validate', () => {
    describe('time', () => {
      test('should return undefined if a time string is valid', () => {
        const output = validateTime('14:30', 'HH:MM');
        expect(output).toEqual({ message: undefined, propsInError: undefined });
      });

      test('should return an error if no hour is given', () => {
        const output = validateTime(':30', 'HH:MM');
        expect(output).toEqual({ message: 'Time must include a hour', propsInError: { hour: true } });
      });
      test('should return an error if the hour is not between 0 and 23', () => {
        const output = validateTime('35:30', 'HH:MM');
        expect(output).toEqual({ message: 'Hour must be between 0 and 23', propsInError: { hour: true } });
      });

      test('should return an error if no minute is given', () => {
        const output = validateTime('14:', 'HH:MM');
        expect(output).toEqual({ message: 'Time must include a minute', propsInError: { minute: true } });
      });
      test('should return an error if the minute is not between 0 and 59', () => {
        const output = validateTime('14:75', 'HH:MM');
        expect(output).toEqual({ message: 'Minute must be between 0 and 59', propsInError: { minute: true } });
      });


    });
  });
});
