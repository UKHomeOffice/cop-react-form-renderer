// Global imports
import { render } from '@testing-library/react';
// Local imports
import { getNestedComponent } from '../getComponent';

describe('utils.Component.get', () => {

  it('should return a component that is nested within another component', async () => {
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
    expect(input.value).toEqual(VALUE);
  });
});
