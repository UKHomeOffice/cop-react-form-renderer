// Global imports
import { render } from '@testing-library/react';
// Local imports
import { getChildrenJsx } from '../getComponent';
import { renderWithValidation } from '../../../setupTests';

describe('utils.Component.get', () => {
  it('should return components that are nested within another component', async () => {
    const ID = 'testId';
    const FIELD_ID = 'fieldId';
    const LABEL = 'Test label';
    const ID2 = 'testId2';
    const FIELD_ID2 = 'fieldId2';
    const LABEL2 = 'Test label 2';
    const VALUE = 'nestedValue';
    const VALUE2 = '1-2-2022';
    const PARENT_CONFIG = {
      onChange: () => {},
      formData: {
        [FIELD_ID]: VALUE,
        [FIELD_ID2]: VALUE2,
      },
    };
    const NESTED_CONFIG = [
      {
        id: ID,
        fieldId: FIELD_ID,
        label: LABEL,
        type: 'text',
      },
      {
        id: ID2,
        fieldId: FIELD_ID2,
        label: LABEL2,
        type: 'date',
      },
    ];
    const { container } = renderWithValidation(getChildrenJsx(PARENT_CONFIG, NESTED_CONFIG));
    const child = container.childNodes[0];
    expect(child.childNodes.length).toEqual(3);
    expect(child.classList).toContain('govuk-form-group');

    const label = child.childNodes[0];
    expect(label).toBeDefined();
    expect(label.innerHTML).toContain(LABEL);

    const input = child.childNodes[2];
    expect(input.tagName).toEqual('INPUT');
    expect(input.classList).toContain('govuk-input');
    expect(input.id).toEqual(ID);
    expect(input.value).toEqual(VALUE);


    const child2 = container.childNodes[1];
    expect(child2.childNodes.length).toEqual(3);
    expect(child2.classList).toContain('govuk-form-group');

    const label2 = child2.childNodes[0];
    expect(label2).toBeDefined();
    expect(label2.innerHTML).toContain(LABEL2);

    const input2 = child2.childNodes[2];
    expect(input2.tagName).toEqual('DIV');
    expect(input2.classList).toContain('govuk-date-input');
    expect(input2.id).toEqual(ID2);
    expect(input2.childNodes[0].childNodes[1].value).toEqual('1');
    expect(input2.childNodes[1].childNodes[1].value).toEqual('2');
    expect(input2.childNodes[2].childNodes[1].value).toEqual('2022');
  });

  it('should return a read only component that is nested within another readonly component', async () => {
    const ID = 'testId';
    const FIELD_ID = 'fieldId';
    const LABEL = 'Test label';
    const VALUE = 'nestedValue';
    const PARENT_CONFIG = {
      onChange: () => {},
      formData: {
        [FIELD_ID]: VALUE,
      },
      readonly: true,
    };
    const NESTED_CONFIG = [
      {
        id: ID,
        fieldId: FIELD_ID,
        label: LABEL,
        type: 'text',
        readonly: true,
      },
    ];
    const { container } = render(getChildrenJsx(PARENT_CONFIG, NESTED_CONFIG));
    const child = container.childNodes[0].childNodes[0];
    expect(child.classList).toContain('hods-readonly');
  });
});
