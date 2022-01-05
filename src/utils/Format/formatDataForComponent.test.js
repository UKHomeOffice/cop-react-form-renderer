// Local imports
import { EventTypes } from '../../models';
import formatDataForComponent, { formatDataForComponents } from './formatDataForComponent';

describe('utils', () => {

  describe('Format', () => {

    const setupField = (fieldId, format) => {
      return { fieldId, format };
    };
    const setupData = (fieldId, value) => {
      return { [fieldId]: value };
    };
    const setupFieldAndData = (fieldId, format, value) => {
      return [
        setupField(fieldId, format),
        setupData(fieldId, value)
      ];
    };

    describe('formatDataForComponent', () => {

      it('should handle no format', () => {
        const EVENT_TYPE = EventTypes.SUBMIT;
        const FIELD_ID = 'field';
        const FORMAT = null;
        const VALUE = 'AlPhA';
        const [ COMPONENT, DATA ] = setupFieldAndData(FIELD_ID, FORMAT, VALUE);
        formatDataForComponent(COMPONENT, DATA, EVENT_TYPE);
        expect(DATA[FIELD_ID]).toEqual(VALUE);
      });

      it('should handle no value', () => {
        const EVENT_TYPE = EventTypes.SUBMIT;
        const FIELD_ID = 'field';
        const FORMAT = { type: 'lowercase', on: EVENT_TYPE };
        const VALUE = null;
        const [ COMPONENT, DATA ] = setupFieldAndData(FIELD_ID, FORMAT, VALUE);
        formatDataForComponent(COMPONENT, DATA, EVENT_TYPE);
        expect(DATA[FIELD_ID]).toBeNull();
      });

      it('should remain unchanged if the wrong event type', () => {
        const EVENT_TYPE = EventTypes.SUBMIT;
        const FIELD_ID = 'field';
        const FORMAT = { type: 'lowercase', on: EventTypes.BLUR };
        const VALUE = 'AlPhA';
        const [ COMPONENT, DATA ] = setupFieldAndData(FIELD_ID, FORMAT, VALUE);
        formatDataForComponent(COMPONENT, DATA, EVENT_TYPE);
        expect(DATA[FIELD_ID]).toEqual(VALUE);
      });

      it('should format a string as lowercase', () => {
        const EVENT_TYPE = EventTypes.SUBMIT;
        const FIELD_ID = 'field';
        const FORMAT = { type: 'lowercase', on: EVENT_TYPE };
        const VALUE = 'AlPhA';
        const [ COMPONENT, DATA ] = setupFieldAndData(FIELD_ID, FORMAT, VALUE);
        formatDataForComponent(COMPONENT, DATA, EVENT_TYPE);
        expect(DATA[FIELD_ID]).toEqual('alpha');
      });

      it('should format a string as uppercase', () => {
        const EVENT_TYPE = EventTypes.SUBMIT;
        const FIELD_ID = 'field';
        const FORMAT = { type: 'uppercase', on: EVENT_TYPE };
        const VALUE = 'AlPhA';
        const [ COMPONENT, DATA ] = setupFieldAndData(FIELD_ID, FORMAT, VALUE);
        formatDataForComponent(COMPONENT, DATA, EVENT_TYPE);
        expect(DATA[FIELD_ID]).toEqual('ALPHA');
      });

    });

    describe('formatDataForComponents', () => {

      it('should appropriately format multiple components', () => {
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
        formatDataForComponents(COMPONENTS, DATA, EVENT_TYPE);
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
