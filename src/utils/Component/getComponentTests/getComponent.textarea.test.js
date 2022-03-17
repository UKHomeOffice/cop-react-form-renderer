// Global imports
import { fireEvent, getAllByTestId, render } from '@testing-library/react';

// Local imports
import { ComponentTypes } from '../../../models';
import getComponent from '../getComponent';

describe('utils.Component.get', () => {

  it('should return an appropriately rendered textarea component', () => {
    const ID = 'test-id';
    const FIELD_ID = 'field-id';
    const LABEL = 'label';
    const ROWS = 13;
    const ON_CHANGE_CALLS = [];
    const ON_CHANGE = (e) => {
      ON_CHANGE_CALLS.push(e.target);
    };
    const COMPONENT = {
      type: ComponentTypes.TEXT_AREA,
      id: ID,
      fieldId: FIELD_ID,
      label: LABEL,
      rows: ROWS,
      onChange: ON_CHANGE,
      'data-testid': ID
    };
    const { container } = render(getComponent(COMPONENT));

    const [ formGroup, textarea ] = getAllByTestId(container, ID);
    expect(formGroup.tagName).toEqual('DIV');
    expect(formGroup.classList).toContain('govuk-form-group');
    const label = formGroup.childNodes[0];
    expect(label.innerHTML).toContain(LABEL);
    expect(label.getAttribute('for')).toEqual(ID);
    expect(textarea.tagName).toEqual('TEXTAREA');
    expect(textarea.classList).toContain('govuk-textarea');
    expect(textarea.getAttribute('rows')).toEqual(`${ROWS}`);
    expect(textarea.id).toEqual(ID);
    fireEvent.change(textarea, { target: { name: FIELD_ID, value: 'Some text' }});
    expect(ON_CHANGE_CALLS.length).toEqual(1);
    expect(ON_CHANGE_CALLS[0]).toMatchObject({
      name: FIELD_ID,
      value: 'Some text'
    });
  });

});
