// Global imports
import { getAllByTestId, render } from '@testing-library/react';

// Local imports
import { ComponentTypes } from '../../../models';
import getComponent from '../getComponent';

describe('utils.Component.get', () => {
  const ID = 'test-id';
  const FIELD_ID = 'field-id';
  const LABEL = 'label';
  const COMPONENT = {
    type: ComponentTypes.CALCULATION,
    id: ID,
    fieldId: FIELD_ID,
    label: LABEL,
    formData: { totalPerson: '4', personProcessed: '3' },
    'data-testid': ID,
  };
  const error = jest.spyOn(console, 'error').mockImplementation(() => {});
  afterAll(() => {
    error.mockReset();
  })
  afterEach(() => {
    error.mockClear();
  });


  /**
   * Iteratively test collction of positive test data objects each containing:
   *  config: object containing formula config
   *  result: the calculated formula(s) output value.
   *
   * Test record structure:
   * ----------------------
   * {
   *  config: {
   *    formula: { ... }
   *  },
   *  result: ''
   * }
   * 
   */
  [
    { 
      config: {
        formula: { name: 'minus', args: [
          { field: 'totalPerson' }, { field: 'personProcessed' }
        ]}
      },
      result: '1'
    },
    { 
      config: {
        formula: { name: 'plus', args: [
          { field: 'totalPerson' }, { field: 'personProcessed' }
        ]}
      },
      result: '7'
    },
    { 
      config: {
        formula: { name: 'multiply', args: [
          { field: 'totalPerson' }, { field: 'personProcessed' }
        ]}
      },
      result: '12'
    },
    { 
      config: {
        formula: { name: 'divide', round: 2, args: [
          { field: 'totalPerson' }, { field: 'personProcessed' }
        ]}
      },
      result: '1.33'
    },
    { 
      config: {
        formula: { name: 'multiply', round: 2, args: [
          { 
            formula: { name: 'divide', args: [
              { field: 'totalPerson' }, { field: 'personProcessed' }
            ]}
          },
          { value: 200 }
        ]}
      },
      result: '266.67'
    }
  ].forEach(test => {
    
    it(`should render 'calculation' component with formula to given calculated value: ${test.result}`, () => {
      const { container } = render(getComponent({...COMPONENT, ...test.config}));
      const [ formGroup, input ] = getAllByTestId(container, ID);
      expect(formGroup.tagName).toEqual('DIV');
      expect(formGroup.classList).toContain('govuk-form-group');
      const label = formGroup.childNodes[0];
      expect(label.tagName).toEqual('LABEL');
      expect(label.classList).toContain('govuk-label');
      expect(label.textContent).toContain(LABEL);
      expect(formGroup.classList).toContain('govuk-form-group');
      expect(input.tagName).toEqual('INPUT');
      expect(input.classList).toContain('govuk-input');
      expect(input.id).toEqual(ID);
      expect(input.getAttribute('readonly')).not.toBeNull();
      expect(input.getAttribute('value')).toEqual(test.result);
    });
  });

  /**
   * Iteratively test collction of negative test data objects each containing:
   *  config: object containing invalid formula config
   *  result: the error to match.
   *
   * Test record structure:
   * ----------------------
   * {
   *  config: {
   *    formula: { ... }
   *  },
   *  error: 'error_message'
   * }
   * 
   */
  [
    {
      error: `Missing 'formula' definition`
    },
    {
      config: { formula: {} },
      error: `Calculation formula 'name' cannot be empty`
    },
    {
      config: { formula: { name: 'tictactoe', args: [ { field: 'totalPerson' }, { field: 'personProcessed' }]}},
      error: `Unsupported operation 'tictactoe'`
    },
    { 
      config: { formula: { name: 'minus', args: [ { field: 'totalPerson', value: 100 }, { field: 'personProcessed' }]}},
      error: 'Argument cannot have more than one reference'
    },
    { 
      config: { formula: { name: 'minus', args: [ { newToken: 'totalPerson' }, { field: 'personProcessed' }]}},
      error: 'Only accept following as argument field: {field, value, or formula}'
    },
    { 
      config: { formula: { name: 'minus', args: [ { field: 'totalPerson' }]}},
      error: 'Requires more than one argument for calculation'
    },
    { 
      config: { formula: { name: 'multiply', round: 2, args: [
        {
          value: 200, field: 'totalPerson'
        },
        { value: 200 }
      ]}},
      error: 'Argument cannot have more than one reference'
    }
  ].forEach(test => {
    
    it(`should return an appropriately rendered calculation component with message ${test.result}`, () => {
      const { container } = render(getComponent({...COMPONENT, ...test.config}));
      const [ formGroup, input ] = getAllByTestId(container, ID);
      expect(formGroup.tagName).toEqual('DIV');
      expect(formGroup.classList).toContain('govuk-form-group');
      const label = formGroup.childNodes[0];
      expect(label.tagName).toEqual('LABEL');
      expect(label.classList).toContain('govuk-label');
      expect(label.textContent).toContain(LABEL);
      expect(formGroup.classList).toContain('govuk-form-group');
      expect(input.tagName).toEqual('INPUT');
      expect(input.classList).toContain('govuk-input');
      expect(input.id).toEqual(ID);
      expect(input.getAttribute('readonly')).not.toBeNull();
      expect(error).toBeCalledTimes(1);
      expect(error).toBeCalledWith(test.error);
    });
  });


});
