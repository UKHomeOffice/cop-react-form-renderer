// Global imports
import { getAllByTestId, render } from '@testing-library/react';
import user from '@testing-library/user-event';

// Local imports
import { ComponentTypes } from '../../../models';
import getComponent from '../getComponent';

describe('utils.Component.get', () => {

  it('should return an appropriately rendered file component', () => {
    const ID = 'test-id';
    const FIELD_ID = 'field-id';
    const LABEL = 'label';
    const ON_CHANGE_CALLS = [];
    const ON_CHANGE = (e) => {
      ON_CHANGE_CALLS.push(e.target);
    };
    const COMPONENT = {
      type: ComponentTypes.FILE,
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
    expect(input.classList).toContain('hods-file-upload__select');
    expect(input.id).toEqual(`${ID}-select`);
    const str = JSON.stringify({ alpha: 'bravo' });
    const blob = new Blob([str]);
    const FILE = new File([blob], 'test.json', { type: 'application/JSON', });
    user.upload(input, FILE);
    expect(ON_CHANGE_CALLS.length).toEqual(1);
    expect(input.files.length).toEqual(1);
  });

});
