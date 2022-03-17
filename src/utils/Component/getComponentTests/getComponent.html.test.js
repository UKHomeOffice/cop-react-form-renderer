// Global imports
import { getByTestId, render } from '@testing-library/react';

// Local imports
import { ComponentTypes } from '../../../models';
import getComponent from '../getComponent';

describe('utils.Component.get', () => {

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

});
