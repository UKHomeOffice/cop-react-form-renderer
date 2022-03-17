import getRowActionAttributes from './getRowActionAttributes';

describe('components', () => {

  describe('SummaryList', () => {

    describe('helpers', () => {

      describe('getRowActionAttributes', () => {

        it('should handle a null row', () => {
          expect(getRowActionAttributes(null)).toEqual({});
        });

        it('should handle a row without an action', () => {
          expect(getRowActionAttributes({})).toEqual({});
        });

        it('should handle a row with an empty action', () => {
          const ROW = {
            action: {}
          };
          expect(getRowActionAttributes(ROW)).toEqual({});
        });

        it('should handle a row with a page', () => {
          const PAGE = 'alpha';
          const ROW = {
            action: { page: PAGE }
          };
          expect(getRowActionAttributes(ROW)).toEqual({ href: `/${PAGE}` });
        });

        it('should handle a row with an onAction function', () => {
          const ON_ACTION_CALLS = [];
          const ON_ACTION = (row) => {
            ON_ACTION_CALLS.push(row);
          };
          const ROW = {
            action: { onAction: ON_ACTION }
          };
          const ATTRS = getRowActionAttributes(ROW);
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
          const ATTRS = getRowActionAttributes(ROW);
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
