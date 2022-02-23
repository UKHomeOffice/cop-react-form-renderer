// Global imports
import { fireEvent, getAllByTestId, getByTestId, render } from '@testing-library/react';

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
        expect(heading.tagName).toEqual('H2');
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
        const ON_CHANGE_CALLS = [];
        const ON_CHANGE = (e) => {
          ON_CHANGE_CALLS.push(e.target);
        };
        const COMPONENT = {
          type: ComponentTypes.TEXT,
          id: ID,
          fieldId: FIELD_ID,
          label: LABEL,
          onChange: ON_CHANGE,
          'data-testid': ID
        };
        const { container } = render(getComponent(COMPONENT));

        const [ formGroup, input ] = getAllByTestId(container, ID);
        expect(formGroup.tagName).toEqual('DIV');
        expect(formGroup.classList).toContain('govuk-form-group');
        let label = undefined;
        formGroup.childNodes.forEach(node => {
          // Check if it's an element.
          if (node instanceof Element && node.tagName === 'LABEL') {
            label = node;
          }
        });
        expect(label).toBeDefined();
        expect(label.innerHTML).toContain(LABEL);
        expect(label.getAttribute('for')).toEqual(ID);
        expect(input.tagName).toEqual('INPUT');
        expect(input.classList).toContain('govuk-input');
        expect(input.id).toEqual(ID);
        fireEvent.change(input, { target: { name: FIELD_ID, value: 'blah' }});
        expect(ON_CHANGE_CALLS.length).toEqual(1);
        expect(ON_CHANGE_CALLS[0]).toMatchObject({
          name: FIELD_ID,
          value: 'blah'
        });
      });

      it('should return an appropriately rendered email component', () => {
        const ID = 'test-id';
        const FIELD_ID = 'field-id';
        const LABEL = 'label';
        const ON_CHANGE_CALLS = [];
        const ON_CHANGE = (e) => {
          ON_CHANGE_CALLS.push(e.target);
        };
        const COMPONENT = {
          type: ComponentTypes.EMAIL,
          id: ID,
          fieldId: FIELD_ID,
          label: LABEL,
          onChange: ON_CHANGE,
          'data-testid': ID
        };
        const { container } = render(getComponent(COMPONENT));

        const [ formGroup, input ] = getAllByTestId(container, ID);
        expect(formGroup.tagName).toEqual('DIV');
        expect(formGroup.classList).toContain('govuk-form-group');
        let label = undefined;
        formGroup.childNodes.forEach(node => {
          // Check if it's an element.
          if (node instanceof Element && node.tagName === 'LABEL') {
            label = node;
          }
        });
        expect(label).toBeDefined();
        expect(label.innerHTML).toContain(LABEL);
        expect(label.getAttribute('for')).toEqual(ID);
        expect(input.tagName).toEqual('INPUT');
        expect(input.classList).toContain('govuk-input');
        expect(input.id).toEqual(ID);
        fireEvent.change(input, { target: { name: FIELD_ID, value: 'a.b@homeoffice.gov.uk' }});
        expect(ON_CHANGE_CALLS.length).toEqual(1);
        expect(ON_CHANGE_CALLS[0]).toMatchObject({
          name: FIELD_ID,
          value: 'a.b@homeoffice.gov.uk'
        });
      });

      it('should return an appropriately rendered phone-number component', () => {
        const ID = 'test-id';
        const FIELD_ID = 'field-id';
        const LABEL = 'label';
        const ON_CHANGE_CALLS = [];
        const ON_CHANGE = (e) => {
          ON_CHANGE_CALLS.push(e.target);
        };
        const COMPONENT = {
          type: ComponentTypes.PHONE_NUMBER,
          id: ID,
          fieldId: FIELD_ID,
          label: LABEL,
          onChange: ON_CHANGE,
          'data-testid': ID
        };
        const { container } = render(getComponent(COMPONENT));

        const [ formGroup, input ] = getAllByTestId(container, ID);
        expect(formGroup.tagName).toEqual('DIV');
        expect(formGroup.classList).toContain('govuk-form-group');
        let label = undefined;
        formGroup.childNodes.forEach(node => {
          // Check if it's an element.
          if (node instanceof Element && node.tagName === 'LABEL') {
            label = node;
          }
        });
        expect(label).toBeDefined();
        expect(label.innerHTML).toContain(LABEL);
        expect(label.getAttribute('for')).toEqual(ID);
        expect(input.tagName).toEqual('INPUT');
        expect(input.classList).toContain('govuk-input');
        expect(input.id).toEqual(ID);
        fireEvent.change(input, { target: { name: FIELD_ID, value: '07777' }});
        expect(ON_CHANGE_CALLS.length).toEqual(1);
        expect(ON_CHANGE_CALLS[0]).toMatchObject({
          name: FIELD_ID,
          value: '07777'
        });
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
        let label = undefined;
        let autocompleteWrapper = undefined;
        let autocomplete = undefined;
        let autocompleteInput = undefined;
        formGroup.childNodes.forEach(node => {
          // Check if it's an element.
          if (node instanceof Element) {
            if (node.tagName === 'LABEL') {
              label = node;
            } else if (node.classList.contains('hods-autocomplete__outer-wrapper')) {
              autocompleteWrapper = node;
              const autocompleteInner = node.childNodes[0];
              if (autocompleteInner instanceof Element) {
                autocomplete = autocompleteInner;
                autocomplete.childNodes.forEach(grandchild => {
                  if (grandchild instanceof Element) {
                    if (grandchild.tagName === 'INPUT') {
                      autocompleteInput = grandchild;
                    }
                  }
                });
              };
            }
          }
        });
        expect(label).toBeDefined();
        expect(label.innerHTML).toContain(LABEL);
        expect(label.getAttribute('for')).toEqual(ID);
        expect(autocompleteWrapper).toBeDefined();
        expect(autocompleteWrapper.tagName).toEqual('DIV');
        expect(autocomplete).toBeDefined();
        expect(autocomplete.tagName).toEqual('DIV');
        expect(autocompleteInput).toBeDefined();
        expect(autocompleteInput.id).toEqual(ID);

        // TODO: Ensure that the onChange handler is fired.
        // Not sure quite what this looks like yet so I'll address it later.
      });

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
  
      it('should return an appropriately rendered checkboxes component', () => {
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
          type: ComponentTypes.CHECKBOXES,
          id: ID,
          fieldId: FIELD_ID,
          label: LABEL,
          data: { options: OPTIONS },
          onChange: ON_CHANGE,
          'data-testid': ID
        };
        const { container } = render(getComponent(COMPONENT));
    
        const [ formGroup, checkboxes ] = getAllByTestId(container, ID);
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
        expect(checkboxes.tagName).toEqual('DIV');
        expect(checkboxes.classList).toContain('govuk-checkboxes');
        expect(checkboxes.childNodes.length).toEqual(OPTIONS.length);
        let checkboxItems = [];
        OPTIONS.forEach((_, index) => {
          const checkbox = checkboxes.childNodes[index];
          expect(checkbox instanceof Element).toBeTruthy();
          if (checkbox instanceof Element) {
            checkboxItems.push(checkbox);
          }
        });
        expect(checkboxItems.length).toEqual(OPTIONS.length);
        OPTIONS.forEach((option, index) => {
          const checkbox = checkboxItems[index];
          expect(checkbox.tagName).toEqual('DIV');
          expect(checkbox.classList).toContain('govuk-checkboxes__item');
          const [input, label] = checkbox.childNodes;
          expect(input.tagName).toEqual('INPUT');
          expect(input.type).toEqual('checkbox');
          expect(label.textContent).toEqual(option.label);
        });
    
        // TODO: Ensure that the onChange handler is fired.
        // fireEvent.click(checkboxItems[0].childNodes[0]); // alpha
        // expect(ON_CHANGE_CALLS.length).toEqual(1);
        // expect(ON_CHANGE_CALLS[0]).toMatchObject({
        //   name: FIELD_ID,
        //   value: [ OPTIONS[0].value ]
        // });
        // fireEvent.click(checkboxItems[1].childNodes[0]); // beta
        // expect(ON_CHANGE_CALLS.length).toEqual(2);
        // expect(ON_CHANGE_CALLS[1]).toMatchObject({
        //   name: FIELD_ID,
        //   value: [ OPTIONS[0].value, OPTIONS[1].value ]
        // });
        // fireEvent.click(checkboxItems[0].childNodes[0]); // alpha (unchecked this time)
        // expect(ON_CHANGE_CALLS.length).toEqual(3);
        // expect(ON_CHANGE_CALLS[2]).toMatchObject({
        //   name: FIELD_ID,
        //   value: [ OPTIONS[1].value ]
        // });
      });

    });

  });

});
