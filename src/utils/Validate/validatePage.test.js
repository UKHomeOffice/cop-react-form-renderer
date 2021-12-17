// Local imports
import { ComponentTypes } from '../../models';
import validatePage from './validatePage';

describe('utils', () => {

  describe('Validate', () => {

    describe('page', () => {

      const setup = (id, type, label, required) => {
        return { id, fieldId: id, type, label, required };
      };

      it('should return no error when the components array is null', () => {
        expect(validatePage(null, {}).length).toEqual(0);
      });

      it('should return no error when the components array is empty', () => {
        expect(validatePage([], {}).length).toEqual(0);
      });

      describe('when there is no form data', () => {

        it('should return a single error when no components are required', () => {
          const COMPONENTS = [
            setup('a', ComponentTypes.TEXT, 'Alpha', false),
            setup('b', ComponentTypes.TEXT, 'Bravo', false)
          ];
          expect(validatePage(COMPONENTS, null).length).toEqual(0);
        });

        it('should return an error for each required component', () => {
          const COMPONENTS = [
            setup('a', ComponentTypes.TEXT, 'Alpha', true),
            setup('b', ComponentTypes.TEXT, 'Bravo', true),
            setup('c', ComponentTypes.TEXT, 'Charlie', false), // The only unrequired one
            setup('d', ComponentTypes.TEXT, 'Delta', true),
            setup('e', ComponentTypes.TEXT, 'Echo', true)
          ];
          const RESULT = validatePage(COMPONENTS, null);
          expect(RESULT.length).toEqual(4);
          expect(RESULT[0]).toEqual({ id: 'a', error: 'Alpha is required' });
          expect(RESULT[1]).toEqual({ id: 'b', error: 'Bravo is required' });
          expect(RESULT[2]).toEqual({ id: 'd', error: 'Delta is required' });
          expect(RESULT[3]).toEqual({ id: 'e', error: 'Echo is required' });
        });

      });

      describe('when the form data is fully valid', () => {
        const DATA = {
          alpha: 'alpha.smith@digital.homeoffice.gov.uk',
          bravo: 'bravo.jones@digital.homeoffice.gov.uk'
        };

        it('should return no errors when none of the components are required or email types', () => {
          const COMPONENTS = [
            setup('alpha', ComponentTypes.TEXT, 'Alpha', false),
            setup('bravo', ComponentTypes.TEXT, 'Bravo', false)
          ];
          expect(validatePage(COMPONENTS, DATA).length).toEqual(0);
        });

        it('should return no errors when all of the components are required but not email types', () => {
          const COMPONENTS = [
            setup('alpha', ComponentTypes.TEXT, 'Alpha', true),
            setup('bravo', ComponentTypes.TEXT, 'Bravo', true)
          ];
          expect(validatePage(COMPONENTS, DATA).length).toEqual(0);
        });

        it('should return no errors when none of the components are required but are all email types', () => {
          const COMPONENTS = [
            setup('alpha', ComponentTypes.EMAIL, 'Alpha', false),
            setup('bravo', ComponentTypes.EMAIL, 'Bravo', false)
          ];
          expect(validatePage(COMPONENTS, DATA).length).toEqual(0);
        });

        it('should return no errors when all of the components are required and email types', () => {
          const COMPONENTS = [
            setup('alpha', ComponentTypes.EMAIL, 'Alpha', true),
            setup('bravo', ComponentTypes.EMAIL, 'Bravo', true)
          ];
          expect(validatePage(COMPONENTS, DATA).length).toEqual(0);
        });

      });

      describe('when the form data has one field missing and includes an invalid email', () => {
        const DATA = {
          alpha: 'alpha.smith@digital.homeoffice.gov.uk',
          bravo: 'bravo.jones@hotmail.com'
        };

        it('should return no errors when none of the components are required or email types', () => {
          const COMPONENTS = [
            setup('alpha', ComponentTypes.TEXT, 'Alpha', false),
            setup('bravo', ComponentTypes.TEXT, 'Bravo', false),
            setup('charlie', ComponentTypes.TEXT, 'Charlie', false)
          ];
          expect(validatePage(COMPONENTS, DATA).length).toEqual(0);
        });

        it('should return an error for the missing field when all are required but not email types', () => {
          const COMPONENTS = [
            setup('alpha', ComponentTypes.TEXT, 'Alpha', true),
            setup('bravo', ComponentTypes.TEXT, 'Bravo', true),
            setup('charlie', ComponentTypes.TEXT, 'Charlie', true)
          ];
          const RESULT = validatePage(COMPONENTS, DATA);
          expect(RESULT.length).toEqual(1);
          expect(RESULT[0]).toEqual({
            id: 'charlie',
            error: 'Charlie is required'
          });
        });

        it('should return an error for the invalid email field when none are required but all email types', () => {
          const COMPONENTS = [
            setup('alpha', ComponentTypes.EMAIL, 'Alpha', false),
            setup('bravo', ComponentTypes.EMAIL, 'Bravo', false),
            setup('charlie', ComponentTypes.EMAIL, 'Charlie', false)
          ];
          const RESULT = validatePage(COMPONENTS, DATA);
          expect(RESULT.length).toEqual(1);
          expect(RESULT[0]).toEqual({
            id: 'bravo',
            error: 'Enter bravo in the correct format, like jane.doe@homeoffice.gov.uk'
          });
        });

        it('should return an error for both invalid fields when all are required and email types', () => {
          const COMPONENTS = [
            setup('alpha', ComponentTypes.EMAIL, 'Alpha', true),
            setup('bravo', ComponentTypes.EMAIL, 'Bravo', true),
            setup('charlie', ComponentTypes.EMAIL, 'Charlie', true)
          ];
          const RESULT = validatePage(COMPONENTS, DATA);
          expect(RESULT.length).toEqual(2);
          expect(RESULT[0]).toEqual({
            id: 'bravo',
            error: 'Enter bravo in the correct format, like jane.doe@homeoffice.gov.uk'
          });
          expect(RESULT[1]).toEqual({
            id: 'charlie',
            error: 'Charlie is required'
          });
        });

      });

    });

  });

});
