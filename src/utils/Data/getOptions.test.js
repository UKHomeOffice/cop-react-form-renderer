// Local imports
import getOptions from './getOptions';

describe('utils', () => {

  describe('Data', () => {

    describe('getOptions', () => {

      it('should handle a null config', () => {
        getOptions(null, (options) => {
          expect(options).toEqual([]);
        });
      });

      it('should get any specified options from the config', () => {
        const CONFIG = {
          options: [
            { value: 'a', label: 'Alpha' },
            { value: 'b', label: 'Bravo' }
          ]
        };
        getOptions(CONFIG, (options) => {
          expect(options).toEqual(CONFIG.options);
        });
      });

      it('should get options by URL if specified', () => {
        const CONFIG = {
          url: '/grade'
        };
        getOptions(CONFIG, (options) => {
          expect(Array.isArray(options)).toBeTruthy();
          expect(options.length).toBeGreaterThan(0);
        });
      });

      it('should handle unknown reference data url', () => {
        const CONFIG = {
          url: '/unknown'
        };
        getOptions(CONFIG, (options) => {
          expect(Array.isArray(options)).toBeTruthy();
          expect(options.length).toEqual(0);
        });
      });

      it('should prefer specified options over a URL', () => {
        const CONFIG = {
          url: '/grade',
          options: [
            { value: 'a', label: 'Alpha' },
            { value: 'b', label: 'Bravo' }
          ]
        };
        getOptions(CONFIG, (options) => {
          expect(options).toEqual(CONFIG.options);
        });
      });

    });

  });

});
