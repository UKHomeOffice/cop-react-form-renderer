// Local imports
import isEditable, { EDITABLE_TYPES } from './isEditable';

describe('utils', () => {

  describe('Component', () => {

    describe('isEditable', () => {

      EDITABLE_TYPES.forEach(type => {
        it(`should return true for a type of '${type}'`, () => {
          const OPTIONS = { type };
          expect(isEditable(OPTIONS)).toEqual(true);
        });
      });

      it('should return false if options is undefined', () => {
        expect(isEditable(undefined)).toEqual(false);
      });

      it('should return false if options is null', () => {
        expect(isEditable(null)).toEqual(false);
      });

      it('should return false if options has no type', () => {
        expect(isEditable({ bob: 'Bob' })).toEqual(false);
      });

      it(`should return false if options has a type of 'hidden'`, () => {
        expect(isEditable({ type: 'hidden' })).toEqual(false);
      });

    });

  });

});
