// Global imports
import { fireEvent, getAllByTestId, render } from '@testing-library/react';

// Local imports
import { ComponentTypes } from '../../../models';
import getComponent from '../getComponent';

describe('utils.Component.get', () => {

  it('should return an appropriately rendered select component', () => {
    const ID = 'test-id';
    const FIELD_ID = 'field-id';
    const LABEL = 'label';
    const NEW_VALUE = 'option2';
    const ON_CHANGE_CALLS = [];
    const ON_CHANGE = (e) => {
      ON_CHANGE_CALLS.push(e.target);
    };
    const COMPONENT = {
      type: ComponentTypes.SELECT,
      id: ID,
      fieldId: FIELD_ID,
      label: LABEL,
      onChange: ON_CHANGE,
      options: [
        {
          label: 'Option 1',
          value: 'option1'
        },
        {
          label: 'Option 2',
          value: NEW_VALUE
        }
      ],
      'data-testid': ID
    };
    const { container } = render(getComponent(COMPONENT));

    const [ formGroup, select ] = getAllByTestId(container, ID);
    expect(formGroup.tagName).toEqual('DIV');
    expect(formGroup.classList).toContain('govuk-form-group');
    let label = undefined;
    formGroup.childNodes.forEach(node => {
      // Check if it's an element.
      if (node instanceof Element && node.tagName === 'LABEL') {
        label = node;
      }
    });
    expect(label).toBeDefined();
    expect(label.innerHTML).toContain(LABEL);
    expect(label.getAttribute('for')).toEqual(ID);
    expect(select.tagName).toEqual('SELECT');
    expect(select.classList).toContain('govuk-select');
    expect(select.id).toEqual(ID);
    fireEvent.change(select, { target: { name: FIELD_ID, value: NEW_VALUE }});
    expect(ON_CHANGE_CALLS.length).toEqual(1);
    expect(ON_CHANGE_CALLS[0]).toMatchObject({
      name: FIELD_ID,
      value: NEW_VALUE
    });
  });
});
