// Local imports
import canCYASubmit from './canCYASubmit';

describe('components', () => {

  describe('FormRenderer', () => {

    describe('helpers', () => {

      describe('canCYASubmit', () => {

        it('should return true when all pages are valid', () => {
          const PAGE_1 = {
            components: [
              { id: 'a', fieldId: 'a', label: 'Alpha', required: true }
            ],
            formData: {
              a: 'Bravo'
            }
          };
          const PAGE_2 = {
            components: [
              { id: 'c', fieldId: 'c', label: 'Charlie', required: true }
            ],
            formData: {
              c: 'Delta'
            }
          };
          expect(canCYASubmit([ PAGE_1, PAGE_2 ], () => {})).toBeTruthy();
        });

        it('should return false when the first page is invalid and should have called the onErrors method appropriately', () => {
          const PAGE_1 = {
            components: [
              { id: 'a', fieldId: 'a', label: 'Alpha', required: true }
            ],
            formData: {}
          };
          const PAGE_2 = {
            components: [
              { id: 'c', fieldId: 'c', label: 'Charlie', required: true }
            ],
            formData: {
              c: 'Delta'
            }
          };
          const ERRORS = [];
          const ON_ERROR = (errors) => {
            ERRORS.push(...errors);
          };
          expect(canCYASubmit([PAGE_1, PAGE_2], ON_ERROR)).toBeFalsy();
          expect(ERRORS.length).toEqual(1);
          expect(ERRORS[0]).toEqual({ id: 'a', error: 'Alpha is required' });
        });

        it('should return false when the second page is invalid and should have called the onErrors method appropriately', () => {
          const PAGE_1 = {
            components: [
              { id: 'a', fieldId: 'a', label: 'Alpha', required: true }
            ],
            formData: {
              a: 'Bravo'
            }
          };
          const PAGE_2 = {
            components: [
              { id: 'c', fieldId: 'c', label: 'Charlie', required: true }
            ],
            formData: {}
          };
          const ERRORS = [];
          const ON_ERROR = (errors) => {
            ERRORS.push(...errors);
          };
          expect(canCYASubmit([PAGE_1, PAGE_2], ON_ERROR)).toBeFalsy();
          expect(ERRORS.length).toEqual(1);
          expect(ERRORS[0]).toEqual({ id: 'c', error: 'Charlie is required' });
        });

        it('should return false when the both pages are invalid and should have called the onErrors method appropriately', () => {
          const PAGE_1 = {
            components: [
              { id: 'a', fieldId: 'a', label: 'Alpha', required: true }
            ],
            formData: {}
          };
          const PAGE_2 = {
            components: [
              { id: 'c', fieldId: 'c', label: 'Charlie', required: true }
            ],
            formData: {}
          };
          const ERRORS = [];
          const ON_ERROR = (errors) => {
            ERRORS.push(...errors);
          };
          expect(canCYASubmit([PAGE_1, PAGE_2], ON_ERROR)).toBeFalsy();
          expect(ERRORS.length).toEqual(2);
          expect(ERRORS[0]).toEqual({ id: 'a', error: 'Alpha is required' });
          expect(ERRORS[1]).toEqual({ id: 'c', error: 'Charlie is required' });
        });

      });

    });

  });

});
