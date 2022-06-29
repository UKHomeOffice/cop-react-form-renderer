// Global imports
import React from 'react';

// Local imports
import { renderWithValidation } from '../../setupTests';
import FormComponent from './FormComponent';

describe('components', () => {

  describe('FormComponent', () => {

    it('should render a text component appropriately', async () => {
      const ID = 'component';
      const VALUE = 'Text value';
      const COMPONENT = { id: ID, fieldId: ID, type: 'text', label: 'Text component', hint: 'Text hint' };
      const ON_CHANGE = () => {};
      const { container } = renderWithValidation(
        <FormComponent data-testid={ID} component={COMPONENT} value={VALUE} onChange={ON_CHANGE} />
      );

      // text components are wrapper in a FormGroup by default.
      const formGroup = container.childNodes[0];
      expect(formGroup.tagName).toEqual('DIV');
      expect(formGroup.classList).toContain('govuk-form-group');
      const label = formGroup.childNodes[0];
      expect(label.tagName).toEqual('LABEL');
      expect(label.classList).toContain('govuk-label');
      expect(label.textContent).toEqual(`${COMPONENT.label} (optional)`);
      expect(label.getAttribute('for')).toEqual(ID);
      const hint = formGroup.childNodes[1];
      expect(hint.tagName).toEqual('SPAN');
      expect(hint.classList).toContain('govuk-hint');
      expect(hint.textContent).toEqual(COMPONENT.hint);
      const input = formGroup.childNodes[2];
      expect(input.tagName).toEqual('INPUT');
      expect(input.classList).toContain('govuk-input');
      expect(input.id).toEqual(ID);
      expect(input.value).toEqual(VALUE);
    });

    it('should render a text component appropriately with wrap turned off', async () => {
      const ID = 'component';
      const VALUE = 'Text value';
      const COMPONENT = { id: ID, fieldId: ID, type: 'text', label: 'Text component', hint: 'Text hint' };
      const ON_CHANGE = () => {};
      const { container } = renderWithValidation(
        <FormComponent data-testid={ID} component={COMPONENT} wrap={false} value={VALUE} onChange={ON_CHANGE} />
      );

      // With wrap = false, there should be no form group.
      const input = container.childNodes[0];
      expect(input.tagName).toEqual('INPUT');
      expect(input.classList).toContain('govuk-input');
      expect(input.id).toEqual(ID);
      expect(input.value).toEqual(VALUE);
    });

    it('should render an html component appropriately', async () => {
      const ID = 'component';
      const COMPONENT = { type: 'html', tagName: 'p', content: 'HTML content' };
      const { container } = renderWithValidation(
        <FormComponent data-testid={ID} component={COMPONENT} />
      );
      const p = container.childNodes[0];
      expect(p.tagName).toEqual('P');
      expect(p.textContent).toEqual(COMPONENT.content);
    });

    it('should render an overridden html component appropriately', async () => {
      const hooks = {
        onGetComponent: (config, wrap) => {
          return <div>{`${config.type} | ${config.tagName} | ${config.content} | ${wrap}`}</div>
        }
      };
      const ID = 'component';
      const COMPONENT = { type: 'html', tagName: 'p', content: 'HTML content' };
      const { container } = renderWithValidation(
        <FormComponent data-testid={ID} component={COMPONENT} />
      , { hooks });
      const div = container.childNodes[0];
      expect(div.tagName).toEqual('DIV');
      expect(div.textContent).toEqual(`${COMPONENT.type} | ${COMPONENT.tagName} | ${COMPONENT.content} | true`);
    });

    it('should render the correct html component when the override returns null', async () => {
      const hooks = {
        onGetComponent: () => {
          return null;
        }
      };
      const ID = 'component';
      const COMPONENT = { type: 'html', tagName: 'p', content: 'HTML content' };
      const { container } = renderWithValidation(
        <FormComponent data-testid={ID} component={COMPONENT} />
      , { hooks });
      const p = container.childNodes[0];
      expect(p.tagName).toEqual('P');
      expect(p.textContent).toEqual(COMPONENT.content);
    });

    it('should render a text component appropriately with interpolated label and cya_label', async () => {
      const ID = 'component';
      const VALUE = 'Text value';
      // eslint-disable-next-line no-template-curly-in-string
      const COMPONENT = { id: ID, fieldId: ID, type: 'text', label: '${text} Text component', cya_label: '${text} Text component', hint: 'Text hint' };
      const DATA = { text: 'Interpolated'}
      const ON_CHANGE = () => {};
      const { container } = renderWithValidation(
        <FormComponent data-testid={ID} component={COMPONENT} value={VALUE} onChange={ON_CHANGE} formData={DATA} />
      );

      // text components are wrapper in a FormGroup by default.
      const formGroup = container.childNodes[0];
      expect(formGroup.tagName).toEqual('DIV');
      expect(formGroup.classList).toContain('govuk-form-group');
      const label = formGroup.childNodes[0];
      expect(label.tagName).toEqual('LABEL');
      expect(label.classList).toContain('govuk-label');
      expect(label.textContent).toEqual('Interpolated Text component (optional)');
      expect(label.getAttribute('for')).toEqual(ID);
      const hint = formGroup.childNodes[1];
      expect(hint.tagName).toEqual('SPAN');
      expect(hint.classList).toContain('govuk-hint');
      expect(hint.textContent).toEqual(COMPONENT.hint);
      const input = formGroup.childNodes[2];
      expect(input.tagName).toEqual('INPUT');
      expect(input.classList).toContain('govuk-input');
      expect(input.id).toEqual(ID);
      expect(input.value).toEqual(VALUE);
      expect(input.getAttribute("label")).toEqual('Interpolated Text component');
      expect(input.getAttribute("cya_label")).toEqual('Interpolated Text component');  
    });

  });

});
