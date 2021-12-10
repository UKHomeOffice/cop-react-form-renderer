// Local imports
import getSourceData from './getSourceData';

describe('utils', () => {

  describe('Data', () => {

    describe('getSourceData', () => {
      it('should return the value at the top level', () => {
        const FIELD_ID = 'field';
        const VALUE = 'value';
        const DATA = { [FIELD_ID]: VALUE };
        const value = getSourceData(DATA, FIELD_ID);
        expect(value).toEqual(VALUE);
      });
      it('should return a nested value', () => {
        const FIELD_ID = 'field.nested';
        const VALUE = 'nested value';
        const DATA = { field: { nested: VALUE } };
        const value = getSourceData(DATA, FIELD_ID);
        expect(value).toEqual(VALUE);
      });
      it('should return a deeply nested value', () => {
        const FIELD_ID = 'field.nested.and.even.further.down';
        const VALUE = 'deeply nested value';
        const DATA = { field: { nested: { and: { even: { further: { down: VALUE } } } } } };
        const value = getSourceData(DATA, FIELD_ID);
        expect(value).toEqual(VALUE);
      });
      it('should handle null data', () => {
        const FIELD_ID = 'field.nested';
        const value = getSourceData(null, FIELD_ID);
        expect(value).toBeUndefined();
      });
      it('should handle undefined data', () => {
        const FIELD_ID = 'field.nested';
        const value = getSourceData(undefined, FIELD_ID);
        expect(value).toBeUndefined();
      });
      it('should handle missing value', () => {
        const FIELD_ID = 'field.nested';
        const VALUE = 'other value';
        const DATA = { field: { other: VALUE } };
        const value = getSourceData(DATA, FIELD_ID);
        expect(value).toBeUndefined();
      });
      it('should handle null fieldId', () => {
        const VALUE = 'value';
        const DATA = { field: VALUE };
        const value = getSourceData(DATA, null);
        expect(value).toBeUndefined();
      });
      it('should handle undefined fieldId', () => {
        const VALUE = 'value';
        const DATA = { field: VALUE };
        const value = getSourceData(DATA, undefined);
        expect(value).toBeUndefined();
      });
      it('should handle empty fieldId', () => {
        const VALUE = 'value';
        const DATA = { field: VALUE };
        const value = getSourceData(DATA, '');
        expect(value).toBeUndefined();
      });
      it('should handle fieldId with trailing dot', () => {
        const FIELD_ID = 'field.';
        const VALUE = 'value';
        const DATA = { field: VALUE };
        const value = getSourceData(DATA, FIELD_ID);
        expect(value).toBeUndefined();
      });
      it('should handle fieldId with leading dot', () => {
        const FIELD_ID = '.field';
        const VALUE = 'value';
        const DATA = { field: VALUE };
        const value = getSourceData(DATA, FIELD_ID);
        expect(value).toBeUndefined();
      });
      it('should handle fieldId that is just a dot', () => {
        const FIELD_ID = '.';
        const VALUE = 'value';
        const DATA = { field: VALUE };
        const value = getSourceData(DATA, FIELD_ID);
        expect(value).toBeUndefined();
      });
    });

  });

});
