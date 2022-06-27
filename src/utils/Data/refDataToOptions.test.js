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

      it('can handle refData that contains strings and objects', () => {
        const REF_DATA = [
          { id: 'a', name: 'Alpha', type: 'Delta' },
          { value: 'b', label: 'Bravo' },
          'Charlie',
          { id: 'd', name: 'Delta', type: 'Delta' },
        ];
        expect(refDataToOptions(REF_DATA)).toEqual([
          { id: 'a', name: 'Alpha', value: 'a', label: 'Alpha', type: 'Delta' },
          { value: 'b', label: 'Bravo' },
          'Charlie',
          { id: 'd', name: 'Delta', value: 'd', label: 'Delta', type: 'Delta' },
        ]);
      });

      it('can handle refData with custom value and label properties', () => {
        const REF_DATA = [
          { id: 1, displayName: 'Alpha' },
          { id: 2, displayName: 'Bravo' },
          { id: 3, displayName: 'Charlie' }
        ];
        const ITEM_STRUCTURE = { value: 'id', label: 'displayName' };
        expect(refDataToOptions(REF_DATA, ITEM_STRUCTURE)).toEqual([
          { id: 1, displayName: 'Alpha', value: '1', label: 'Alpha' },
          { id: 2, displayName: 'Bravo', value: '2', label: 'Bravo' },
          { id: 3, displayName: 'Charlie', value: '3', label: 'Charlie' }
        ]);
      });

      it('can handle refData with missing custom value and label properties', () => {
        const REF_DATA = [
          { id: 1, name: 'Alpha' },
          { id: 2, name: 'Bravo', displayName: 'Bravo Zulu' },
          { id: 3, objId: 'chaz', name: 'Charlie' }
        ];
        const ITEM_STRUCTURE = { value: 'objId', label: 'displayName' };
        expect(refDataToOptions(REF_DATA, ITEM_STRUCTURE)).toEqual([
          { id: 1, name: 'Alpha', value: '1', label: 'Alpha' },
          { id: 2, name: 'Bravo', displayName: 'Bravo Zulu', value: '2', label: 'Bravo Zulu' },
          { id: 3, objId: 'chaz', name: 'Charlie', value: 'chaz', label: 'Charlie' }
        ]);
      });

    });

  });

});
