// Local imports
import { ComponentTypes } from '../../models';
import { expectObjectLike } from '../../setupTests';
import getCYARowsForContainer from './getCYARowsForContainer';

describe('utils.CheckYourAnswers.getCYARowsForContainer', () => {

  it('should get an appropriate row for a container with a single readonly text component', () => {
    const FORM_DATA = {
      container: {
        a: 'Bravo'
      }
    };
    const PAGE = { id: 'page', formData: FORM_DATA, cya_link: {} };
    const COMPONENT = { type: 'text', readonly: true, id: 'a', fieldId: 'a', label: 'Alpha' };
    const CONTAINER = {
      id: 'container',
      fieldId: 'container',
      type: ComponentTypes.CONTAINER,
      components: [ COMPONENT ],
      value: FORM_DATA.container,
      formData: FORM_DATA
    };
    const ON_ACTION = () => {};
    const ROWS = getCYARowsForContainer(PAGE, CONTAINER, FORM_DATA.container, ON_ACTION);
    expect(ROWS.length).toEqual(1);
    ROWS.forEach((row, index) => {
      expectObjectLike(row, {
        pageId: PAGE.id,
        fieldId: CONTAINER.components[index].fieldId,
        key: CONTAINER.components[index].label,
        action: null,
        component: COMPONENT,
        value: 'Bravo'
      });
    });
  });

  it('should get appropriate rows for a container with two editable text components', () => {
    const FORM_DATA = {
      container: {
        a: 'Alpha Charlie',
        b: 'Bravo Charlie'
      }
    };
    const PAGE = { id: 'page', formData: FORM_DATA, cya_link: {} };
    const COMPONENT_A = { type: 'text', id: 'a', fieldId: 'a', label: 'Alpha' };
    const COMPONENT_B = { type: 'text', id: 'b', fieldId: 'b', label: 'Bravo' };
    const CONTAINER = {
      id: 'container',
      fieldId: 'container',
      type: ComponentTypes.CONTAINER,
      components: [ COMPONENT_A, COMPONENT_B ],
      value: FORM_DATA.container,
      formData: FORM_DATA
    };
    const ON_ACTION = () => {};
    const ROWS = getCYARowsForContainer(PAGE, CONTAINER, FORM_DATA.container, ON_ACTION);
    expect(ROWS.length).toEqual(2);
    ROWS.forEach((row, index) => {
      expectObjectLike(row, {
        pageId: PAGE.id,
        fieldId: CONTAINER.components[index].fieldId,
        key: CONTAINER.components[index].label,
        component: CONTAINER.components[index],
        value: `${CONTAINER.components[index].label} Charlie`
      });
      expectObjectLike(row.action, { onAction: ON_ACTION });
    });
  });

  it(`should filter out any components that shouldn't be shown`, () => {
    const FORM_DATA = {
      container: {
        a: 'Alpha Charlie',
        b: 'Bravo Charlie'
      }
    };
    const PAGE = { id: 'page', formData: FORM_DATA, cya_link: {} };
    const COMPONENT_A = { type: 'text', id: 'a', fieldId: 'a', label: 'Alpha' };
    const COMPONENT_B = { type: 'text', id: 'b', fieldId: 'b', label: 'Bravo' };
    const COMPONENT_C = { type: 'heading', content: 'Heading component' };
    const CONTAINER = {
      id: 'container',
      fieldId: 'container',
      type: ComponentTypes.CONTAINER,
      components: [ COMPONENT_A, COMPONENT_B, COMPONENT_C ],
      value: FORM_DATA.container,
      formData: FORM_DATA
    };
    const ON_ACTION = () => {};
    const ROWS = getCYARowsForContainer(PAGE, CONTAINER, FORM_DATA.container, ON_ACTION);
    expect(ROWS.length).toEqual(2);
    ROWS.forEach((row, index) => {
      expectObjectLike(row, {
        pageId: PAGE.id,
        fieldId: CONTAINER.components[index].fieldId,
        key: CONTAINER.components[index].label,
        component: CONTAINER.components[index],
        value: `${CONTAINER.components[index].label} Charlie`
      });
      expectObjectLike(row.action, { onAction: ON_ACTION });
    });
  });

  it('should get an appropriate row for a container with a single readonly text component inside a nested container', () => {
    const FORM_DATA = {
      container: {
        nested: {
          a: 'Bravo'
        }
      }
    };
    const PAGE = { id: 'page', formData: FORM_DATA, cya_link: {} };
    const COMPONENT = { type: 'text', readonly: true, id: 'a', fieldId: 'a', label: 'Alpha' };
    const NESTED_CONTAINER = {
      id: 'nested',
      fieldId: 'nested',
      type: ComponentTypes.CONTAINER,
      components: [ COMPONENT ],
      value: FORM_DATA.container.nested,
      formData: FORM_DATA
    };
    const CONTAINER = {
      id: 'container',
      fieldId: 'container',
      type: ComponentTypes.CONTAINER,
      components: [ NESTED_CONTAINER ],
      value: FORM_DATA.container,
      formData: FORM_DATA
    };
    const ON_ACTION = () => {};
    const ROWS = getCYARowsForContainer(PAGE, CONTAINER, FORM_DATA.container, ON_ACTION);
    expect(ROWS.length).toEqual(1);
    ROWS.forEach((row, index) => {
      expectObjectLike(row, {
        pageId: PAGE.id,
        fieldId: NESTED_CONTAINER.components[index].fieldId,
        key: NESTED_CONTAINER.components[index].label,
        action: null,
        component: COMPONENT,
        value: 'Bravo'
      });
    });
  });

  it('should get an appropriate row for a container with a single readonly text component inside a nested container but no formData', () => {
    const FORM_DATA = undefined;
    const PAGE = { id: 'page', formData: FORM_DATA, cya_link: {} };
    const COMPONENT = { type: 'text', readonly: true, id: 'a', fieldId: 'a', label: 'Alpha' };
    const NESTED_CONTAINER = {
      id: 'nested',
      fieldId: 'nested',
      type: ComponentTypes.CONTAINER,
      components: [ COMPONENT ]
    };
    const CONTAINER = {
      id: 'container',
      fieldId: 'container',
      type: ComponentTypes.CONTAINER,
      components: [ NESTED_CONTAINER ]
    };
    const ON_ACTION = () => {};
    const ROWS = getCYARowsForContainer(PAGE, CONTAINER, undefined, ON_ACTION);
    expect(ROWS.length).toEqual(1);
    ROWS.forEach((row, index) => {
      expectObjectLike(row, {
        pageId: PAGE.id,
        fieldId: NESTED_CONTAINER.components[index].fieldId,
        key: NESTED_CONTAINER.components[index].label,
        action: null,
        component: COMPONENT,
        value: ''
      });
    });
  });
  
});
