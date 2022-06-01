// Local imports
import getCYARow from './getCYARow';

describe('utils', () => {

  describe('CheckYourAnswers', () => {
    
    describe('getCYARow', () => {

      const expectObjectLike = (received, expected) => {
        Object.keys(expected).forEach(key => {
          expect(received[key]).toEqual(expected[key]);
        });
      };

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

    });

  });

});
