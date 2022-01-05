// Local imports
import { EventTypes } from '../../models';
import formatDataForForm from './formatDataForForm';

describe('utils', () => {

  describe('Format', () => {

    const setupField = (fieldId, format) => {
      return { fieldId, format };
    };

    describe('formatDataForForm', () => {

      it('should appropriately format entire form', () => {
        const EVENT_TYPE = EventTypes.SUBMIT;
        const COMPONENTS = [
          setupField('alpha', { type: 'lowercase', on: EventTypes.SUBMIT }), // Should be formatted
          setupField('bravo', null), // Nothing to format
          setupField('charlie', { type: 'uppercase', on: EventTypes.SUBMIT }), // Should be formatted
          setupField('delta', { type: 'uppercase', on: EventTypes.BLUR }), // Should not be formatted because of event type
          setupField('echo', { type: 'uppercase', on: EventTypes.SUBMIT }), // Should not be formatted because of event type
          setupField('foxtrot', { type: 'lowercase', on: EventTypes.SUBMIT }), // Should not be formatted because of event type
        ];
        const DATA = {
          alpha: 'AlPhA',
          bravo: 'bRaVo',
          charlie: 'CHArlie',
          delta: 'deLTA',
          foxtrot: 'FOXTROT'
        };
        const FORM = {
          components: COMPONENTS.slice(0, 1),
          pages: [
            { components: COMPONENTS.slice(2, 3) },
            { components: COMPONENTS.slice(4) }
          ]
        };
        const FORMATTED_DATA = formatDataForForm(FORM, DATA, EVENT_TYPE);
        expect(FORMATTED_DATA).toEqual({
          alpha: 'alpha',
          bravo: 'bRaVo',
          charlie: 'CHARLIE',
          delta: 'deLTA',
          foxtrot: 'foxtrot'
        });
        // The original DATA, meanwhile, should remain untouched.
        expect(DATA).toEqual({
          alpha: 'AlPhA',
          bravo: 'bRaVo',
          charlie: 'CHArlie',
          delta: 'deLTA',
          foxtrot: 'FOXTROT'
        });
      });

    });

  });

});
