// Global imports
import { getByTestId, render } from '@testing-library/react';

// Local imports
import { ComponentTypes } from '../../../models';
import getComponent from '../getComponent';

describe('utils.Component.get', () => {

  it('should return an appropriately rendered inset-text component', () => {
    const ID = 'test-id';
    const CONTENT = 'Inset text';
    const COMPONENT = { type: ComponentTypes.INSET_TEXT, content: CONTENT, 'data-testid': ID };
    const { container } = render(getComponent(COMPONENT));

    const insetText = getByTestId(container, ID);
    expect(insetText.innerHTML).toContain(CONTENT);
    expect(insetText.tagName).toEqual('DIV');
    expect(insetText.classList).toContain('govuk-inset-text');
  });

});
