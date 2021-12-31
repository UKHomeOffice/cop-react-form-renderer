// Local imports
import getCYARowsForPage from './getCYARowsForPage';

describe('utils', () => {

  describe('CheckYourAnswers', () => {
    
    describe('getCYARowsForPage', () => {

      const expectObjectLike = (received, expected) => {
        Object.keys(expected).forEach(key => {
          expect(received[key]).toEqual(expected[key]);
        });
      };

      it('should get a appropriate row for a page with a single readonly text component', () => {
        const COMPONENT = { type: 'text', readonly: true, id: 'a', fieldId: 'a', label: 'Alpha' };
        const PAGE = {
          id: 'page',
          components: [ COMPONENT ],
          formData: { a: 'Bravo' }
        };
        const ON_ACTION = () => {};
        const ROWS = getCYARowsForPage(PAGE, ON_ACTION);
        expect(ROWS.length).toEqual(1);
        ROWS.forEach((row, index) => {
          expectObjectLike(row, {
            pageId: PAGE.id,
            fieldId: PAGE.components[index].fieldId,
            key: PAGE.components[index].label,
            action: null,
            component: COMPONENT,
            value: 'Bravo'
          });
        });
      });

      it('should get appropriate rows for a page with two editable text components', () => {
        const COMPONENT_A = { type: 'text', id: 'a', fieldId: 'a', label: 'Alpha' };
        const COMPONENT_B = { type: 'text', id: 'b', fieldId: 'b', label: 'Bravo' };
        const PAGE = {
          id: 'page',
          components: [ COMPONENT_A, COMPONENT_B ],
          formData: { a: 'Alpha Charlie', b: 'Bravo Charlie' },
          cya_link: {}
        };
        const ON_ACTION = () => {};
        const ROWS = getCYARowsForPage(PAGE, ON_ACTION);
        expect(ROWS.length).toEqual(2);
        ROWS.forEach((row, index) => {
          expectObjectLike(row, {
            pageId: PAGE.id,
            fieldId: PAGE.components[index].fieldId,
            key: PAGE.components[index].label,
            component: PAGE.components[index],
            value: `${PAGE.components[index].label} Charlie`
          });
          expectObjectLike(row.action, { onAction: ON_ACTION });
        });
      });

      it(`should filter out any components that shouldn't be shown`, () => {
        const COMPONENT_A = { type: 'text', id: 'a', fieldId: 'a', label: 'Alpha' };
        const COMPONENT_B = { type: 'text', id: 'b', fieldId: 'b', label: 'Bravo' };
        const COMPONENT_C = { type: 'heading', content: 'Heading component' };
        const PAGE = {
          id: 'page',
          components: [ COMPONENT_A, COMPONENT_B, COMPONENT_C ],
          formData: { a: 'Alpha Charlie', b: 'Bravo Charlie' },
          cya_link: {}
        };
        const ON_ACTION = () => {};
        const ROWS = getCYARowsForPage(PAGE, ON_ACTION);
        expect(ROWS.length).toEqual(2);
        ROWS.forEach((row, index) => {
          expectObjectLike(row, {
            pageId: PAGE.id,
            fieldId: PAGE.components[index].fieldId,
            key: PAGE.components[index].label,
            component: PAGE.components[index],
            value: `${PAGE.components[index].label} Charlie`
          });
          expectObjectLike(row.action, { onAction: ON_ACTION });
        });
      });
      
    });

  });

});
