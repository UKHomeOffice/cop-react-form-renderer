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
    formData: { totalPerson: "4", personProcessed: "3" },
    'data-testid': ID,
  };

  [
    { 
      config: { formula: { name: "minus", args: [ 
        { field: "totalPerson" }, { field: 'personProcessed' }
      ]}},
      result: "1"
    },
    { 
      config: { formula: { name: "plus", args: [ 
        { field: "totalPerson" }, { field: 'personProcessed' }
      ]}},
      result: "7"
    },
    { 
      config: { formula: { name: "multiply", args: [ 
        { field: "totalPerson" }, { field: 'personProcessed' }
      ]}},
      result: "12"
    },
    { 
      config: { formula: { name: "divide", round: 2, args: [ 
        { field: "totalPerson" }, { field: 'personProcessed' }
      ]}},
      result: "1.33"
    },
    { 
      config: { formula: { name: "multiply", round: 2, args: [ 
        { 
          formula: { name: "divide", args: [{ field: "totalPerson" }, { field: 'personProcessed' }]}
        },
        { value: 200 }
      ]}},
      result: "266.67"
    },
    {
      config: { },
      result: "Missing 'formula' definition"
    },
    {
      config: { formula: { name: "tictactoe", args: [ { field: "totalPerson" }, { field: 'personProcessed' }]}},
      result: "Unsupported operation 'tictactoe'"
    },
    { 
      config: { formula: { name: "minus", args: [ { field: "totalPerson", value: 100 }, { field: 'personProcessed' }]}},
      result: "Argument cannot have more than one reference"
    },
    { 
      config: { formula: { name: "minus", args: [ { newToken: "totalPerson" }, { field: 'personProcessed' }]}},
      result: "Only accept following as argument field: {field, value, or formula}"
    },
    { 
      config: { formula: { name: "minus", args: [ { field: "totalPerson" }]}},
      result: "Requires more than one argument for calculation"
    },
    { 
      config: { formula: { name: "multiply", round: 2, args: [ 
        { 
          value: 200, field: "totalPerson"
        },
        { value: 200 }
      ]}},
      result: "Argument cannot have more than one reference"
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
      expect(input.getAttribute('value')).toEqual(test.result);
    });
  })

});
