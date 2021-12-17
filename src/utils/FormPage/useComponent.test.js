// Local imports
import useComponent from './useComponent';

describe('utils', () => {

  describe('FormPage', () => {

    describe('useComponent', () => {

      const FORM_COMPONENTS = [
        { id: 'a', fieldId: 'a', label: 'Alpha', type: 'text' },
        { id: 'b', fieldId: 'b', label: 'Bravo', type: 'text' },
        { id: 'c', fieldId: 'c', label: 'Charlie', type: 'text' }
      ];

      it('should handle a null toUse configuration', () => {
        const TO_USE = null;
        expect(useComponent(TO_USE, FORM_COMPONENTS)).toEqual({});
      });

      it('should handle an unrecognised component reference', () => {
        const TO_USE = { use: 'd', label: 'Delta' };
        expect(useComponent(TO_USE, FORM_COMPONENTS)).toEqual(TO_USE);
      });

      it('should use the appropriate component', () => {
        const TO_USE = { use: 'a' };
        const A = FORM_COMPONENTS[0];
        expect(useComponent(TO_USE, FORM_COMPONENTS)).toEqual({
          use: 'a',
          ...A,
          cya_label: A.label,
        });
      });

      it('should allow the fieldId to be overridden', () => {
        const TO_USE = { use: 'a', fieldId: 'alpha' };
        const A = FORM_COMPONENTS[0];
        expect(useComponent(TO_USE, FORM_COMPONENTS)).toEqual({
          use: 'a',
          ...A,
          cya_label: A.label,
          fieldId: TO_USE.fieldId
        });
      });

      it('should allow the label to be overridden but keep the cya_label unaffected', () => {
        const TO_USE = { use: 'a', label: 'Alpha foxtrot' };
        const A = FORM_COMPONENTS[0];
        expect(useComponent(TO_USE, FORM_COMPONENTS)).toEqual({
          use: 'a',
          ...A,
          cya_label: A.label,
          label: TO_USE.label
        });
      });

    });

  });

});
