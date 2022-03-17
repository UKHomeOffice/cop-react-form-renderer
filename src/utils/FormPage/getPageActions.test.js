// Local imports
import { PageAction } from '../../models';
import getPageActions from './getPageActions';

describe('utils', () => {

  describe('FormPage', () => {

    describe('getPageActions', () => {

      it('should handle a null or undefined page', () => {
        expect(getPageActions(null)).toBeUndefined();
        expect(getPageActions(undefined)).toBeUndefined();
      });

      it('should handle a null or undefined actions array', () => {
        expect(getPageActions({ actions: null })).toBeUndefined();
        expect(getPageActions({ actions: undefined })).toBeUndefined();
      });

      it('should handle an array of strings', () => {
        const actions = [PageAction.TYPES.SAVE_AND_CONTINUE, PageAction.TYPES.SAVE_AND_RETURN];
        expect(getPageActions({ actions })).toEqual([
          PageAction.DEFAULTS.saveAndContinue,
          PageAction.DEFAULTS.saveAndReturn
        ]);
      });

      it('should handle a null entry in the array', () => {
        const actions = [PageAction.TYPES.SAVE_AND_CONTINUE, PageAction.TYPES.SAVE_AND_RETURN, null];
        expect(getPageActions({ actions })).toEqual([
          PageAction.DEFAULTS.saveAndContinue,
          PageAction.DEFAULTS.saveAndReturn
        ]);
      });

      it('should handle an undefined entry in the array', () => {
        const actions = [undefined, PageAction.TYPES.SAVE_AND_CONTINUE, undefined, PageAction.TYPES.SAVE_AND_RETURN];
        expect(getPageActions({ actions })).toEqual([
          PageAction.DEFAULTS.saveAndContinue,
          PageAction.DEFAULTS.saveAndReturn
        ]);
      });

      it('should handle an object entry in the array', () => {
        const actions = [{ type: 'navigate', page: 'alpha' }];
        expect(getPageActions({ actions })).toEqual(actions);
      });

      it('should convert an href to a page', () => {
        const actions = [{ type: 'navigate', href: '/alpha/bravo' }];
        expect(getPageActions({ actions })).toEqual([{ type: 'navigate', page: 'bravo', href: '/alpha/bravo' }]);
      });

      it('should convert a url to a page', () => {
        const actions = [{ type: 'navigate', url: '/alpha/bravo' }];
        expect(getPageActions({ actions })).toEqual([{ type: 'navigate', page: 'bravo', url: '/alpha/bravo' }]);
      });

      it('should handle an action without a page, href, or url', () => {
        const actions = [{ type: 'submit', label: 'Charlie' }];
        expect(getPageActions({ actions })).toEqual(actions);
      });

    });

  });

});
