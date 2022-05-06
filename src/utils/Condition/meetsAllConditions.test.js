// Local imports
import meetsAllConditions from './meetsAllConditions';

describe('utils.Condition.meetsAllConditions', () => {
  const DATA = { alpha: 'bravo', charlie: 'delta' };

  it('should evaluate to true when conditions are null', () => {
    expect(meetsAllConditions(null, DATA)).toBeTruthy();
  });

  it('should evaluate to true when conditions are undefined', () => {
    expect(meetsAllConditions(undefined, DATA)).toBeTruthy();
  });

  it('should evaluate to true when conditions is an empty array', () => {
    expect(meetsAllConditions([], DATA)).toBeTruthy();
  });

  it('should evaluate to true when a single condition is met', () => {
    const CONDITION = { field: 'alpha', op: 'eq', value: 'bravo' };
    expect(meetsAllConditions(CONDITION, DATA)).toBeTruthy();
  });

  it('should evaluate to false when a single condition is not met', () => {
    const CONDITION = { field: 'alpha', op: 'ne', value: 'bravo' };
    expect(meetsAllConditions(CONDITION, DATA)).toBeFalsy();
  });

  it('should evaluate to true when all conditions are met', () => {
    const CONDITIONS = [
      { field: 'alpha', op: 'eq', value: 'bravo' },
      { field: 'charlie', op: 'eq', value: 'delta' },
    ];
    expect(meetsAllConditions(CONDITIONS, DATA)).toBeTruthy();
  });

  it('should evaluate to false when one of the conditions is not met', () => {
    const CONDITIONS = [
      { field: 'alpha', op: 'eq', value: 'bravo' },
      { field: 'charlie', op: 'eq', value: 'echo' },
    ];
    expect(meetsAllConditions(CONDITIONS, DATA)).toBeFalsy();
  });

});
