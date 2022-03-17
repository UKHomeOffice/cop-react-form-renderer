// Global imports
import { fireEvent, getAllByTestId, render } from '@testing-library/react';

// Local imports
import { ComponentTypes } from '../../../models';
import getComponent from '../getComponent';

describe('utils.Component.get', () => {

  it('should return an appropriately rendered date component', () => {
    const ID = 'test-id';
    const FIELD_ID = 'field-id';
    const LABEL = 'label';
    const ON_CHANGE_CALLS = [];
    const ON_CHANGE = (e) => {
      ON_CHANGE_CALLS.push(e.target);
    };
    const COMPONENT = {
      type: ComponentTypes.DATE,
      id: ID,
      fieldId: FIELD_ID,
      label: LABEL,
      onChange: ON_CHANGE,
      'data-testid': ID
    };
    const { container } = render(getComponent(COMPONENT));

    const [ formGroup, dateinput ] = getAllByTestId(container, ID);
    expect(formGroup.tagName).toEqual('DIV');
    expect(formGroup.classList).toContain('govuk-form-group');
    const label = formGroup.childNodes[0];
    expect(label.innerHTML).toContain(LABEL);
    expect(label.getAttribute('for')).toEqual(ID);
    expect(dateinput.tagName).toEqual('DIV');
    expect(dateinput.classList).toContain('govuk-date-input');
    expect(dateinput.id).toEqual(ID);

    const dayitem = dateinput.childNodes[0];
    expect(dayitem.tagName).toEqual('DIV');
    expect(dayitem.classList).toContain('govuk-date-input__item');
    const daylabel = dayitem.childNodes[0];
    expect(daylabel.tagName).toEqual('LABEL');
    expect(daylabel.classList).toContain('govuk-label');
    expect(daylabel.textContent).toEqual('Day');
    const dayinput = dayitem.childNodes[1];
    expect(dayinput.tagName).toEqual('INPUT');
    expect(dayinput.id).toEqual(`${ID}-day`);

    const monthitem = dateinput.childNodes[1];
    expect(monthitem.tagName).toEqual('DIV');
    expect(monthitem.classList).toContain('govuk-date-input__item');
    const monthlabel = monthitem.childNodes[0];
    expect(monthlabel.tagName).toEqual('LABEL');
    expect(monthlabel.classList).toContain('govuk-label');
    expect(monthlabel.textContent).toEqual('Month');
    const monthinput = monthitem.childNodes[1];
    expect(monthinput.tagName).toEqual('INPUT');
    expect(monthinput.id).toEqual(`${ID}-month`);

    const yearitem = dateinput.childNodes[2];
    expect(yearitem.tagName).toEqual('DIV');
    expect(yearitem.classList).toContain('govuk-date-input__item');
    const yearlabel = yearitem.childNodes[0];
    expect(yearlabel.tagName).toEqual('LABEL');
    expect(yearlabel.classList).toContain('govuk-label');
    expect(yearlabel.textContent).toEqual('Year');
    const yearinput = yearitem.childNodes[1];
    expect(yearinput.tagName).toEqual('INPUT');
    expect(yearinput.id).toEqual(`${ID}-year`);

    // Add something to the day and make sure it fires.
    fireEvent.change(dayinput, { target: { name: `${FIELD_ID}-day`, value: '5' }});
    expect(ON_CHANGE_CALLS.length).toEqual(2);
    expect(ON_CHANGE_CALLS[1]).toMatchObject({
      name: FIELD_ID,
      value: '5--'
    });
    // And now the month...
    fireEvent.change(monthinput, { target: { name: `${FIELD_ID}-month`, value: '11' }});
    expect(ON_CHANGE_CALLS.length).toEqual(3);
    expect(ON_CHANGE_CALLS[2]).toMatchObject({
      name: FIELD_ID,
      value: '5-11-'
    });
    // And finally the year.
    fireEvent.change(yearinput, { target: { name: `${FIELD_ID}-year`, value: '2022' }});
    expect(ON_CHANGE_CALLS.length).toEqual(4);
    expect(ON_CHANGE_CALLS[3]).toMatchObject({
      name: FIELD_ID,
      value: '5-11-2022'
    });
  });

});
