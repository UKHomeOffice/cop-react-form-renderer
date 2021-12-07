// Global imports
import { getAllByTestId, getByTestId, render } from '@testing-library/react';

// Local imports
import { ComponentTypes } from '../../models';
import getComponent from './getComponent';

describe('utils', () => {

  describe('Component', () => {

    describe('get', () => {
      
      it('should return null for an unknown type', () => {
        expect(getComponent({ type: 'unknown' })).toBeNull();
      });

      it('should return a p tag by default for an HTML component', () => {
        const ID = 'test-id';
        const CONTENT = 'HTML content';
        const COMPONENT = { type: ComponentTypes.HTML, content: CONTENT, 'data-testid': ID };
        const { container } = render(getComponent(COMPONENT));

        const p = getByTestId(container, ID);
        expect(p.innerHTML).toContain(CONTENT);
        expect(p.tagName).toEqual('P');
      });

      it('should return an appropriate tag for an HTML component', () => {
        const ID = 'test-id';
        const TAG_NAME = 'hr';
        const COMPONENT = { type: ComponentTypes.HTML, tagName: TAG_NAME, 'data-testid': ID };
        const { container } = render(getComponent(COMPONENT));

        const hr = getByTestId(container, ID);
        expect(hr.tagName).toEqual('HR');
      });

      it('should return an appropriately rendered heading component', () => {
        const ID = 'test-id';
        const SIZE = 'm';
        const CONTENT = 'Heading text';
        const COMPONENT = { type: ComponentTypes.HEADING, size: SIZE, content: CONTENT, 'data-testid': ID };
        const { container } = render(getComponent(COMPONENT));

        const heading = getByTestId(container, ID);
        expect(heading.innerHTML).toContain(CONTENT);
        expect(heading.tagName).toEqual('H3');
        expect(heading.classList).toContain(`govuk-heading-${SIZE}`);
      });

      it('should return an appropriately rendered inset-text component', () => {
        const ID = 'test-id';
        const CONTENT = 'Heading text';
        const COMPONENT = { type: ComponentTypes.INSET_TEXT, content: CONTENT, 'data-testid': ID };
        const { container } = render(getComponent(COMPONENT));

        const insetText = getByTestId(container, ID);
        expect(insetText.innerHTML).toContain(CONTENT);
        expect(insetText.tagName).toEqual('DIV');
        expect(insetText.classList).toContain('govuk-inset-text');
      });

      it('should return an appropriately rendered text component', () => {
        const ID = 'test-id';
        const FIELD_ID = 'field-id';
        const LABEL = 'label';
        const COMPONENT = {
          type: ComponentTypes.TEXT,
          id: ID,
          fieldId: FIELD_ID,
          label: LABEL,
          'data-testid': ID
        };
        const { container } = render(getComponent(COMPONENT));

        const [ formGroup, input ] = getAllByTestId(container, ID);
        expect(formGroup.tagName).toEqual('DIV');
        expect(formGroup.classList).toContain('govuk-form-group');
        let foundLabel = false;
        formGroup.childNodes.forEach(node => {
          // Check if it's an element.
          if (node instanceof Element && node.tagName === 'LABEL') {
            foundLabel = true;
            expect(node.innerHTML).toContain(LABEL);
            expect(node.getAttribute('for')).toEqual(ID);
          }
        });
        expect(foundLabel).toBeTruthy();
        expect(input.tagName).toEqual('INPUT');
        expect(input.classList).toContain('govuk-input');
        expect(input.id).toEqual(ID);
      });

      it('should return an appropriately rendered email component', () => {
        const ID = 'test-id';
        const FIELD_ID = 'field-id';
        const LABEL = 'label';
        const COMPONENT = {
          type: ComponentTypes.EMAIL,
          id: ID,
          fieldId: FIELD_ID,
          label: LABEL,
          'data-testid': ID
        };
        const { container } = render(getComponent(COMPONENT));

        const [ formGroup, input ] = getAllByTestId(container, ID);
        expect(formGroup.tagName).toEqual('DIV');
        expect(formGroup.classList).toContain('govuk-form-group');
        let foundLabel = false;
        formGroup.childNodes.forEach(node => {
          // Check if it's an element.
          if (node instanceof Element && node.tagName === 'LABEL') {
            foundLabel = true;
            expect(node.innerHTML).toContain(LABEL);
            expect(node.getAttribute('for')).toEqual(ID);
          }
        });
        expect(foundLabel).toBeTruthy();
        expect(input.tagName).toEqual('INPUT');
        expect(input.classList).toContain('govuk-input');
        expect(input.id).toEqual(ID);
      });

      it('should return an appropriately rendered phone-number component', () => {
        const ID = 'test-id';
        const FIELD_ID = 'field-id';
        const LABEL = 'label';
        const COMPONENT = {
          type: ComponentTypes.PHONE_NUMBER,
          id: ID,
          fieldId: FIELD_ID,
          label: LABEL,
          'data-testid': ID
        };
        const { container } = render(getComponent(COMPONENT));

        const [ formGroup, input ] = getAllByTestId(container, ID);
        expect(formGroup.tagName).toEqual('DIV');
        expect(formGroup.classList).toContain('govuk-form-group');
        let foundLabel = false;
        formGroup.childNodes.forEach(node => {
          // Check if it's an element.
          if (node instanceof Element && node.tagName === 'LABEL') {
            foundLabel = true;
            expect(node.innerHTML).toContain(LABEL);
            expect(node.getAttribute('for')).toEqual(ID);
          }
        });
        expect(foundLabel).toBeTruthy();
        expect(input.tagName).toEqual('INPUT');
        expect(input.classList).toContain('govuk-input');
        expect(input.id).toEqual(ID);
      });

      it('should return an appropriately rendered autocomplete component', () => {
        const ID = 'test-id';
        const FIELD_ID = 'field-id';
        const LABEL = 'label';
        const OPTIONS = [];
        const COMPONENT = {
          type: ComponentTypes.AUTOCOMPLETE,
          id: ID,
          fieldId: FIELD_ID,
          label: LABEL,
          data: { options: OPTIONS },
          'data-testid': ID
        };
        const { container } = render(getComponent(COMPONENT));

        const formGroup = getByTestId(container, ID);
        expect(formGroup.tagName).toEqual('DIV');
        expect(formGroup.classList).toContain('govuk-form-group');
        let foundLabel = false;
        let foundAutocomplete = false;
        formGroup.childNodes.forEach(node => {
          // Check if it's an element.
          if (node instanceof Element) {
            if (node.tagName === 'LABEL') {
              foundLabel = true;
              expect(node.innerHTML).toContain(LABEL);
              expect(node.getAttribute('for')).toEqual(ID);
            } else if (node.classList.contains('hods-autocomplete__outer-wrapper')) {
              expect(node.tagName).toEqual('DIV');
              const autocomplete = node.childNodes[0];
              if (autocomplete instanceof Element) {
                foundAutocomplete = true;
                expect(autocomplete.tagName).toEqual('DIV');
                let foundInput = false;
                autocomplete.childNodes.forEach(grandchild => {
                  if (grandchild instanceof Element) {
                    if (grandchild.tagName === 'INPUT') {
                      foundInput = true;
                      expect(grandchild.id).toEqual(ID);
                    }
                  }
                });
                expect(foundInput).toBeTruthy();
              };
            }
          }
        });
        expect(foundLabel).toBeTruthy();
        expect(foundAutocomplete).toBeTruthy();
      });

      it('should return an appropriately rendered phone-number component', () => {
        const ID = 'test-id';
        const FIELD_ID = 'field-id';
        const LABEL = 'label';
        const COMPONENT = {
          type: ComponentTypes.PHONE_NUMBER,
          id: ID,
          fieldId: FIELD_ID,
          label: LABEL,
          'data-testid': ID
        };
        const { container } = render(getComponent(COMPONENT));

        const [ formGroup, input ] = getAllByTestId(container, ID);
        expect(formGroup.tagName).toEqual('DIV');
        expect(formGroup.classList).toContain('govuk-form-group');
        let foundLabel = false;
        formGroup.childNodes.forEach(node => {
          // Check if it's an element.
          if (node instanceof Element && node.tagName === 'LABEL') {
            foundLabel = true;
            expect(node.innerHTML).toContain(LABEL);
            expect(node.getAttribute('for')).toEqual(ID);
          }
        });
        expect(foundLabel).toBeTruthy();
        expect(input.tagName).toEqual('INPUT');
        expect(input.classList).toContain('govuk-input');
        expect(input.id).toEqual(ID);
      });

      it('should return an appropriately rendered radios component', () => {
        const ID = 'test-id';
        const FIELD_ID = 'field-id';
        const LABEL = 'label';
        const OPTIONS = [
          { value: 'a', label: 'Alpha'}
        ];
        const COMPONENT = {
          type: ComponentTypes.RADIOS,
          id: ID,
          fieldId: FIELD_ID,
          label: LABEL,
          data: { options: OPTIONS },
          'data-testid': ID
        };
        const { container } = render(getComponent(COMPONENT));

        const [ formGroup, radios ] = getAllByTestId(container, ID);
        expect(formGroup.tagName).toEqual('DIV');
        expect(formGroup.classList).toContain('govuk-form-group');
        let foundLabel = false;
        formGroup.childNodes.forEach(node => {
          // Check if it's an element.
          if (node instanceof Element) {
            if (node.tagName === 'LABEL') {
              foundLabel = true;
              expect(node.innerHTML).toContain(LABEL);
              expect(node.getAttribute('for')).toEqual(ID);
            }
          }
        });
        expect(foundLabel).toBeTruthy();
        expect(radios.tagName).toEqual('DIV');
        expect(radios.classList).toContain('govuk-radios');
        expect(radios.childNodes.length).toEqual(OPTIONS.length);
        OPTIONS.forEach((option, index) => {
          const radio = radios.childNodes[index];
          expect(radio instanceof Element).toBeTruthy();
          if (radio instanceof Element) {
            expect(radio.tagName).toEqual('DIV');
            expect(radio.classList).toContain('govuk-radios__item');
            expect(radio.innerHTML).toContain(option.label);
          }
        });
      });

    });

  });

});
