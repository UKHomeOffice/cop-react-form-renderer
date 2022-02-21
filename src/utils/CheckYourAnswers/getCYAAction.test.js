// Local imports
import getCYAAction from './getCYAAction';

describe('utils', () => {

  describe('CheckYourAnswers', () => {
    
    describe('getCYAAction', () => {
      const getPage = (cya_link, id) => {
        return { cya_link, id };
      };

      it('should return null if readonly', () => {
        expect(getCYAAction(true, {}, () => {})).toBeNull();
      });

      it('should return null if there is no cya_link', () => {
        expect(getCYAAction(false, null, () => {})).toBeNull();
      });

      it('should return a default action if the cya_link is empty and the page has no id', () => {
        const CYA_LINK = {};
        const ON_ACTION = () => {};
        expect(getCYAAction(false, getPage(CYA_LINK), ON_ACTION)).toEqual({
          page: '#',
          label: 'Change',
          onAction: ON_ACTION
        });
      });

      it('should return a default action if the cya_link is empty but the page has an id', () => {
        const PAGE_ID = 'page-id';
        const CYA_LINK = {};
        const ON_ACTION = () => {};
        expect(getCYAAction(false, getPage(CYA_LINK, PAGE_ID), ON_ACTION)).toEqual({
          page: PAGE_ID,
          label: 'Change',
          onAction: ON_ACTION
        });
      });

      it('should use page specified in cya_link', () => {
        const PAGE = 'alpha';
        const CYA_LINK = { page: PAGE };
        const ON_ACTION = () => {};
        expect(getCYAAction(false, getPage(CYA_LINK), ON_ACTION)).toEqual({
          page: PAGE,
          label: 'Change',
          onAction: ON_ACTION
        });
      });

      it('should use label specified in cya_link', () => {
        const LABEL = 'Alpha Bravo Charlie';
        const CYA_LINK = { label: LABEL };
        const ON_ACTION = () => {};
        expect(getCYAAction(false, getPage(CYA_LINK), ON_ACTION)).toEqual({
          page: '#',
          label: LABEL,
          onAction: ON_ACTION
        });
      });

      it('should use aria_suffix specified in cya_link', () => {
        const ARIA_SUFFIX = 'This is hidden text';
        const CYA_LINK = { aria_suffix: ARIA_SUFFIX };
        const ON_ACTION = () => {};
        expect(getCYAAction(false, getPage(CYA_LINK), ON_ACTION)).toEqual({
          page: '#',
          label: 'Change',
          aria_suffix: ARIA_SUFFIX,
          onAction: ON_ACTION
        });
      });

      it('should use all properties specified in cya_link', () => {
        const PAGE = 'alpha';
        const LABEL = 'Alpha Bravo Charlie';
        const ARIA_SUFFIX = 'This is hidden text';
        const CYA_LINK = { label: LABEL, page: PAGE, aria_suffix: ARIA_SUFFIX };
        const ON_ACTION = () => {};
        expect(getCYAAction(false, getPage(CYA_LINK), ON_ACTION)).toEqual({
          page: PAGE,
          label: LABEL,
          aria_suffix: ARIA_SUFFIX,
          onAction: ON_ACTION
        });
      });

    });

  });

});
