// Global imports
import { render } from '@testing-library/react';

// Local imports
import { ComponentTypes } from '../../../models';
import getComponent from '../getComponent';

describe('utils.Component.get', () => {

  it('should return a details component containing basic text', () => {
    const ID = 'test-id';
    const CONTENT = 'Details content';
    const SUMMARY = 'Details Summary';
    const COMPONENT = { type: ComponentTypes.DETAILS, content: CONTENT, summary: SUMMARY , 'data-testid': ID };
    const { container } = render(getComponent(COMPONENT));

    const details = container.querySelector('details');
    expect(details.classList).toContain('hods-details');
    expect(details.childNodes[0].textContent).toEqual(SUMMARY);
    expect(details.childNodes[1].textContent).toEqual(CONTENT);
  });

  it('should return a details component containing multiple html components', () => {
    const ID = 'test-id';
    const CONTENT = '<p>this is the content</p><ol><li>one</li><li>two</li></ol><p>second section of content</p>';
    const SUMMARY = 'Details Summary';
    const COMPONENT = { type: ComponentTypes.DETAILS, content: CONTENT, summary: SUMMARY , 'data-testid': ID };
    const { container } = render(getComponent(COMPONENT));

    const details = container.querySelector('details');
    expect(details.classList).toContain('hods-details');
    expect(details.childNodes[1].childNodes[0].childNodes[0].textContent).toEqual('this is the content');
    expect(details.childNodes[1].childNodes[0].childNodes[0].tagName).toEqual('P');
    expect(details.childNodes[1].childNodes[0].childNodes[1].childNodes[0].textContent).toEqual('one');
    expect(details.childNodes[1].childNodes[0].childNodes[1].childNodes[1].textContent).toEqual('two');
    expect(details.childNodes[1].childNodes[0].childNodes[1].tagName).toEqual('OL');
    expect(details.childNodes[1].childNodes[0].childNodes[2].textContent).toEqual('second section of content');
    expect(details.childNodes[1].childNodes[0].childNodes[2].tagName).toEqual('P');
  });

});
