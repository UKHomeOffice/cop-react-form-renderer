// Local imports
import { expectObjectLike } from '../../setupTests';
import getCYARow from './getCYARow';

describe('utils', () => {

  describe('CheckYourAnswers', () => {
    
    describe('getCYARow', () => {

      it('should get an appropriate row for a readonly text component', () => {
        const PAGE = { id: 'page', formData: { a: 'Bravo' } };
        const COMPONENT = { type: 'text', readonly: true, id: 'a', fieldId: 'a', label: 'Alpha' };
        const ON_ACTION = () => {};
        const ROW = getCYARow(PAGE, COMPONENT, ON_ACTION);
        expectObjectLike(ROW, {
          pageId: PAGE.id,
          fieldId: COMPONENT.fieldId,
          key: COMPONENT.label,
          value: 'Bravo',
          component: COMPONENT,
          action: null
        });
      });

      it('should get an appropriate row for a readonly text component with no value', () => {
        const PAGE = { id: 'page', formData: {} };
        const COMPONENT = { type: 'text', readonly: true, id: 'a', fieldId: 'a', label: 'Alpha' };
        const ON_ACTION = () => {};
        expect(getCYARow(PAGE, COMPONENT, ON_ACTION)).toEqual({
          pageId: PAGE.id,
          id: COMPONENT.id,
          fieldId: COMPONENT.fieldId,
          key: COMPONENT.label,
          value: '',
          component: COMPONENT,
          action: null
        });
      });

      it('should get an appropriate row for a readonly non-editable component', () => {
        const PAGE = { id: 'page', formData: { a: 'BLAH' } };
        const COMPONENT = { type: 'blah', readonly: true, id: 'a', fieldId: 'a', label: 'Alpha' };
        const ON_ACTION = () => {};
        expect(getCYARow(PAGE, COMPONENT, ON_ACTION)).toEqual({
          pageId: PAGE.id,
          id: COMPONENT.id,
          fieldId: COMPONENT.fieldId,
          key: COMPONENT.label,
          value: 'BLAH',
          action: null
        });
      });

      it('should use the cya_label where there is no label', () => {
        const PAGE = { id: 'page', formData: { a: 'Bravo' } };
        const COMPONENT = { type: 'text', readonly: true, id: 'a', fieldId: 'a', cya_label: 'CYA Alpha' };
        const ON_ACTION = () => {};
        const ROW = getCYARow(PAGE, COMPONENT, ON_ACTION);
        expectObjectLike(ROW, {
          pageId: PAGE.id,
          fieldId: COMPONENT.fieldId,
          key: COMPONENT.cya_label,
          action: null,
          component: COMPONENT,
          value: 'Bravo'
        });
      });

      it('should get an appropriate row for an editable text component', () => {
        const PAGE = { id: 'page', formData: { a: 'Bravo' }, cya_link: {} };
        const COMPONENT = { type: 'text', id: 'a', fieldId: 'a', label: 'Alpha' };
        const ON_ACTION = () => {};
        const ROW = getCYARow(PAGE, COMPONENT, ON_ACTION);
        expectObjectLike(ROW, {
          pageId: PAGE.id,
          fieldId: COMPONENT.fieldId,
          key: COMPONENT.label,
          component: COMPONENT,
          value: 'Bravo'
        });
        expectObjectLike(ROW.action, { onAction: ON_ACTION });
      });

      it('should update any nested components with corresponding values from the stored formdata', () => {
        const SELECTED_VALUE = 'selectedValue';
        const NESTED_ID = 'nestedId';
        const NESTED_VALUE = 'nestedValue';
        const PAGE = { id: 'page', formData: { a: SELECTED_VALUE, [NESTED_ID]: NESTED_VALUE }, cya_link: {} };
        const COMPONENT = {
          type: 'radios',
          id: 'a',
          fieldId: 'a',
          data: {
            options: [
              {
                value: SELECTED_VALUE,
                nested: [
                  {
                    id: NESTED_ID,
                  },
                ],
              },
            ],
          },
        }; 
        const ROW = getCYARow(PAGE, COMPONENT, () => {});
        expect(ROW.component.data.options[0].nested[0].value).toEqual(NESTED_VALUE);
      });

      it('should handle an undefined formData when attempting to set nested values', () => {
        const SELECTED_VALUE = 'selectedValue';
        const NESTED_ID = 'nestedId';
        const PAGE = { id: 'page', cya_link: {} };
        const COMPONENT = {
          type: 'radios',
          id: 'a',
          fieldId: 'a',
          data: {
            options: [
              {
                value: SELECTED_VALUE,
                nested: [
                  {
                    id: NESTED_ID,
                  },
                ],
              },
            ],
          },
        }; 
        const ROW = getCYARow(PAGE, COMPONENT, () => {});
        expect(ROW.component.data.options[0].nested[0].value).toBeUndefined();
      });

    });

  });

});
