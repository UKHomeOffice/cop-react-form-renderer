// Global imports
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

// Local imports
import { PageAction } from '../../models';
import { DEFAULT_LABEL } from '../PageActions/ActionButton';
import FormPage, { DEFAULT_CLASS } from './FormPage';

describe('components', () => {

  describe('FormPage', () => {

    const TEXT = { id: 'text', fieldId: 'text', type: 'text', label: 'Text component', hint: 'Text hint' };
    const VALUE = 'Text value';
    const PAGE = {
      id: 'pageId',
      title: 'Page 1',
      components: [ TEXT ],
      actions: [PageAction.TYPES.SUBMIT],
      formData: { text: VALUE }
    };
    const ON_ACTION_CALLS = [];
    const ON_ACTION = (action, patch, onError) => {
      ON_ACTION_CALLS.push({ action, patch, onError });
    };

    beforeEach(() => {
      PAGE.formData = { text: VALUE };
      ON_ACTION_CALLS.length = 0;
    });

    it('should render a submit page correctly', async () => {
      const { container } = render(
        <FormPage page={PAGE} onAction={ON_ACTION} />
      );
      const page = container.childNodes[0];
      expect(page.tagName).toEqual('DIV');
      expect(page.classList).toContain(`${DEFAULT_CLASS}__page`);
      const heading = page.childNodes[0];
      expect(heading.classList).toContain('govuk-heading-l');
      expect(heading.textContent).toEqual(PAGE.title);
      const formGroup = page.childNodes[1];
      expect(formGroup.tagName).toEqual('DIV');
      expect(formGroup.classList).toContain('govuk-form-group');
      const label = formGroup.childNodes[0];
      expect(label.tagName).toEqual('LABEL');
      expect(label.classList).toContain('govuk-label');
      expect(label.textContent).toEqual(`${TEXT.label} (optional)`);
      expect(label.getAttribute('for')).toEqual(TEXT.fieldId);
      const hint = formGroup.childNodes[1];
      expect(hint.tagName).toEqual('SPAN');
      expect(hint.classList).toContain('govuk-hint');
      expect(hint.textContent).toEqual(TEXT.hint);
      const input = formGroup.childNodes[2];
      expect(input.tagName).toEqual('INPUT');
      expect(input.classList).toContain('govuk-input');
      expect(input.id).toEqual(TEXT.fieldId);
      expect(input.value).toEqual(VALUE);
      const buttonGroup = page.childNodes[2];
      expect(buttonGroup.tagName).toEqual('DIV');
      expect(buttonGroup.classList).toContain('govuk-button-group');
      const button = buttonGroup.childNodes[0];
      expect(button.tagName).toEqual('BUTTON');
      expect(button.classList).toContain('govuk-button');
      expect(button.textContent).toEqual(DEFAULT_LABEL);
    });

    it('should handle a page change appropriately', async () => {
      const { container } = render(
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
      const { container } = render(
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
      expect(ON_ACTION_CALLS[0].action).toEqual(PageAction.DEFAULTS.submit);
      expect(ON_ACTION_CALLS[0].patch).toEqual({ text: NEW_VALUE });
    });

    it('should display errors appropriately', async () => {
      const ERRORS = [{ id: TEXT.id, error: 'Invalid value' }];
      const THROW_ERROR_ON_ACTION = (action, patch, onError) => {
        ON_ACTION_CALLS.push({ action, patch, onError });
        onError(ERRORS);
      };
      const { container } = render(
        <FormPage page={PAGE} onAction={THROW_ERROR_ON_ACTION} />
      );
      const page = container.childNodes[0];

      // Change the input.
      const input = page.childNodes[1].childNodes[2];
      const NEW_VALUE = `${VALUE}.`;
      const CHANGE_EVENT = { target: { name: TEXT.fieldId, value: NEW_VALUE } };
      fireEvent.change(input, CHANGE_EVENT);

      // Then click the action button, which should call the onError callback method.
      const button = page.childNodes[2].childNodes[0];
      fireEvent.click(button, {});

      // And confirm the page error is now displayed.
      const errorSummary = page.childNodes[1];
      expect(errorSummary.tagName).toEqual('DIV');
      expect(errorSummary.id).toEqual('error-summary');
      expect(errorSummary.classList).toContain('govuk-error-summary');
      const errorList = errorSummary.childNodes[1].childNodes[0];
      expect(errorList.tagName).toEqual('UL');
      expect(errorList.classList).toContain('govuk-error-summary__list');
      expect(errorList.childNodes.length).toEqual(ERRORS.length);
      const error = errorList.childNodes[0];
      expect(error.tagName).toEqual('LI');
      const errorLink = error.childNodes[0];
      expect(errorLink.tagName).toEqual('A');
      expect(errorLink.textContent).toEqual(ERRORS[0].error);
      expect(errorLink.getAttribute('href')).toEqual(`#${ERRORS[0].id}`);
    });

  });

});
