// Local imports
import applyFormula from './applyFormula';

describe('utils.Data.applyFormula', () => {

  const error = jest.spyOn(console, 'error').mockImplementation(() => {});
  afterAll(() => {
    error.mockReset();
  });
  afterEach(() => {
    error.mockClear();
  });

  it('should throw and handle exception for a null config', () => {
    applyFormula(null);
    expect(error).toBeCalledWith(`Missing 'formula' definition`);
  });

  it(`should throw and handle exception for config with missing 'formula'`, () => {
    applyFormula({})
    expect(error).toBeCalledWith(`Missing 'formula' definition`);
  });

  it(`should throw and handle exception for config with 'formula' but missing 'name'`, () => {
    applyFormula({ formula: {} })
    expect(error).toBeCalledWith(`Calculation formula 'name' cannot be empty`);
  });

  it(`should throw and handle exception for config with 'formula' with unsupported operation 'name'`, () => {
    applyFormula({ formula: { name: `something` } });
    expect(error).toBeCalledWith(`Unsupported operation 'something'`);
  });

  it(`should throw and handle exception for 'formula' with wrong argument name`, () => {
    applyFormula({ formula: { name: 'plus', args: [{ somthing: 1 },{ somthing: 1 }]}});
    expect(error).toBeCalledWith('Only accept following as argument field: {field, value, or formula}');
  });

  it(`should throw and handle exception for 'formula' argument with more than one field`, () => {
    applyFormula({ formula: { name: 'plus', args: [{ value: 1, field: 'fieldA' },{ value: 1 }]}});
    expect(error).toBeCalledWith('Argument cannot have more than one reference');
  });

  it(`should throw and handle exception for 'formula' with single argument`, () => {
    applyFormula({ formula: { name: 'plus',args: [{ value: 10 }]}})
    expect(error).toBeCalledWith('Requires more than one argument for calculation');
  });

  const DATA = {fieldA: '10', fieldB: '20', fieldC: 'abc', fieldD: '0', fieldE: '10'};
  [ 
    { name: 'plus', args:[{ field: 'fieldA' },{ field: 'fieldB' }], result: 30 },
    { name: 'minus', args:[{ field: 'fieldB' },{ field: 'fieldA' }], result: 10 },
    { name: 'multiply', args:[{ field: 'fieldA' },{ field: 'fieldB' }], result: 200 },
    { name: 'divide', args:[{ field: 'fieldA' },{ field: 'fieldB' }], result: 0.5 },
    { name: 'divide', args:[{ field: 'fieldA' },{ field: 'fieldD' }], result: Infinity },
    { name: 'plus', args:[{ field: 'fieldA' },{ field: 'fieldC' }], result: '' },
    { name: 'multiply', args:[
      { field: 'fieldA' },{ field: 'fieldB' }, { field: 'fieldE' }
    ], result: 2000}
  ].forEach(test => {
    it(`should calculate formula '${test.name}' correctly for field args to '${test.result}'`, () => {
      const config = { formData: DATA, formula: { name: test.name, args: test.args }};
      expect(applyFormula(config)).toEqual(test.result);
    });
  });

  [
    {fieldA: '1', fieldB: '3', round: 5, result: 0.33333},
    {fieldA: '2', fieldB: '3', round: 5, result: 0.66667},
    {fieldA: '1', fieldB: '3', round: 4, result: 0.3333},
    {fieldA: '2', fieldB: '3', round: 4, result: 0.6667},
    {fieldA: '1', fieldB: '3', round: 3, result: 0.333},
    {fieldA: '2', fieldB: '3', round: 3, result: 0.667},
    {fieldA: '1', fieldB: '3', round: 2, result: 0.33},
    {fieldA: '2', fieldB: '3', round: 2, result: 0.67},
    {fieldA: '1', fieldB: '3', round: 1, result: 0.3},
    {fieldA: '2', fieldB: '3', round: 1, result: 0.7},
    {fieldA: '1', fieldB: '3', round: 0, result: 0},
    {fieldA: '2', fieldB: '3', round: 0, result: 0},
    {fieldA: 'L', fieldB: 'G3', round: 1, result: ''}
  ].forEach(test => {
    it(`should calculdate and round result to precision ${test.round}`, () => {
      const config = { 
        formData: {
          fieldA: test.fieldA,
          fieldB: test.fieldB
        }, 
        formula: { 
          name: 'divide',
          round: test.round,  
          args: [{field: 'fieldA'},{field: 'fieldB'}]
        }
      };
      expect(applyFormula(config)).toEqual(test.result);
    });
  });

  it(`should calculate nested 'formula'`, () => {
    const config = {
      formData: {
        fieldA: '19',
        fieldB: '66'
      },
      formula: { 
        name: 'multiply',
        round: 2,
        args: [
          { 
            formula: {
              name: 'divide',
              round: 4,
              args: [
                { field: 'fieldA' },
                { field: 'fieldB' },
              ]
            }
          },
          { value: 100 }
        ]
      }
    };
    expect(applyFormula(config)).toEqual(28.79);
  });
});
