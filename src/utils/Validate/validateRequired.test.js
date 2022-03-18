// Local imports
import validateRequired from './validateRequired';

describe('utils', () => {

  describe('Validate', () => {

    describe('required', () => {
      const LABEL = 'Component';
      const ERROR = `${LABEL} is required`;

      // Valid values
      it('should return no error when the value is set', () => {
        expect(validateRequired('value', LABEL)).toBeUndefined();
      });
      it('should return no error when the value is an empty object', () => {
        expect(validateRequired({}, LABEL)).toBeUndefined();
      });
      it('should return no error when the value is a non-empty array', () => {
        expect(validateRequired(['bob'], LABEL)).toBeUndefined();
      });
      it('should return no error when the value is a boolean false', () => {
        expect(validateRequired(false, LABEL)).toBeUndefined();
      });
      it('should return no error when the value is the number zero', () => {
        expect(validateRequired(0, LABEL)).toBeUndefined();
      });

      // Invalid values
      it('should return an error when the value is undefined', () => {
        expect(validateRequired(undefined, LABEL)).toEqual(ERROR);
      });
      it('should return an error when the value is null', () => {
        expect(validateRequired(null, LABEL)).toEqual(ERROR);
      });
      it('should return an error when the value is an empty string', () => {
        expect(validateRequired('', LABEL)).toEqual(ERROR);
      });
      it('should return an error when the value is a string containing just spaces', () => {
        expect(validateRequired('     ', LABEL)).toEqual(ERROR);
      });
      it('should return an error when the value is an empty array', () => {
        expect(validateRequired([], LABEL)).toEqual(ERROR);
      });
      it('should use a default label when none is specified', () => {
        expect(validateRequired(undefined, undefined)).toEqual('Field is required');
      });
      it('should use a custom error when one is provided', () => {
        expect(validateRequired(undefined, undefined, [{type: 'required', message: 'custom error message'}])).toEqual('custom error message');
      });
      it('should ignore a custom error when not of type required', () => {
        expect(validateRequired(undefined, undefined, [{type: 'genericError', message: 'generic error message'}])).toEqual('Field is required');
      });

    });

  });

});
