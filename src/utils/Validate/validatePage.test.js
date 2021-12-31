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

        it('should return no errors when no components are required', () => {
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

      });

    });

  });

});
