// Local imports
import formatData from './formatData';

describe('utils', () => {

  describe('Format', () => {

    describe('formatData', () => {

      it('should handle no format', () => {
        const FORMAT = null;
        const VALUE = 'AlPhA';
        expect(formatData(FORMAT, VALUE)).toEqual(VALUE);
      });

      it('should handle no value', () => {
        const FORMAT = { type: 'lowercase' };
        const VALUE = null;
        expect(formatData(FORMAT, VALUE)).toBeNull();
      });

      it('should format a string as lowercase', () => {
        const FORMAT = { type: 'lowercase' };
        const VALUE = 'AlPhA';
        expect(formatData(FORMAT, VALUE)).toEqual('alpha');
      });

      it('should format a string as uppercase', () => {
        const FORMAT = { type: 'uppercase' };
        const VALUE = 'AlPhA';
        expect(formatData(FORMAT, VALUE)).toEqual('ALPHA');
      });

      it('should leave an unknown format type alone', () => {
        const FORMAT = { type: 'not-a-real-type' };
        const VALUE = 'AlPhA';
        expect(formatData(FORMAT, VALUE)).toEqual(VALUE);
      });

    });

  });

});
