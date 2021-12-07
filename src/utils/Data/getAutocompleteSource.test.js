// Local imports
import getAutocompleteSource from './getAutocompleteSource';

describe('utils', () => {

  describe('Data', () => {

    describe('getAutocompleteSource', () => {

      it('should handle a null config', () => {
        const SOURCE = getAutocompleteSource(null);
        expect(typeof SOURCE === 'function').toBeTruthy();
        SOURCE('query', (results) => {
          expect(Array.isArray(results)).toBeTruthy();
          expect(results.length).toEqual(0);
        });
      });

      it('should get any specified options from the config', () => {
        const CONFIG = {
          data: {
            options: [
              { value: 'a', label: 'Alpha' },
              { value: 'b', label: 'Bravo' }
            ]
          }
        };
        const SOURCE = getAutocompleteSource(CONFIG);
        expect(typeof SOURCE === 'function').toBeTruthy();
        SOURCE('a', (results) => {
          expect(results.length).toEqual(2);
          expect(results).toEqual([
            { value: 'a', label: 'Alpha' },
            { value: 'b', label: 'Bravo' }
          ]);
        });
        SOURCE('al', (results) => {
          expect(results.length).toEqual(1);
          expect(results).toEqual([
            { value: 'a', label: 'Alpha' }
          ]);
        });
      });

      it('should handle an empty query', () => {
        const CONFIG = {
          data: {
            options: [
              { value: 'a', label: 'Alpha' },
              { value: 'b', label: 'Bravo' }
            ]
          }
        };
        const SOURCE = getAutocompleteSource(CONFIG);
        SOURCE('', (results) => {
          expect(results.length).toEqual(2);
          expect(results).toEqual([
            { value: 'a', label: 'Alpha' },
            { value: 'b', label: 'Bravo' }
          ]);
        });
      });

      it('should handle an undefined query', () => {
        const CONFIG = {
          data: {
            options: [
              { value: 'a', label: 'Alpha' },
              { value: 'b', label: 'Bravo' }
            ]
          }
        };
        const SOURCE = getAutocompleteSource(CONFIG);
        SOURCE(undefined, (results) => {
          expect(results.length).toEqual(2);
          expect(results).toEqual([
            { value: 'a', label: 'Alpha' },
            { value: 'b', label: 'Bravo' }
          ]);
        });
      });

      it('should handle a null query', () => {
        const CONFIG = {
          data: {
            options: [
              { value: 'a', label: 'Alpha' },
              { value: 'b', label: 'Bravo' }
            ]
          }
        };
        const SOURCE = getAutocompleteSource(CONFIG);
        SOURCE(null, (results) => {
          expect(results.length).toEqual(2);
          expect(results).toEqual([
            { value: 'a', label: 'Alpha' },
            { value: 'b', label: 'Bravo' }
          ]);
        });
      });

      it('should get options by url from the config', () => {
        const CONFIG = {
          data: {
            url: '/grade'
          }
        };
        const SOURCE = getAutocompleteSource(CONFIG);
        expect(typeof SOURCE === 'function').toBeTruthy();
        SOURCE('SCS2', (results) => {
          expect(results.length).toEqual(1);
          expect(results[0].label).toEqual('Senior Director / SCS2');
        });
        SOURCE('SCS', (results) => {
          expect(results.length).toEqual(4);
        });
      });

    });

  });

});
