import getGroupActionAttributes from './getGroupActionAttributes';

describe('components', () => {

  describe('SummaryList', () => {

    describe('helpers', () => {

      describe('getGroupActionAttributes', () => {

        it('should handle a null row', () => {
          expect(getGroupActionAttributes(null)).toEqual({});
        });

        it('should handle a row without an action', () => {
          expect(getGroupActionAttributes({})).toEqual({});
        });

        it('should handle a row with an empty action', () => {
          const ROW = {
            action: {}
          };
          expect(getGroupActionAttributes(ROW)).toEqual({});
        });

        it('should handle a row with a page', () => {
          const PAGE = 'alpha';
          const ROW = {
            action: { page: PAGE }
          };
          expect(getGroupActionAttributes(ROW)).toEqual({ href: `/${PAGE}` });
        });

        it('should handle a row with an onAction function', () => {
          const ON_ACTION_CALLS = [];
          const ON_ACTION = (row) => {
            ON_ACTION_CALLS.push(row);
          };
          const ROW = {
            action: { onAction: ON_ACTION }
          };
          const ATTRS = getGroupActionAttributes(ROW);
          expect(ATTRS.onClick).toBeDefined();
          expect(ATTRS.href).not.toBeDefined();
          ATTRS.onClick();
          expect(ON_ACTION_CALLS.length).toEqual(1);
          expect(ON_ACTION_CALLS[0]).toEqual(ROW);
        });

        it('should favour onAction over href', () => {
          const ON_ACTION_CALLS = [];
          const ON_ACTION = (row) => {
            ON_ACTION_CALLS.push(row);
          };
          const HREF = 'http://alpha.homeoffice.gov.uk';
          const ROW = {
            action: { href: HREF, onAction: ON_ACTION }
          };
          const ATTRS = getGroupActionAttributes(ROW);
          expect(ATTRS.onClick).toBeDefined();
          expect(ATTRS.href).not.toBeDefined();
          ATTRS.onClick();
          expect(ON_ACTION_CALLS.length).toEqual(1);
          expect(ON_ACTION_CALLS[0]).toEqual(ROW);
        });

      });

    });

  });

});
