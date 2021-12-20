// Local imports
import refDataToOptions from './refDataToOptions';

describe('utils', () => {

  describe('Data', () => {

    describe('refDataToOptions', () => {

      it('can handle a null refData', () => {
        expect(refDataToOptions(null)).toEqual([]);
      });

      it('can handle an undefined refData', () => {
        expect(refDataToOptions(undefined)).toEqual([]);
      });

      it('can handle genuine refData', () => {
        const REF_DATA = [
          { id: 'a', name: 'Alpha' },
          { id: 'b', name: 'Bravo' },
          { id: 'c', name: 'Charlie' },
        ];
        expect(refDataToOptions(REF_DATA)).toEqual([
          { id: 'a', name: 'Alpha', value: 'a', label: 'Alpha' },
          { id: 'b', name: 'Bravo', value: 'b', label: 'Bravo' },
          { id: 'c', name: 'Charlie', value: 'c', label: 'Charlie' },
        ]);
      });

      it('can handle refData that is already in a usable options format', () => {
        const REF_DATA = [
          { value: 'a', label: 'Alpha' },
          { value: 'b', label: 'Bravo' },
          { value: 'c', label: 'Charlie' },
        ];
        expect(refDataToOptions(REF_DATA)).toEqual([
          { value: 'a', label: 'Alpha' },
          { value: 'b', label: 'Bravo' },
          { value: 'c', label: 'Charlie' },
        ]);
      });

      it('can handle refData that is in a mixed format', () => {
        const REF_DATA = [
          { id: 'a', name: 'Alpha', type: 'Delta' },
          { value: 'b', label: 'Bravo' },
          { id: 'c', name: 'Charlie', type: 'Delta' },
        ];
        expect(refDataToOptions(REF_DATA)).toEqual([
          { id: 'a', name: 'Alpha', value: 'a', label: 'Alpha', type: 'Delta' },
          { value: 'b', label: 'Bravo' },
          { id: 'c', name: 'Charlie', value: 'c', label: 'Charlie', type: 'Delta' },
        ]);
      });

    });

  });

});
