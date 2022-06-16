// Local imports
import showComponent from './showComponent';

describe('utils', () => {

  describe('Component', () => {
    
    describe('show', () => {

      it('should not show when there are no options', () => {
        expect(showComponent(null, null)).toBeFalsy();
      });

      it('should not show when hidden and disabled', () => {
        expect(showComponent({ hidden: true, disabled: true }, null)).toBeFalsy();
      });

      it('should show when hidden but not disabled', () => {
        expect(showComponent({ hidden: true }, null)).toBeTruthy();
      });

      it('should show when disabled but not hidden', () => {
        expect(showComponent({ disabled: true }, null)).toBeTruthy();
      });

      it('should show when a single show_when condition is met', () => {
        const COMPONENT = {
          show_when: { field: 'alpha', op: 'eq', value: 'bravo' }
        };
        const DATA = { alpha: 'bravo' };
        expect(showComponent(COMPONENT, DATA)).toBeTruthy();
      });

      it('should not show when a single show_when condition is not met', () => {
        const COMPONENT = {
          show_when: { field: 'alpha', op: 'eq', value: 'bravo' }
        };
        const DATA = { alpha: 'charlie' };
        expect(showComponent(COMPONENT, DATA)).toBeFalsy();
      });

      it('should show when multiple show_when conditions are met', () => {
        const COMPONENT = {
          show_when: [
            { field: 'alpha', op: 'eq', value: 'bravo' },
            { field: 'charlie', op: 'eq', value: 'delta' },
          ]
        };
        const DATA = { alpha: 'bravo', charlie: 'delta' };
        expect(showComponent(COMPONENT, DATA)).toBeTruthy();
      });

      it('should not show when one of multiple show_when conditions is not met', () => {
        const COMPONENT = {
          show_when: [
            { field: 'alpha', op: 'eq', value: 'bravo' },
            { field: 'charlie', op: 'eq', value: 'delta' },
          ]
        };
        const DATA = { alpha: 'bravo', charlie: 'echo' };
        expect(showComponent(COMPONENT, DATA)).toBeFalsy();
      });

      it('SHOULD be shown when the component has multiple show_when conditions, with type "or" provided and ALL are matched', () => {
        const COMPONENT = {
          show_when: {
            "type": "or",
            "fields": [
              { field: 'alpha', op: '=', value: 'Alpha' },
              { field: 'bravo', op: '=', value: 'Bravo' }
            ]
          }
        };
        const DATA = {
          alpha: 'Alpha',
          bravo: 'Bravo'
        };
        expect(showComponent(COMPONENT, DATA)).toBeTruthy();
      });
  
      it('SHOULD be shown when the component has multiple show_when conditions, with type "or" provided and at least ONE is matched', () => {
        const COMPONENT = {
          show_when: {
            "type": "or",
            "fields": [
              { field: 'alpha', op: '=', value: 'Alpha' },
              { field: 'charlie', op: '=', value: 'Charlie' }
            ]
          }
        };
        const DATA = {
          alpha: 'Alpha',
          bravo: 'Bravo'
        };
        expect(showComponent(COMPONENT, DATA)).toBeTruthy();
      });
  
      it('should NOT be shown when the component has multiple show_when conditions, with type "or" provided and NONE are matched', () => {
        const COMPONENT = {
          show_when: {
            "type": "or",
            "fields": [
              { field: 'alpha', op: '!=', value: 'Alpha' },
              { field: 'charlie', op: '=', value: 'Charlie' }
            ]
          }
        };
        const DATA = {
          alpha: 'Alpha',
          bravo: 'Bravo'
        };
        expect(showComponent(COMPONENT, DATA)).toBeFalsy();
      });

    });

  });

});
