// Global imports
import { fireEvent } from '@testing-library/react';
import React from 'react';

// Local imports
import { PageAction } from '../../models';
import { renderWithValidation } from '../../setupTests';
import { DEFAULT_LABEL } from '../PageActions/ActionButton';
import FormPage, { DEFAULT_CLASS } from './FormPage';

describe('components.FormPage', () => {

  describe('FormPage', () => {

    const TEXT = { id: 'text', fieldId: 'text', type: 'text', label: 'Text component', hint: 'Text hint' };
    const TEXT_WITH_EXPRESSION = { id: 'text1', fieldId: 'text1', type: 'text', label: 'Email to ${wrapper.email}', hint: 'Text hint ${currentUser.givenName}' };
    const AUTO_WITH_EXPRESSION = { id: 'text2', fieldId: 'text2', label: '${text2} ${currentUser.givenName}', hint: '${wrapper.email}', type: 'autocomplete', required: true, source: [], disabled: false };
    const VALUE = 'Text value';
    const PAGE = {
      id: 'pageId',
      title: 'Page 1',
      components: [ TEXT ],
      actions: [PageAction.TYPES.SUBMIT],
      formData: { text: VALUE }
    };
    const PAGE_WITH_BUTTON_ACTIONS = { 
      id: 'pageId', 
      title: '${title}',
      components: [ TEXT_WITH_EXPRESSION, AUTO_WITH_EXPRESSION ],
      actions: [
        { type: 'submit', validate: true, label: 'Next ${wrapper.nextAction}' }, 
        { type: 'navigate', page: '1', label: 'Go back ${wrapper.prevAction}' }
      ],
      formData: { 
        title: 'Order Form', 
        text1: `Text1 ${VALUE}`, 
        text2: `Text2 ${VALUE}`,
        wrapper: { email: 'test@example.email', nextAction: 'Payment', prevAction: 'User Details' },
        currentUser: { givenName: 'Doe' }
      }
    };
    const ON_ACTION_CALLS = [];

    const checkInputField = (formGroup, fieldId, lbl, hnt, val) => {
      expect(formGroup.tagName).toEqual('DIV');
      expect(formGroup.classList).toContain('govuk-form-group');
      const label = formGroup.childNodes[0];
      expect(label.tagName).toEqual('LABEL');
      expect(label.classList).toContain('govuk-label');
      expect(label.textContent).toEqual(lbl);
      expect(label.getAttribute('for')).toEqual(fieldId);
      const hint = formGroup.childNodes[1];
      expect(hint.tagName).toEqual('SPAN');
      expect(hint.classList).toContain('govuk-hint');
      expect(hint.textContent).toEqual(hnt);
      const input = formGroup.childNodes[2];
      expect(input.tagName).toEqual('INPUT');
      expect(input.classList).toContain('govuk-input');
      expect(input.id).toEqual(fieldId);
      expect(input.value).toEqual(val);
      return input;
    };

    const checkAutoCompleteField = (formGroup, fieldId, lbl, hnt, val) => {
      expect(formGroup.tagName).toEqual('DIV');
      expect(formGroup.classList).toContain('govuk-form-group');
      const label = formGroup.childNodes[0];
      expect(label.tagName).toEqual('LABEL');
      expect(label.classList).toContain('govuk-label');
      expect(label.textContent).toEqual(lbl);
      expect(label.getAttribute('for')).toEqual(fieldId);
      const hint = formGroup.childNodes[1];
      expect(hint.tagName).toEqual('SPAN');
      expect(hint.classList).toContain('govuk-hint');
      expect(hint.textContent).toEqual(hnt);
      const outerWrapper = formGroup.childNodes[2];
      expect(outerWrapper.classList).toContain('hods-autocomplete__outer-wrapper');
      const autocomplete = outerWrapper.childNodes[0];
      expect(autocomplete.classList).toContain('hods-autocomplete__wrapper');
      const input = [ ...autocomplete.childNodes ].filter(e => e.tagName === 'INPUT')[0];
      expect(input.classList).toContain('hods-autocomplete__input');
      expect(input.tagName).toEqual('INPUT');
      expect(input.id).toEqual(fieldId);
      expect(input.value).toEqual(val);
      return input;
    };

    const checkFormButtonGroup = (buttonGroup, labels) => {
      const buttons = [];
      expect(buttonGroup.tagName).toEqual('DIV');
      expect(buttonGroup.classList).toContain('hods-button-group');
      expect(buttonGroup.childNodes?.length).toEqual(labels.length)
      buttonGroup.childNodes.forEach((button, i) => {
        expect(button.tagName).toEqual('BUTTON');
        expect(button.classList).toContain('hods-button');
        expect(button.textContent).toEqual(labels[i]);
        buttons.push(button);
      });
      return buttons;
    };

    const ON_ACTION = (action, patch, onError) => {
      ON_ACTION_CALLS.push({ action, patch, onError });
    };

    beforeEach(() => {
      PAGE.formData = { text: VALUE };
      ON_ACTION_CALLS.length = 0;
    });

    it('should render a submit page correctly', async () => {
      const { container } = renderWithValidation(
        <FormPage page={PAGE} onAction={ON_ACTION} />
      );
      const page = container.childNodes[0];
      expect(page.tagName).toEqual('DIV');
      expect(page.classList).toContain(`${DEFAULT_CLASS}__page`);
      const heading = page.childNodes[0];
      expect(heading.classList).toContain('govuk-heading-l');
      expect(heading.textContent).toEqual(PAGE.title);
      checkInputField(page.childNodes[1], TEXT.fieldId, `${TEXT.label} (optional)`, TEXT.hint, VALUE);
      checkFormButtonGroup(page.childNodes[2], [DEFAULT_LABEL]);
    });

    it('should render a submit page correctly and submit action button has interpolated label', async () => {
      const { container } = renderWithValidation(
        <FormPage page={PAGE_WITH_BUTTON_ACTIONS} onAction={ON_ACTION} />
      );
      const page = container.childNodes[0];
      const FORM_DATA = PAGE_WITH_BUTTON_ACTIONS.formData;
      expect(page.tagName).toEqual('DIV');
      expect(page.classList).toContain(`${DEFAULT_CLASS}__page`);
      const heading = page.childNodes[0];
      expect(heading.classList).toContain('govuk-heading-l');
      expect(heading.textContent).toEqual(FORM_DATA.title);
      checkInputField(page.childNodes[1], TEXT_WITH_EXPRESSION.fieldId, 'Email to test@example.email (optional)', 'Text hint Doe', 'Text1 Text value');
      checkAutoCompleteField(page.childNodes[2], AUTO_WITH_EXPRESSION.fieldId, `${FORM_DATA.text2} ${FORM_DATA.currentUser.givenName}`, FORM_DATA.wrapper.email, `Text2 ${VALUE}`);
      checkFormButtonGroup(page.childNodes[3], ['Next Payment' ,'Go back User Details']);
    });

    it('should handle a page change appropriately', async () => {
      const { container } = renderWithValidation(
        <FormPage page={PAGE} onAction={ON_ACTION} />
      );
      const page = container.childNodes[0];
      expect(page.tagName).toEqual('DIV');

      // Change the input.
      const input = page.childNodes[1].childNodes[2];
      const NEW_VALUE = `${VALUE}.`;
      const EVENT = { target: { name: TEXT.fieldId, value: NEW_VALUE } };
      fireEvent.change(input, EVENT);

      // And confirm the formData has been changed.
      expect(PAGE.formData.text).toEqual(NEW_VALUE);
    });

    it('should handle a page action appropriately', async () => {
      const { container } = renderWithValidation(
        <FormPage page={PAGE} onAction={ON_ACTION} />
      );
      const page = container.childNodes[0];

      // Change the input.
      const input = page.childNodes[1].childNodes[2];
      const NEW_VALUE = `${VALUE}.`;
      const CHANGE_EVENT = { target: { name: TEXT.fieldId, value: NEW_VALUE } };
      fireEvent.change(input, CHANGE_EVENT);

      // Then click the action button.
      const button = page.childNodes[2].childNodes[0];
      fireEvent.click(button, {});

      // And confirm an appropriate action was received.
      expect(ON_ACTION_CALLS.length).toEqual(1);
      expect(PAGE.formData.text).toEqual(NEW_VALUE);
      console.log(ON_ACTION_CALLS[0].action);
      expect(ON_ACTION_CALLS[0].action).toEqual(PageAction.DEFAULTS.submit);
      expect(ON_ACTION_CALLS[0].patch).toEqual({ text: NEW_VALUE });
    });

  });

});
