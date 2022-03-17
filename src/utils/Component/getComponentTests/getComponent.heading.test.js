// Global imports
import { getByTestId, render } from '@testing-library/react';

// Local imports
import { ComponentTypes } from '../../../models';
import getComponent from '../getComponent';

describe('utils.Component.get', () => {

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

});
