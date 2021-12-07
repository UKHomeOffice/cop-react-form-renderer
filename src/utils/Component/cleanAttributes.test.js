// Local imports
import cleanAttributes, { JSON_ONLY_PROPERTIES } from './cleanAttributes';

describe('utils', () => {

  describe('Component', () => {

    describe('clean', () => {

      it('should handle null options', () => {
        expect(cleanAttributes(null)).toEqual({});
      });

      it('should handle undefined options', () => {
        expect(cleanAttributes(undefined)).toEqual({});
      });

      it('should handle empty options', () => {
        expect(cleanAttributes({})).toEqual({});
      });

      it('should handle a non-object options', () => {
        expect(cleanAttributes(23)).toEqual({});
      });

      it('should only remove properties specific to JSON', () => {
        const OPTIONS = { id: 'bob' };
        // Add a bunch of properties we know will need to be removed.
        JSON_ONLY_PROPERTIES.forEach(p => OPTIONS[p] = 'value');
        const RESULT = cleanAttributes(OPTIONS);

        // The original options should remain untouched.
        expect(OPTIONS.id).toEqual('bob');
        expect(OPTIONS['source']).toEqual('value');

        // But those values should have been removed from the result,
        // which means it should simply have an id of 'bob'.
        expect(RESULT).toEqual({ id: 'bob' });
      });

      it('should also remove properties specified in the alsoRemove parameter', () => {
        const OPTIONS = { id: 'bob', fieldId: 'bobField' };
        // Add a bunch of properties we know will need to be removed.
        JSON_ONLY_PROPERTIES.forEach(p => OPTIONS[p] = 'value');
        const RESULT = cleanAttributes(OPTIONS, ['fieldId']);

        // The original options should remain untouched.
        expect(OPTIONS.id).toEqual('bob');
        expect(OPTIONS.fieldId).toEqual('bobField');
        expect(OPTIONS['source']).toEqual('value');

        // But those values should have been removed from the result,
        // which means it should simply have an id of 'bob'.
        expect(RESULT).toEqual({ id: 'bob' });
      });
    });
      
  });
  
});
