import getEditableComponents from './getEditableComponents';
import { EDITABLE_TYPES } from '../Component/isEditable';

describe('utils', () => {

  describe('FormPage', () => {

    describe('getEditableComponents', () => {
      const HTML = { type: 'html', tagName: 'p', content: 'Alpha' };
      const INSET_TEXT = { type: 'inset-text', content: 'Bravo' };
      const HEADING = { type: 'heading', size: 'm', content: 'Charlie' };

      it('should return an empty array for a null page', () => {
        expect(getEditableComponents(null)).toEqual([]);
      });

      it('should return an empty array for a page with no components', () => {
        expect(getEditableComponents({ components: []})).toEqual([]);
      });

      it('should return an empty array for a page with only non-editable components', () => {
        const COMPONENTS = [ HTML, INSET_TEXT, HEADING ];
        expect(getEditableComponents({ components: COMPONENTS})).toEqual([]);
      });

      EDITABLE_TYPES.forEach(type => {
        it(`should return just the "${type}" component if it exists in the components but no non-editable ones`, () => {
          const EDITABLE = { type };
          const COMPONENTS = [ HTML, EDITABLE, INSET_TEXT, HEADING ];
          expect(getEditableComponents({ components: COMPONENTS })).toEqual([ EDITABLE ]);
        });
      })

      it('should return all editable components and no non-editable ones', () => {
        const COMPONENTS = [ HTML, INSET_TEXT, HEADING ];
        EDITABLE_TYPES.forEach(type => {
          COMPONENTS.push({ type });
        })
        const RESULT = getEditableComponents({ components: COMPONENTS });
        expect(RESULT.length).toEqual(EDITABLE_TYPES.length);
        EDITABLE_TYPES.forEach(type => {
          expect(RESULT).toContainEqual({ type });
        });
      });

    });

  });

});
