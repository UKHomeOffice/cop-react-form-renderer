// Local imports
import { EventTypes } from '../../models';
import formatDataForPage, { formatDataForPages } from './formatDataForPage';

describe('utils', () => {

  describe('Format', () => {

    const setupField = (fieldId, format) => {
      return { fieldId, format };
    };

    describe('formatDataForPage', () => {

      it('should appropriately format a page of components', () => {
        const EVENT_TYPE = EventTypes.SUBMIT;
        const COMPONENTS = [
          setupField('alpha', { type: 'lowercase', on: EventTypes.SUBMIT }), // Should be formatted
          setupField('bravo', null), // Nothing to format
          setupField('charlie', { type: 'uppercase', on: EventTypes.SUBMIT }), // Should be formatted
          setupField('delta', { type: 'uppercase', on: EventTypes.BLUR }), // Should not be formatted because of event type
        ];
        const DATA = {
          alpha: 'AlPhA',
          bravo: 'bRaVo',
          charlie: 'CHArlie',
          delta: 'deLTA'
        };
        const PAGE = { components: COMPONENTS };
        formatDataForPage(PAGE, DATA, EVENT_TYPE);
        expect(DATA).toEqual({
          alpha: 'alpha',
          bravo: 'bRaVo',
          charlie: 'CHARLIE',
          delta: 'deLTA'
        });
      });

    });

    describe('formatDataForPages', () => {

      it('should appropriately format multiple pages', () => {
        const EVENT_TYPE = EventTypes.SUBMIT;
        const COMPONENTS = [
          setupField('alpha', { type: 'lowercase', on: EventTypes.SUBMIT }), // Should be formatted
          setupField('bravo', null), // Nothing to format
          setupField('charlie', { type: 'uppercase', on: EventTypes.SUBMIT }), // Should be formatted
          setupField('delta', { type: 'uppercase', on: EventTypes.BLUR }), // Should not be formatted because of event type
        ];
        const DATA = {
          alpha: 'AlPhA',
          bravo: 'bRaVo',
          charlie: 'CHArlie',
          delta: 'deLTA'
        };
        const PAGES = [
          { components: COMPONENTS.slice(0, 1) },
          { components: COMPONENTS.slice(2) }
        ];
        formatDataForPages(PAGES, DATA, EVENT_TYPE);
        expect(DATA).toEqual({
          alpha: 'alpha',
          bravo: 'bRaVo',
          charlie: 'CHARLIE',
          delta: 'deLTA'
        });
      });

    });

  });

});
