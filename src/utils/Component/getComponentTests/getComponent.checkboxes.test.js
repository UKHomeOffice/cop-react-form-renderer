// Global imports
import { fireEvent, getAllByTestId, render } from '@testing-library/react';

// Local imports
import { ComponentTypes } from '../../../models';
import getComponent from '../getComponent';

describe('utils.Component.get', () => {

  it('should return an appropriately rendered checkboxes component', () => {
    const ID = 'test-id';
    const FIELD_ID = 'field-id';
    const LABEL = 'label';
    const OPTIONS = [
      { value: 'a', label: 'Alpha' },
      { value: 'b', label: 'Bravo' }
    ];
    const ON_CHANGE_CALLS = [];
    const ON_CHANGE = (e) => {
      ON_CHANGE_CALLS.push(e.target);
    };
    const COMPONENT = {
      type: ComponentTypes.CHECKBOXES,
      id: ID,
      fieldId: FIELD_ID,
      label: LABEL,
      data: { options: OPTIONS },
      onChange: ON_CHANGE,
      'data-testid': ID
    };
    const { container } = render(getComponent(COMPONENT));

    const [ formGroup, checkboxes ] = getAllByTestId(container, ID);
    expect(formGroup.tagName).toEqual('DIV');
    expect(formGroup.classList).toContain('govuk-form-group');
    let label = undefined;
    formGroup.childNodes.forEach(node => {
      // Check if it's an element.
      if (node instanceof Element) {
        if (node.tagName === 'LABEL') {
          label = node;
        }
      }
    });
    expect(label).toBeDefined();
    expect(label.innerHTML).toContain(LABEL);
    expect(label.getAttribute('for')).toEqual(ID);
    expect(checkboxes.tagName).toEqual('DIV');
    expect(checkboxes.classList).toContain('govuk-checkboxes');
    expect(checkboxes.childNodes.length).toEqual(OPTIONS.length);
    let checkboxItems = [];
    OPTIONS.forEach((_, index) => {
      const checkbox = checkboxes.childNodes[index];
      expect(checkbox instanceof Element).toBeTruthy();
      if (checkbox instanceof Element) {
        checkboxItems.push(checkbox);
      }
    });
    expect(checkboxItems.length).toEqual(OPTIONS.length);
    OPTIONS.forEach((option, index) => {
      const checkbox = checkboxItems[index];
      expect(checkbox.tagName).toEqual('DIV');
      expect(checkbox.classList).toContain('govuk-checkboxes__item');
      const [input, label] = checkbox.childNodes;
      expect(input.tagName).toEqual('INPUT');
      expect(input.type).toEqual('checkbox');
      expect(label.textContent).toEqual(option.label);
    });

    fireEvent.click(checkboxItems[0].childNodes[0]); // alpha
    expect(ON_CHANGE_CALLS.length).toEqual(2);
    expect(ON_CHANGE_CALLS[1]).toMatchObject({
      name: FIELD_ID,
      value: [ OPTIONS[0].value ]
    });
    fireEvent.click(checkboxItems[1].childNodes[0]); // beta
    expect(ON_CHANGE_CALLS.length).toEqual(3);
    expect(ON_CHANGE_CALLS[2]).toMatchObject({
      name: FIELD_ID,
      value: [ OPTIONS[0].value, OPTIONS[1].value ]
    });
    fireEvent.click(checkboxItems[0].childNodes[0]); // alpha (unchecked this time)
    expect(ON_CHANGE_CALLS.length).toEqual(4);
    expect(ON_CHANGE_CALLS[3]).toMatchObject({
      name: FIELD_ID,
      value: [ OPTIONS[1].value ]
    });
  });

});
