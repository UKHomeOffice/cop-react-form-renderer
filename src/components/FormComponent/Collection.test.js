// Global imports
import { fireEvent } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';

// Local imports
import { CollectionLabels, ComponentTypes } from '../../models';
import { renderDomWithValidation, renderWithValidation } from '../../setupTests';
import Utils from '../../utils';
import { DEFAULT_CLASS } from './Collection';
import { DEFAULT_CLASS as DEFAULT_CONTAINER_CLASS } from './Container'
import FormComponent from './FormComponent';

describe('components.FormComponent.Collection', () => {
  const ID = 'collection';
  const TEXT_ID = 'text';
  const TEXT_VALUE = 'alpha';
  const FORM_DATA = {
    [ID]: [
      { id: '1', [TEXT_ID]: TEXT_VALUE }
    ]
  };
  const TEXT_COMPONENT = {
    id: TEXT_ID, fieldId: TEXT_ID, type: ComponentTypes.TEXT, label: 'Text component', hint: 'Text hint'
  };

  it('should render a collection component appropriately', async () => {
    const COLLECTION = {
      id: ID, fieldId: ID, type: ComponentTypes.COLLECTION, item: [ TEXT_COMPONENT ]
    };
    const { container } = renderWithValidation(
      <FormComponent component={COLLECTION} value={FORM_DATA[ID]} formData={FORM_DATA} />
    );

    // Check the container itself.
    const c = container.childNodes[0];
    expect(c.tagName).toEqual('DIV');
    expect(c.classList).toContain(DEFAULT_CLASS);

    // And now check the single text component within it.
    const item = c.childNodes[0];
    expect(item.tagName).toEqual('DIV');
    expect(item.classList).toContain(`${DEFAULT_CLASS}__item`);
    const [title, itemContainer] = item.childNodes;
    expect(title.tagName).toEqual('LABEL');
    expect(title.classList).toContain(`${DEFAULT_CLASS}__item-title`);
    expect(itemContainer.tagName).toEqual('DIV');
    expect(itemContainer.classList).toContain(DEFAULT_CONTAINER_CLASS);
    const formGroup = itemContainer.childNodes[0];
    expect(formGroup.tagName).toEqual('DIV');
    expect(formGroup.classList).toContain('govuk-form-group');
    const label = formGroup.childNodes[0];
    expect(label.tagName).toEqual('LABEL');
    expect(label.classList).toContain('govuk-label');
    expect(label.textContent).toEqual(`${TEXT_COMPONENT.label} (optional)`);
    expect(label.getAttribute('for')).toEqual(`${ID}[0].${TEXT_ID}`);
    const hint = formGroup.childNodes[1];
    expect(hint.tagName).toEqual('SPAN');
    expect(hint.classList).toContain('govuk-hint');
    expect(hint.textContent).toEqual(TEXT_COMPONENT.hint);
    const input = formGroup.childNodes[2];
    expect(input.tagName).toEqual('INPUT');
    expect(input.classList).toContain('govuk-input');
    expect(input.id).toEqual(`${ID}[0].${TEXT_ID}`);
    expect(input.value).toEqual(TEXT_VALUE);
  });

  it('should handle a change to a component appropriately', async () => {
    const ON_CHANGE_EVENTS = [];
    const ON_CHANGE = (e) => {
      ON_CHANGE_EVENTS.push(e);
    };
    const COLLECTION = {
      id: ID, fieldId: ID, type: ComponentTypes.COLLECTION,
      item: [
        { id: TEXT_ID, fieldId: TEXT_ID, type: ComponentTypes.TEXT, label: 'Text component' }
      ]
    };
    const { container } = renderWithValidation(
      <FormComponent
        component={COLLECTION}
        value={FORM_DATA[ID]}
        formData={FORM_DATA}
        onChange={ON_CHANGE}
      />
    );
    
    // Get hold of the text input.
    const c = container.childNodes[0];
    const item = c.childNodes[0];
    const formGroup = item.childNodes[1].childNodes[0];
    const input = formGroup.childNodes[2];

    const NEW_TEXT_VALUE = 'bravo';
    const EVENT = { target: { name: TEXT_ID, value: NEW_TEXT_VALUE } };
    fireEvent.change(input, EVENT);

    // And confirm the formData has been changed.
    expect(ON_CHANGE_EVENTS.length).toEqual(1);
    expect(ON_CHANGE_EVENTS[0].target.name).toEqual(ID);
    expect(ON_CHANGE_EVENTS[0].target.value[0][TEXT_ID]).toEqual(NEW_TEXT_VALUE);
  });

  it('should handle a null value appropriately', async () => {
    const COLLECTION = {
      id: ID, fieldId: ID, type: ComponentTypes.COLLECTION, item: [ TEXT_COMPONENT ]
    };
    const { container } = renderWithValidation(
      <FormComponent component={COLLECTION} />
    );

    // Check the container itself.
    const c = container.childNodes[0];
    expect(c.tagName).toEqual('DIV');
    expect(c.classList).toContain(DEFAULT_CLASS);

    // And now make sure it has no children OTHER than the button to add an item.
    expect(c.childNodes.length).toEqual(1);
    const buttonGroup = c.childNodes[0];
    expect(buttonGroup.tagName).toEqual('DIV');
    expect(buttonGroup.classList).toContain('hods-button-group');
    const button = buttonGroup.childNodes[0];
    expect(button.tagName).toEqual('BUTTON');
    expect(button.classList).toContain('hods-button');
    expect(button.classList).toContain('hods-button--secondary');
    expect(button.textContent).toContain(CollectionLabels.add);
  });

  it('should handle a collection label appropriately', async () => {
    const LABEL = 'Alpha Collection';
    const COLLECTION = {
      id: ID, fieldId: ID, type: ComponentTypes.COLLECTION, item: [ TEXT_COMPONENT ], label: LABEL
    };
    const { container } = renderWithValidation(
      <FormComponent component={COLLECTION} />
    );

    // Check the container itself.
    const c = container.childNodes[0];
    expect(c.tagName).toEqual('DIV');
    expect(c.classList).toContain(DEFAULT_CLASS);

    // And now make sure it has no children OTHER than the button to add an item.
    expect(c.childNodes.length).toEqual(2);
    const [title, buttonGroup] = c.childNodes;
    expect(title.tagName).toEqual('LABEL');
    expect(title.classList).toContain(`${DEFAULT_CLASS}__title`);
    expect(title.getAttribute('for')).toEqual(ID);
    expect(title.textContent).toContain(LABEL);
    expect(buttonGroup.tagName).toEqual('DIV');
    expect(buttonGroup.classList).toContain('hods-button-group');
    const button = buttonGroup.childNodes[0];
    expect(button.tagName).toEqual('BUTTON');
    expect(button.classList).toContain('hods-button');
    expect(button.classList).toContain('hods-button--secondary');
    expect(button.textContent).toContain(CollectionLabels.add);
  });

  it('should handle the addition and removal of an item', async () => {
    const COLLECTION = {
      id: ID, fieldId: ID, type: ComponentTypes.COLLECTION, item: [ TEXT_COMPONENT ]
    };
    const container = document.createElement('div');
    document.body.appendChild(container);
    await act(async () => {
      renderDomWithValidation(<FormComponent component={COLLECTION} />, container);
    });

    // Check the container itself.
    const c = container.childNodes[0];
    expect(c.tagName).toEqual('DIV');
    expect(c.classList).toContain(DEFAULT_CLASS);

    // And now make sure it has no children OTHER than the button to add an item.
    expect(c.childNodes.length).toEqual(1);

    // Get hold of that "Add another" button and click it.
    const addButton = c.childNodes[0].childNodes[0];
    fireEvent.click(addButton, {});

    // Make sure an item has been added.
    expect(c.childNodes.length).toEqual(2);
    const item = c.childNodes[0];
    const label = item.childNodes[0];
    expect(label.textContent).toContain(Utils.interpolateString(CollectionLabels.item, { index: 1 }));

    // Get hold of the newly-add item's "Remove" button.
    const removeButton = label.childNodes[1];
    expect(removeButton.tagName).toEqual('BUTTON');
    expect(removeButton.classList).toContain('hods-button--secondary');
    expect(removeButton.textContent).toContain(CollectionLabels.remove);

    // Click the "Remove" button
    fireEvent.click(removeButton, {});

    // Make sure the item has been removed.
    expect(c.childNodes.length).toEqual(1);
    expect(c.childNodes[0].classList).toContain('hods-button-group');
  });

});
