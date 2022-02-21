// Local imports
import getPageId from './getPageId';

describe('components', () => {

  describe('FormRenderer', () => {

    describe('handlers', () => {

      describe('getPageId', () => {

        it('should return the pageId when the action is null', () => {
          const PAGE_ID = 'alpha';
          const ACTION = null;
          expect(getPageId(ACTION, PAGE_ID)).toEqual(PAGE_ID);
        });

        it('should return the pageId when the action contains no page', () => {
          const PAGE_ID = 'alpha';
          const ACTION = { id: 'bravo' };
          expect(getPageId(ACTION, PAGE_ID)).toEqual(PAGE_ID);
        });

        it('should return the page when provided', () => {
          const NAVIGATE_TO = 'delta'
          const PAGE_ID = 'alpha';
          const ACTION = { page: NAVIGATE_TO };
          expect(getPageId(ACTION, PAGE_ID)).toEqual(NAVIGATE_TO);
        });

      });

    });

  });

});
