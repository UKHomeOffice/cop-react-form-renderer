// Global imports
import { fireEvent, getAllByTestId, render } from '@testing-library/react';

// Local imports
import { ComponentTypes } from '../../../models';
import getComponent from '../getComponent';

describe('utils.Component.get', () => {

  it('should return an appropriately rendered time component', () => {
    const ID = 'test-id';
    const FIELD_ID = 'field-id';
    const LABEL = 'label';
    const ON_CHANGE_CALLS = [];
    const ON_CHANGE = (e) => {
      ON_CHANGE_CALLS.push(e.target);
    };
    const COMPONENT = {
      type: ComponentTypes.TIME,
      id: ID,
      fieldId: FIELD_ID,
      label: LABEL,
      onChange: ON_CHANGE,
      'data-testid': ID
    };
    const { container } = render(getComponent(COMPONENT));

    const [ formGroup, timeInput ] = getAllByTestId(container, ID);
    expect(formGroup.tagName).toEqual('DIV');
    expect(formGroup.classList).toContain('govuk-form-group');
    const label = formGroup.childNodes[0];
    expect(label.innerHTML).toContain(LABEL);
    expect(label.getAttribute('for')).toEqual(ID);
    expect(timeInput.tagName).toEqual('DIV');
    expect(timeInput.classList).toContain('govuk-date-input');
    expect(timeInput.id).toEqual(ID);

    let onChangeCalls = ON_CHANGE_CALLS.length;
    const [hourItem, minuteItem] = timeInput.childNodes;
    [
      { id: 'hour', label: 'Hour', item: hourItem, value: '5', expectedValue: '5:' },
      { id: 'minute', label: 'Minute', item: minuteItem, value: '11', expectedValue: '5:11' }
    ].forEach(part => {
      expect(part.item.tagName).toEqual('DIV');
      expect(part.item.classList).toContain('govuk-date-input__item');
      const [label, input] = part.item.childNodes;
      expect(label.tagName).toEqual('LABEL');
      expect(label.classList).toContain('govuk-label');
      expect(label.textContent).toEqual(part.label);
      expect(input.tagName).toEqual('INPUT');
      expect(input.id).toEqual(`${ID}-${part.id}`);

      // Put something in the input and make sure it fires.
      fireEvent.change(input, { target: { name: `${FIELD_ID}-${part.id}`, value: part.value }});
      onChangeCalls++;
      expect(ON_CHANGE_CALLS.length).toEqual(onChangeCalls);
      expect(ON_CHANGE_CALLS[onChangeCalls - 1]).toMatchObject({
        name: FIELD_ID,
        value: part.expectedValue
      });
    });
  });

});
