// Global imports
import { getAllByTestId, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
// Local imports
import { getNestedComponent } from '../getComponent';

describe('utils.Component.get', () => {
      
  it('should return a component that is nested within another component', () => {
    const ID = 'testId';
    const FIELD_ID = 'fieldId';
    const LABEL = 'Test label';
    const VALUE = 'nestedValue';
    const PARENT_CONFIG = {
        onChange: () => {},
        formData: {
            [FIELD_ID]: VALUE
        }
    };
    const NESTED_CONFIG = {
        nested: {
            id: ID,
            fieldId: FIELD_ID,
            label: LABEL,
            type: 'text'
        }
    };

    const { container } = render(getNestedComponent(PARENT_CONFIG, NESTED_CONFIG));
    const child = container.childNodes[0];
    expect(child.classList).toContain('govuk-form-group');

    const label = child.childNodes[0];
    expect(label).toBeDefined();
    expect(label.innerHTML).toContain(LABEL);

    const input = child.childNodes[1];
    expect(input.tagName).toEqual('INPUT');
    expect(input.classList).toContain('govuk-input');
    expect(input.id).toEqual(ID);
    console.log(input)
    expect(input.textContent).toContain(VALUE);

  });

});
