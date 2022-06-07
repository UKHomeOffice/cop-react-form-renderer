// Local imports
import { ComponentTypes } from '../../models';
import { expectObjectLike } from '../../setupTests';
import getCYARowsForCollection from './getCYARowsForCollection';

describe('utils.CheckYourAnswers.getCYARowsForCollection', () => {

  it('should get no rows when there are no items', () => {
    const FORM_DATA = undefined;
    const PAGE = { id: 'page', formData: FORM_DATA, cya_link: {} };
    const COMPONENT = { type: 'text', readonly: true, id: 'a', fieldId: 'a', label: 'Alpha' };
    const COLLECTION = {
      id: 'collection',
      fieldId: 'collection',
      type: ComponentTypes.COLLECTION,
      item: [ COMPONENT ]
    };
    const ON_ACTION = () => {};
    const ROWS = getCYARowsForCollection(PAGE, COLLECTION, undefined, ON_ACTION);
    expect(ROWS.length).toEqual(0);
  });

  it('should get an appropriate row for a collection with a single readonly text component', () => {
    const FORM_DATA = {
      collection: [
        { a: 'Bravo' }
      ]
    };
    const PAGE = { id: 'page', formData: FORM_DATA, cya_link: {} };
    const COMPONENT = { type: 'text', readonly: true, id: 'a', fieldId: 'a', label: 'Alpha' };
    const COLLECTION = {
      id: 'collection',
      fieldId: 'collection',
      type: ComponentTypes.COLLECTION,
      itemLabel: 'Item ${index}',
      countOffset: 22,
      item: [ COMPONENT ],
      value: FORM_DATA.collection,
      formData: FORM_DATA
    };
    const ON_ACTION = () => {};
    const ROWS = getCYARowsForCollection(PAGE, COLLECTION, FORM_DATA.collection, ON_ACTION);
    expect(ROWS.length).toEqual(2); // Item title row + component row
    expectObjectLike(ROWS[0], {
      pageId: PAGE.id,
      fieldId: COLLECTION.fieldId,
      full_path: `${COLLECTION.fieldId}[0]`,
      key: 'Item 23', // includes countOffset
      type: 'title',
      action: null
    });
    expectObjectLike(ROWS[1], {
      pageId: PAGE.id,
      fieldId: COMPONENT.fieldId,
      full_path: `${COLLECTION.fieldId}[0].${COMPONENT.fieldId}`,
      key: COMPONENT.label,
      action: null,
      component: {
        ...COMPONENT,
        full_path: `${COLLECTION.fieldId}[0].${COMPONENT.fieldId}`
      },
      value: 'Bravo'
    });
  });

  it('should get an appropriate row for a collection with a single readonly text component where there is no itemLabel', () => {
    const FORM_DATA = {
      collection: [
        { a: 'Bravo' }
      ]
    };
    const PAGE = { id: 'page', formData: FORM_DATA, cya_link: {} };
    const COMPONENT = { type: 'text', readonly: true, id: 'a', fieldId: 'a', label: 'Alpha' };
    const COLLECTION = {
      id: 'collection',
      fieldId: 'collection',
      type: ComponentTypes.COLLECTION,
      countOffset: 22,
      item: [ COMPONENT ],
      value: FORM_DATA.collection,
      formData: FORM_DATA
    };
    const ON_ACTION = () => {};
    const ROWS = getCYARowsForCollection(PAGE, COLLECTION, FORM_DATA.collection, ON_ACTION);
    expect(ROWS.length).toEqual(1); // Just the component row, no title row
    expectObjectLike(ROWS[0], {
      pageId: PAGE.id,
      fieldId: COMPONENT.fieldId,
      full_path: `${COLLECTION.fieldId}[0].${COMPONENT.fieldId}`,
      key: COMPONENT.label,
      action: null,
      component: {
        ...COMPONENT,
        full_path: `${COLLECTION.fieldId}[0].${COMPONENT.fieldId}`
      },
      value: 'Bravo'
    });
  });

  it('should interpolate a field label appropriately', () => {
    const FORM_DATA = {
      collection: [
        { a: 'Bravo' }
      ]
    };
    const PAGE = { id: 'page', formData: FORM_DATA, cya_link: {} };
    const COMPONENT = { type: 'text', readonly: true, id: 'a', fieldId: 'a', label: 'Alpha ${index}' };
    const COLLECTION = {
      id: 'collection',
      fieldId: 'collection',
      type: ComponentTypes.COLLECTION,
      item: [ COMPONENT ],
      value: FORM_DATA.collection,
      formData: FORM_DATA
    };
    const ON_ACTION = () => {};
    const ROWS = getCYARowsForCollection(PAGE, COLLECTION, FORM_DATA.collection, ON_ACTION);
    expect(ROWS.length).toEqual(1); // Just the component row, no title row
    expectObjectLike(ROWS[0], {
      pageId: PAGE.id,
      fieldId: COMPONENT.fieldId,
      full_path: `${COLLECTION.fieldId}[0].${COMPONENT.fieldId}`,
      key: 'Alpha 1', // no countOffset
      action: null,
      component: {
        ...COMPONENT,
        full_path: `${COLLECTION.fieldId}[0].${COMPONENT.fieldId}`,
        label: 'Alpha 1', // no countOffset
      },
      value: 'Bravo'
    });
  });
  
});
