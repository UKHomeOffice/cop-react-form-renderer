import setupConditions from './setupConditions';

describe('utils.Condition.setupConditions', () => {

  it('should return an array of conditions directly', () => {
    const OPTIONS = [
      { field: 'alpha', op: '=', value: 'ALPHA' }
    ];
    expect(setupConditions(OPTIONS)).toEqual(OPTIONS);
  });

  it('should return a condition directly', () => {
    const OPTIONS = { field: 'alpha', op: '=', value: 'ALPHA' };
    expect(setupConditions(OPTIONS)).toEqual(OPTIONS);
  });

  it('should return the options on a component with untouched absolute path fields', () => {
    const OPTIONS = {
      id: 'field',
      show_when: { field: 'alpha', op: '=', value: 'ALPHA' }
    };
    expect(setupConditions(OPTIONS)).toEqual([OPTIONS.show_when]);
  });

});
