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

        it('should return the pageId when the action contains no href', () => {
          const PAGE_ID = 'alpha';
          const ACTION = { id: 'bravo' };
          expect(getPageId(ACTION, PAGE_ID)).toEqual(PAGE_ID);
        });

        it('should return the final part of the href when provided', () => {
          const LAST_PART = 'delta';
          const HREF = `/bravo/charlie/${LAST_PART}`
          const PAGE_ID = 'alpha';
          const ACTION = { href: HREF };
          expect(getPageId(ACTION, PAGE_ID)).toEqual(LAST_PART);
        });

        it('should return the whole href when it contains no backslashes', () => {
          const HREF = 'delta';
          const PAGE_ID = 'alpha';
          const ACTION = { href: HREF };
          expect(getPageId(ACTION, PAGE_ID)).toEqual(HREF);
        });

      });

    });

  });

});
