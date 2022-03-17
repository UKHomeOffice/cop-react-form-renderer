// Global imports
import { fireEvent, getAllByTestId, render } from '@testing-library/react';

// Local imports
import { ComponentTypes } from '../../../models';
import getComponent from '../getComponent';

describe('utils.Component.get', () => {

  it('should return an appropriately rendered radios component', () => {
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
      type: ComponentTypes.RADIOS,
      id: ID,
      fieldId: FIELD_ID,
      label: LABEL,
      data: { options: OPTIONS },
      onChange: ON_CHANGE,
      'data-testid': ID
    };
    const { container } = render(getComponent(COMPONENT));

    const [ formGroup, radios ] = getAllByTestId(container, ID);
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
    expect(radios.tagName).toEqual('DIV');
    expect(radios.classList).toContain('govuk-radios');
    expect(radios.childNodes.length).toEqual(OPTIONS.length);
    let radioItems = [];
    OPTIONS.forEach((_, index) => {
      const radio = radios.childNodes[index];
      expect(radio instanceof Element).toBeTruthy();
      if (radio instanceof Element) {
        radioItems.push(radio);
      }
    });
    expect(radioItems.length).toEqual(OPTIONS.length);
    OPTIONS.forEach((option, index) => {
      const radio = radioItems[index];
      expect(radio.tagName).toEqual('DIV');
      expect(radio.classList).toContain('govuk-radios__item');
      const [input, label] = radio.childNodes;
      expect(input.tagName).toEqual('INPUT');
      expect(input.type).toEqual('radio');
      expect(label.textContent).toEqual(option.label);
    });
    fireEvent.click(radioItems[0].childNodes[0]); // alpha
    expect(ON_CHANGE_CALLS.length).toEqual(1);
    expect(ON_CHANGE_CALLS[0]).toMatchObject({
      name: FIELD_ID,
      value: OPTIONS[0].value
    });
    fireEvent.click(radioItems[1].childNodes[0]); // bravo
    expect(ON_CHANGE_CALLS.length).toEqual(2);
    expect(ON_CHANGE_CALLS[1]).toMatchObject({
      name: FIELD_ID,
      value: OPTIONS[1].value
    });
    fireEvent.click(radioItems[1].childNodes[0]); // bravo (already selected, above)
    expect(ON_CHANGE_CALLS.length).toEqual(2); // No change, so no new event should have fired.
  });

});
