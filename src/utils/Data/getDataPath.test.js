import getDataPath from './getDataPath';

describe('utils.Data.getDataPath', () => {

  const CURRENT_PATH = 'this.is.the.current.path';
  const RELATIVE = 'relative.path';
  const ABSOLUTE = 'absolute.path';

  const doTest = (path, currentPath, expected) => {
    expect(getDataPath(path, currentPath)).toEqual(expected);
  };

  it(`should return an absolute path appropriately`, () => {
    doTest(ABSOLUTE, CURRENT_PATH, ABSOLUTE);
  });

  it(`should return an absolute path appropriately where the current path is null`, () => {
    doTest(ABSOLUTE, null, ABSOLUTE);
  });

  [
    { p: `./${RELATIVE}`, e: `this.is.the.current.${RELATIVE}`, d: 'a sibling node' },
    { p: `../${RELATIVE}`, e: `this.is.the.${RELATIVE}`, d: 'a cousin node' },
    { p: `./../${RELATIVE}`, e: `this.is.the.${RELATIVE}`, d: 'a cousin node with leading dot-slash' },
    { p: `../../../../../../../${RELATIVE}`, e: RELATIVE, d: 'an inappropriately nested node' }
  ].forEach(test => {

    it(`should return ${test.d} appropriately`, () => {
      doTest(test.p, CURRENT_PATH, test.e);
    });

    it(`should return ${test.d} appropriately where the current path is null`, () => {
      doTest(test.p, null, RELATIVE);
    });

  });

  it('should handle a null path and return null', () => {
    doTest(null, CURRENT_PATH, null);
  });

  it('should handle an undefined path and return undefined', () => {
    doTest(undefined, CURRENT_PATH, undefined);
  });

});
