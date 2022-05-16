import setDataItem from './setDataItem';

describe('utils.Data.setDataItem', () => {

  it('should handle a null data object', () => {
    const DATA = null;
    const FIELD_ID = 'alpha.bravo.charlie';
    const VALUE = 'delta';
    expect(setDataItem(DATA, FIELD_ID, VALUE)).toBeNull();
    expect(DATA).toBeNull();
  });

  it('should handle an undefined data object', () => {
    const DATA = undefined;
    const FIELD_ID = 'alpha.bravo.charlie';
    const VALUE = 'delta';
    expect(setDataItem(DATA, FIELD_ID, VALUE)).toBeUndefined();
    expect(DATA).toBeUndefined();
  });

  it('should handle a null fieldId', () => {
    const DATA = {};
    const FIELD_ID = null;
    const VALUE = 'delta';
    expect(setDataItem(DATA, FIELD_ID, VALUE)).toMatchObject({});
    expect(DATA).toMatchObject({});
  });

  it('should handle an undefined fieldId', () => {
    const DATA = {};
    const FIELD_ID = undefined;
    const VALUE = 'delta';
    expect(setDataItem(DATA, FIELD_ID, VALUE)).toMatchObject({});
    expect(DATA).toMatchObject({});
  });

  it('should handle an empty fieldId', () => {
    const DATA = {};
    const FIELD_ID = '';
    const VALUE = 'delta';
    expect(setDataItem(DATA, FIELD_ID, VALUE)).toMatchObject({});
    expect(DATA).toMatchObject({});
  });

  it('should appropriately set a nested value', () => {
    const DATA = { alpha: {} };
    const FIELD_ID = 'alpha.bravo.charlie';
    const VALUE = 'delta';
    expect(setDataItem(DATA, FIELD_ID, VALUE)).toMatchObject({
      alpha: {
        bravo: {
          charlie: VALUE
        }
      }
    });
    expect(DATA).toMatchObject({
      alpha: {
        bravo: {
          charlie: VALUE
        }
      }
    });
  });

  it('should appropriately change a nested value', () => {
    const DATA = { alpha: { bravo: { charlie: 'echo' } } };
    const FIELD_ID = 'alpha.bravo.charlie';
    const VALUE = 'delta';
    expect(setDataItem(DATA, FIELD_ID, VALUE)).toMatchObject({
      alpha: {
        bravo: {
          charlie: VALUE
        }
      }
    });
    expect(DATA).toMatchObject({
      alpha: {
        bravo: {
          charlie: VALUE
        }
      }
    });
  });

  it('should handle a parent node that is not an object and convert it appropriately', () => {
    const DATA = { alpha: { bravo: 'echo' } };
    const FIELD_ID = 'alpha.bravo.charlie';
    const VALUE = 'delta';
    expect(setDataItem(DATA, FIELD_ID, VALUE)).toMatchObject({
      alpha: {
        bravo: {
          charlie: VALUE
        }
      }
    });
    expect(DATA).toMatchObject({
      alpha: {
        bravo: {
          charlie: VALUE
        }
      }
    });
  });

});
