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
        const PAGE = {
          components: null,
          formData: null
        };
        expect(validatePage(PAGE).length).toEqual(0);
      });

      it('should return no error when the components array is empty', () => {
        const PAGE = {
          components: [],
          formData: null
        };
        expect(validatePage(PAGE).length).toEqual(0);
      });

      describe('when there is no form data', () => {

        it('should return no errors when no components are required', () => {
          const COMPONENTS = [
            setup('a', ComponentTypes.TEXT, 'Alpha', false),
            setup('b', ComponentTypes.TEXT, 'Bravo', false)
          ];
          const PAGE = {
            components: COMPONENTS,
            formData: null
          };
          expect(validatePage(PAGE).length).toEqual(0);
        });

        it('should return an error for each required component', () => {
          const COMPONENTS = [
            setup('a', ComponentTypes.TEXT, 'Alpha', true),
            setup('b', ComponentTypes.TEXT, 'Bravo', true),
            setup('c', ComponentTypes.TEXT, 'Charlie', false), // The only unrequired one
            setup('d', ComponentTypes.TEXT, 'Delta', true),
            setup('e', ComponentTypes.TEXT, 'Echo', true)
          ];
          const PAGE = {
            components: COMPONENTS,
            formData: null
          };
          const RESULT = validatePage(PAGE);
          expect(RESULT.length).toEqual(4);
          expect(RESULT[0]).toEqual({ id: 'a', error: 'Alpha is required' });
          expect(RESULT[1]).toEqual({ id: 'b', error: 'Bravo is required' });
          expect(RESULT[2]).toEqual({ id: 'd', error: 'Delta is required' });
          expect(RESULT[3]).toEqual({ id: 'e', error: 'Echo is required' });
        });

        it('should return an error for each required component with interpolated label', () => {
          const COMPONENTS = [
            // eslint-disable-next-line no-template-curly-in-string
            setup('a', ComponentTypes.TEXT, 'Alpha ${tiger}', true),
            // eslint-disable-next-line no-template-curly-in-string
            setup('b', ComponentTypes.EMAIL, 'Bravo ${panther}', true),
            // eslint-disable-next-line no-template-curly-in-string
            setup('c', ComponentTypes.AUTOCOMPLETE, 'Charlie ${eagle}', true),
            // eslint-disable-next-line no-template-curly-in-string
            setup('d', ComponentTypes.CHECKBOXES, 'Delta ${lion}', true),
            // eslint-disable-next-line no-template-curly-in-string
            setup('e', ComponentTypes.FILE, 'Echo ${zoo}', true)
          ];
          const PAGE = {
            components: COMPONENTS,
            formData: {
              tiger: 'Tiger',
              panther: 'Panther',
              eagle: 'Eagle',
              lion: 'Lion',
              zoo: 'Zoo'
            }
          };
          const RESULT = validatePage(PAGE);
          expect(RESULT.length).toEqual(5);
          expect(RESULT[0]).toEqual({ id: 'a', error: `Alpha ${PAGE.formData.tiger} is required` });
          expect(RESULT[1]).toEqual({ id: 'b', error: `Bravo ${PAGE.formData.panther} is required` });
          expect(RESULT[2]).toEqual({ id: 'c', error: `Charlie ${PAGE.formData.eagle} is required` });
          expect(RESULT[3]).toEqual({ id: 'd', error: `Delta ${PAGE.formData.lion} is required` });
          expect(RESULT[4]).toEqual({ id: 'e', error: `Echo ${PAGE.formData.zoo} is required` });
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
          const PAGE = {
            components: COMPONENTS,
            formData: DATA
          };
          expect(validatePage(PAGE).length).toEqual(0);
        });

        it('should return no errors when all of the components are required but not email types', () => {
          const COMPONENTS = [
            setup('alpha', ComponentTypes.TEXT, 'Alpha', true),
            setup('bravo', ComponentTypes.TEXT, 'Bravo', true)
          ];
          const PAGE = {
            components: COMPONENTS,
            formData: DATA
          };
          expect(validatePage(PAGE).length).toEqual(0);
        });


        it('should return no errors when none of the components are required but are all email types', () => {
          const COMPONENTS = [
            setup('alpha', ComponentTypes.EMAIL, 'Alpha', false),
            setup('bravo', ComponentTypes.EMAIL, 'Bravo', false)
          ];
          const PAGE = {
            components: COMPONENTS,
            formData: DATA
          };
          expect(validatePage(PAGE).length).toEqual(0);
        });

        it('should return no errors when all of the components are required and email types', () => {
          const COMPONENTS = [
            setup('alpha', ComponentTypes.EMAIL, 'Alpha', true),
            setup('bravo', ComponentTypes.EMAIL, 'Bravo', true)
          ];
          const PAGE = {
            components: COMPONENTS,
            formData: DATA
          };
          expect(validatePage(PAGE).length).toEqual(0);
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
          const PAGE = {
            components: COMPONENTS,
            formData: null
          };
          expect(validatePage(PAGE).length).toEqual(0);
        });

        it('should return an error for the missing field when all are required but not email types', () => {
          const COMPONENTS = [
            setup('alpha', ComponentTypes.TEXT, 'Alpha', true),
            setup('bravo', ComponentTypes.TEXT, 'Bravo', true),
            setup('charlie', ComponentTypes.TEXT, 'Charlie', true)
          ];
          const PAGE = {
            components: COMPONENTS,
            formData: DATA
          };
          const RESULT = validatePage(PAGE);
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
          const PAGE = {
            components: COMPONENTS,
            formData: DATA
          };
          const RESULT = validatePage(PAGE);
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
          const PAGE = {
            components: COMPONENTS,
            formData: DATA
          };
          const RESULT = validatePage(PAGE);
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

        it('should return an interpolated error for both invalid fields when all are required and email types', () => {
          const COMPONENTS = [
            setup('alpha', ComponentTypes.EMAIL, 'Alpha', true),
            // eslint-disable-next-line no-template-curly-in-string
            setup('bravo', ComponentTypes.EMAIL, 'Bravo ${lion}', true),
            // eslint-disable-next-line no-template-curly-in-string
            setup('charlie', ComponentTypes.EMAIL, 'Charlie ${panther}', true)
          ];
          const PAGE = {
            components: COMPONENTS,
            formData: { ...DATA,
              lion: 'Lion',
              panther: 'Panther'
            }
          };
          const RESULT = validatePage(PAGE);
          expect(RESULT.length).toEqual(2);
          expect(RESULT[0]).toEqual({
            id: 'bravo',
            error: `Enter bravo ${PAGE.formData.lion} in the correct format, like jane.doe@homeoffice.gov.uk`
          });
          expect(RESULT[1]).toEqual({
            id: 'charlie',
            error: `Charlie ${PAGE.formData.panther} is required`
          });
        });

      });

    });

  });

});
