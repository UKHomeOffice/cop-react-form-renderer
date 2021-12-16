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

      it('should get any specified options from the data property of the config', () => {
        const CONFIG = {
          data: {
            options: [
              { value: 'a', label: 'Alpha' },
              { value: 'b', label: 'Bravo' }
            ]
          }
        };
        getOptions(CONFIG, (options) => {
          expect(options).toEqual(CONFIG.data.options);
        });
      });

      it('should use the top-level options over those in the data property', () => {
        const CONFIG = {
          options: [
            { value: 'a', label: 'Alpha' },
            { value: 'b', label: 'Bravo' }
          ],
          data: {
            options: [
              { value: 'c', label: 'Charlie' },
              { value: 'd', label: 'Delta' }
            ]
          }
        };
        getOptions(CONFIG, (options) => {
          expect(options).toEqual(CONFIG.options);
        });
      });

    });

  });

});
