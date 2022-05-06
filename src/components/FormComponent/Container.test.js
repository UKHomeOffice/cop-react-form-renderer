// Global imports
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

// Local imports
import { ComponentTypes } from '../../models';
import FormComponent, { DEFAULT_CONTAINER_CLASS } from './FormComponent';

describe('components.FormComponent.Container', () => {
  const ID = 'container';
  const NESTED_ID = 'nested';
  const TEXT_ID = 'text';
  const TEXT_VALUE = 'alpha';
  const NESTED_TEXT_VALUE = 'charlie';
  const FORM_DATA = {
    [ID]: {
      [TEXT_ID]: TEXT_VALUE,
      [NESTED_ID]: {
        [TEXT_ID]: NESTED_TEXT_VALUE
      }
    }
  };
  const TEXT_COMPONENT = {
    id: TEXT_ID, fieldId: TEXT_ID, type: ComponentTypes.TEXT, label: 'Text component', hint: 'Text hint'
  };

  it('should render a container component appropriately', async () => {
    const CONTAINER = {
      id: ID, fieldId: ID, type: ComponentTypes.CONTAINER, components: [ TEXT_COMPONENT ]
    };
    const { container } = render(
      <FormComponent component={CONTAINER} value={FORM_DATA[ID]} formData={FORM_DATA} />
    );

    // Check the container itself.
    const c = container.childNodes[0];
    expect(c.tagName).toEqual('DIV');
    expect(c.classList).toContain(DEFAULT_CONTAINER_CLASS);

    // And now check the single text component within it.
    const formGroup = c.childNodes[0];
    expect(formGroup.tagName).toEqual('DIV');
    expect(formGroup.classList).toContain('govuk-form-group');
    const label = formGroup.childNodes[0];
    expect(label.tagName).toEqual('LABEL');
    expect(label.classList).toContain('govuk-label');
    expect(label.textContent).toEqual(`${TEXT_COMPONENT.label} (optional)`);
    expect(label.getAttribute('for')).toEqual(TEXT_ID);
    const hint = formGroup.childNodes[1];
    expect(hint.tagName).toEqual('SPAN');
    expect(hint.classList).toContain('govuk-hint');
    expect(hint.textContent).toEqual(TEXT_COMPONENT.hint);
    const input = formGroup.childNodes[2];
    expect(input.tagName).toEqual('INPUT');
    expect(input.classList).toContain('govuk-input');
    expect(input.id).toEqual(TEXT_ID);
    expect(input.value).toEqual(TEXT_VALUE);
  });

  it('should render a nested container component appropriately', async () => {
    const CONTAINER = {
      id: ID, fieldId: ID, type: ComponentTypes.CONTAINER,
      components: [
        { id: NESTED_ID, fieldId: NESTED_ID, type: ComponentTypes.CONTAINER, components: [ TEXT_COMPONENT ] }
      ]
    };
    const { container } = render(
      <FormComponent component={CONTAINER} value={FORM_DATA[ID]} formData={FORM_DATA} />
    );

    // Check the container itself.
    const c = container.childNodes[0];
    expect(c.tagName).toEqual('DIV');
    expect(c.classList).toContain(DEFAULT_CONTAINER_CLASS);

    // Check the nested container.
    const nested = c.childNodes[0];
    expect(nested.tagName).toEqual('DIV');
    expect(nested.classList).toContain(DEFAULT_CONTAINER_CLASS);

    // And now check the single text component within the nested container.
    const formGroup = nested.childNodes[0];
    expect(formGroup.tagName).toEqual('DIV');
    expect(formGroup.classList).toContain('govuk-form-group');
    const label = formGroup.childNodes[0];
    expect(label.tagName).toEqual('LABEL');
    expect(label.classList).toContain('govuk-label');
    expect(label.textContent).toEqual(`${TEXT_COMPONENT.label} (optional)`);
    expect(label.getAttribute('for')).toEqual(TEXT_ID);
    const hint = formGroup.childNodes[1];
    expect(hint.tagName).toEqual('SPAN');
    expect(hint.classList).toContain('govuk-hint');
    expect(hint.textContent).toEqual(TEXT_COMPONENT.hint);
    const input = formGroup.childNodes[2];
    expect(input.tagName).toEqual('INPUT');
    expect(input.classList).toContain('govuk-input');
    expect(input.id).toEqual(TEXT_ID);
    expect(input.value).toEqual(NESTED_TEXT_VALUE);
  });

  it('should handle a change to a component appropriately', async () => {
    const ON_CHANGE_EVENTS = [];
    const ON_CHANGE = (e) => {
      ON_CHANGE_EVENTS.push(e);
    };
    const CONTAINER = {
      id: ID, fieldId: ID, type: ComponentTypes.CONTAINER,
      components: [
        { id: TEXT_ID, fieldId: TEXT_ID, type: ComponentTypes.TEXT, label: 'Text component' }
      ]
    };
    const { container } = render(
      <FormComponent
        component={CONTAINER}
        value={FORM_DATA[ID]}
        formData={FORM_DATA}
        onChange={ON_CHANGE}
      />
    );
    
    // Get hold of the text input.
    const c = container.childNodes[0];
    const formGroup = c.childNodes[0];
    const input = formGroup.childNodes[2];

    const NEW_TEXT_VALUE = 'bravo';
    const EVENT = { target: { name: TEXT_ID, value: NEW_TEXT_VALUE } };
    fireEvent.change(input, EVENT);

    // And confirm the formData has been changed.
    expect(ON_CHANGE_EVENTS.length).toEqual(1);
    expect(ON_CHANGE_EVENTS[0].target.name).toEqual(ID);
    expect(ON_CHANGE_EVENTS[0].target.value[TEXT_ID]).toEqual(NEW_TEXT_VALUE);
  });


  it('should handle a null value appropriately', async () => {
    const CONTAINER = {
      id: ID, fieldId: ID, type: ComponentTypes.CONTAINER, components: [ TEXT_COMPONENT ]
    };
    const { container } = render(
      <FormComponent component={CONTAINER} />
    );

    // Check the container itself.
    const c = container.childNodes[0];
    expect(c.tagName).toEqual('DIV');
    expect(c.classList).toContain(DEFAULT_CONTAINER_CLASS);

    // And now check the single text component within it.
    const formGroup = c.childNodes[0];
    expect(formGroup.tagName).toEqual('DIV');
    expect(formGroup.classList).toContain('govuk-form-group');
    const label = formGroup.childNodes[0];
    expect(label.tagName).toEqual('LABEL');
    expect(label.classList).toContain('govuk-label');
    expect(label.textContent).toEqual(`${TEXT_COMPONENT.label} (optional)`);
    expect(label.getAttribute('for')).toEqual(TEXT_ID);
    const hint = formGroup.childNodes[1];
    expect(hint.tagName).toEqual('SPAN');
    expect(hint.classList).toContain('govuk-hint');
    expect(hint.textContent).toEqual(TEXT_COMPONENT.hint);
    const input = formGroup.childNodes[2];
    expect(input.tagName).toEqual('INPUT');
    expect(input.classList).toContain('govuk-input');
    expect(input.id).toEqual(TEXT_ID);
    expect(input.value).toEqual('');
  });

});
