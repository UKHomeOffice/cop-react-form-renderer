import Data from '.';

describe('utils', () => {

  describe('Data', () => {

    describe('refData', () => {

      describe('get', () => {

        it('should return grade items appropriately', () => {
          const URL = 'http://www.reference-data.com/grade';
          const GRADE = Data.refData.get(URL);
          expect(GRADE).toBeDefined();
          expect(Array.isArray(GRADE)).toBeTruthy();
          expect(GRADE.length).toBeGreaterThan(0);
        });

        it('should return an empty array for unknown reference data', () => {
          const URL = 'http://www.reference-data.com/unknown';
          const UNKNOWN = Data.refData.get(URL);
          expect(UNKNOWN).toBeDefined();
          expect(Array.isArray(UNKNOWN)).toBeTruthy();
          expect(UNKNOWN.length).toEqual(0);
        });

      });

      describe('getItemName', () => {

        it('should return a grade item by id appropriately', () => {
          const URL = 'http://www.reference-data.com/grade';
          const ID = '1b041cda-b151-4769-b76a-d42d67b0b960';
          const ITEM_NAME = Data.refData.getItemName(URL, ID);
          expect(ITEM_NAME).toEqual('Senior Director / SCS2');
        });

        it('should return an empty string for an unrecognised grade ID', () => {
          const URL = 'http://www.reference-data.com/grade';
          const ID = 'not-a-grade-id';
          const ITEM_NAME = Data.refData.getItemName(URL, ID);
          expect(ITEM_NAME).toEqual('');
        });

        it('should return an empty string for unknown reference data', () => {
          const URL = 'http://www.reference-data.com/unknown';
          const ID = '1b041cda-b151-4769-b76a-d42d67b0b960';
          const ITEM_NAME = Data.refData.getItemName(URL, ID);
          expect(ITEM_NAME).toEqual('');
        });

      });

    });

  });

});
