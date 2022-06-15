// Local imports
import validateRegex from './validateRegex';

describe('utils', () => {

  describe('Validate', () => {

    describe('', () => {
      const GOOD_VALUE = 'hello';
      const BAD_VALUE = 'h3llo';
      const LABEL = 'Component';
      const PATTERN = '^[a-z]*$';
      const CUSTOM_ERRORS = [
        {
          "type": "pattern",
          "message": `Regex validation failed for ${LABEL}` 
        }
      ];
      const DEFAULT_ERROR = [
        {
          "type": "pattern"
        }
      ];

      // Valid values
      it('should return no error when the value matches the regex pattern', () => {
        expect(validateRegex(GOOD_VALUE, LABEL, PATTERN, CUSTOM_ERRORS)).toBeUndefined();
      });
      it('should return no error when the value is an empty string', () => {
        expect(validateRegex('', LABEL, PATTERN, CUSTOM_ERRORS)).toBeUndefined();
      });

      // Invalid values
      it('should return a custom error when the value does not match the regex pattern and one is specified', () => {
        expect(validateRegex(BAD_VALUE, LABEL, PATTERN, CUSTOM_ERRORS)).toEqual(CUSTOM_ERRORS[0].message);
      });
      it('should return an error using label when the value does not match the regex pattern and a custom error is not specified', () => {
        expect(validateRegex(BAD_VALUE, LABEL, PATTERN, DEFAULT_ERROR)).toEqual(`${LABEL} failed regex validation`);
      });
      it('should return a default error when the value does not match the regex pattern and both a custom error and label are not specified', () => {
        expect(validateRegex(BAD_VALUE, '', PATTERN, DEFAULT_ERROR)).toEqual('Component failed regex validation');
      });
    });

  });

});
