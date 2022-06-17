// Local imports
import meetsOneCondition from './meetsOneCondition';

describe('utils.Condition.meetsOneCondition', () => {
  const DATA = { alpha: 'bravo', charlie: 'delta' };

  it('should evaluate to true when conditions are null', () => {
      expect(meetsOneCondition(null, DATA)).toBeTruthy();
  });

  it('should evaluate to true when conditions are undefined', () => {
    expect(meetsOneCondition(undefined, DATA)).toBeTruthy();
  });

  it('should evaluate to true when conditions is an empty array', () => {
    const CONDITION = {
      "type": "or",
      "conditions": []
    }
    expect(meetsOneCondition(CONDITION, DATA)).toBeTruthy();
  });

  it('should evaluate to true when one condition is provided and one condition is met', () => {
    const CONDITION = {
      "type": "or",
      "conditions": [
        { field: 'alpha', op: 'eq', value: 'bravo' }         
      ]
    }
    expect(meetsOneCondition(CONDITION, DATA)).toBeTruthy();
  });

  it('should evaluate to true when two conditions are provided and one condition is met', () => {
    const CONDITION = {
      "type": "or",
      "conditions": [
        { field: 'alpha', op: 'eq', value: 'bravo' },
        { field: 'alpha', op: 'eq', value: "charlie"}       
      ]
    }
    expect(meetsOneCondition(CONDITION, DATA)).toBeTruthy();
  });

  it('should evaluate to true when three conditions are provided and two conditions are met', () => {
    const CONDITION = {
      "type": "or",
      "conditions": [
        { field: 'alpha', op: 'eq', value: 'bravo' },
        { field: 'charlie', op: 'eq', value: 'delta' },
        { field: 'alpha', op: 'eq', value: "charlie"}       
      ]
    }
    expect(meetsOneCondition(CONDITION, DATA)).toBeTruthy();
  });

  it('should evaluate to true when all conditions are met', () => {
    const CONDITION = {
      "type": "or",
      "conditions": [
        { field: 'alpha', op: 'eq', value: 'bravo' },
        { field: 'charlie', op: 'eq', value: 'delta' }     
      ]
    }
    expect(meetsOneCondition(CONDITION, DATA)).toBeTruthy();
  });

  it('should evaluate to false when no conditions are met', () => {
    const CONDITION = {
      "type": "or",
      "conditions": [
        { field: 'alpha', op: 'eq', value: 'delta' },
        { field: 'charlie', op: 'eq', value: 'bravo' }     
      ]
    }
    expect(meetsOneCondition(CONDITION, DATA)).toBeTruthy();
  });
  
});