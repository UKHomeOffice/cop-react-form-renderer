// Global imports
import { getByTestId, render } from '@testing-library/react';

// Local imports
import { ComponentTypes } from '../../../models';
import getComponent from '../getComponent';

describe('utils.Component.get', () => {

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

});
