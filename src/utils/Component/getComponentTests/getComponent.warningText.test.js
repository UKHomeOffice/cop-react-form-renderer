// Global imports
import { getByTestId, render } from '@testing-library/react';

// Local imports
import { ComponentTypes } from '../../../models';
import getComponent from '../getComponent';

describe('utils.Component.get', () => {

  it('should return an appropriately rendered warning-tet component', () => {
    const ID = 'test-id';
    const CONTENT = 'Warning Text';
    const COMPONENT = { type: ComponentTypes.WARNING_TEXT, content: CONTENT, 'data-testid': ID };
    const { container } = render(getComponent(COMPONENT));

    const warningText = getByTestId(container, ID);
    expect(warningText.innerHTML).toContain(CONTENT);
    expect(warningText.tagName).toEqual('DIV');
    expect(warningText.classList).toContain('govuk-warning-text');
  });

});