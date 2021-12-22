// Local imports
import canActionProceed from './canActionProceed';

describe('components', () => {

  describe('FormRenderer', () => {

    describe('helpers', () => {

      describe('canActionProceed', () => {

        it('should return true when the action does not require validation', () => {
          const ACTION = { validate: false };
          expect(canActionProceed(ACTION, {}, () => {})).toBeTruthy();
        });

        it('should return true when the page is valid', () => {
          const ACTION = { validate: true };
          const PAGE = {
            components: [
              { id: 'a', fieldId: 'a', label: 'Alpha', required: true }
            ],
            formData: {
              a: 'Bravo'
            }
          };
          expect(canActionProceed(ACTION, PAGE, () => {})).toBeTruthy();
        });

        it('should return false when the page is invalid and should have called the onErrors method appropriately', () => {
          const ACTION = { validate: true };
          const PAGE = {
            components: [
              { id: 'a', fieldId: 'a', label: 'Alpha', required: true }
            ],
            formData: {}
          };
          const ERRORS = [];
          const ON_ERROR = (errors) => {
            ERRORS.push(...errors);
          };
          expect(canActionProceed(ACTION, PAGE, ON_ERROR)).toBeFalsy();
          expect(ERRORS.length).toEqual(1);
          expect(ERRORS[0].id).toEqual('a');
          expect(ERRORS[0].error).toEqual('Alpha is required');
        });

      });

    });

  });

});
