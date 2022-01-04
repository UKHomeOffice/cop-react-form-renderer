// Local imports
import validateEmail from './validateEmail';

describe('utils', () => {

  describe('Validate', () => {

    describe('email', () => {

      const LABEL = 'Component';
      const ERROR = `Enter ${LABEL.toLowerCase()} in the correct format, like jane.doe@homeoffice.gov.uk`;

      // Valid values
      it('should return no error when the value is a valid .gov.uk address', () => {
        expect(validateEmail('alpha@homeoffice.gov.uk', LABEL)).toBeUndefined();
      });
      it('should return no error when the value is a capitalised digital.homeoffice.gov.uk address', () => {
        expect(validateEmail('ALPHA.BRAVO@DIGITAL.HOMEOFFICE.GOV.UK', LABEL)).toBeUndefined();
      });
      it('should return no error when the value is an empty string', () => {
        expect(validateEmail('', LABEL)).toBeUndefined();
      });

      // Invalid values
      it('should return an error when the value is an empty object', () => {
        expect(validateEmail({}, LABEL)).toEqual(ERROR);
      });
      it('should return an error when the value is an array', () => {
        expect(validateEmail(['bob'], LABEL)).toEqual(ERROR);
      });
      it('should return an error when the value is numeric', () => {
        expect(validateEmail(24, LABEL)).toEqual(ERROR);
      });
      it('should return an error when the value is in the wrong domain', () => {
        expect(validateEmail('alpha@domain.com', LABEL)).toEqual(ERROR);
      });
      it('should return an error when the domain contains spaces', () => {
        expect(validateEmail('alpha.bravo@digital homeoffice.gov.uk', LABEL)).toEqual(ERROR);
      });
      it('should return an error when the value has no TLD', () => {
        expect(validateEmail('alpha.bravo@homeoffice', LABEL)).toEqual(ERROR);
      });
      it('should return an error when there is no name', () => {
        expect(validateEmail('@homeoffice.gov.uk', LABEL)).toEqual(ERROR);
      });
      it('should return an error when there is no @ symbol', () => {
        expect(validateEmail('alpha.bravo.homeoffice.gov.uk', LABEL)).toEqual(ERROR);
      });
      it('should return an error when the name contains spaces', () => {
        expect(validateEmail('alpha bravo@digital.homeoffice.gov.uk', LABEL)).toEqual(ERROR);
      });
      it('should use a default label when none is specified', () => {
        const DEFAULT_ERROR = 'Enter email address in the correct format, like jane.doe@homeoffice.gov.uk'
        expect(validateEmail(['bob'], undefined)).toEqual(DEFAULT_ERROR);
      });

    });

  });

});
