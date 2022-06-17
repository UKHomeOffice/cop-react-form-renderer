import showFormPage from './showFormPage';

describe('utils', () => {

  describe('FormPage', () => {

    describe('showFormPage', () => {
      const DATA = {
        alpha: 'Alpha',
        bravo: 'Bravo'
      };
      const HTML = { type: 'html', tagName: 'p', content: 'Alpha' };
      const INSET_TEXT = { type: 'inset-text', content: 'Bravo' };
      const HEADING = { type: 'heading', size: 'm', content: 'Charlie' };

      it('should NOT be shown when the page is null', () => {
        expect(showFormPage(null, DATA)).toBeFalsy();
      });

      it('should NOT be shown when the page has a single show_when condition that is NOT matched', () => {
        const PAGE = {
          show_when: { field: 'charlie', op: '=', value: 'Charlie' }
        };
        expect(showFormPage(PAGE, DATA)).toBeFalsy();
      });

      it('should NOT be shown when the page has a multiple show_when conditions and at least one is NOT matched', () => {
        const PAGE = {
          show_when: [
            { field: 'alpha', op: '=', value: 'Alpha' },
            { field: 'charlie', op: '=', value: 'Charlie' }
          ]
        };
        expect(showFormPage(PAGE, DATA)).toBeFalsy();
      });

      it('SHOULD be shown when the page has a single show_when condition that IS matched', () => {
        const PAGE = {
          show_when: { field: 'alpha', op: '=', value: 'Alpha' }
        };
        expect(showFormPage(PAGE, DATA)).toBeTruthy();
      });

      it('SHOULD be shown when the page has a multiple show_when conditions that are ALL matched', () => {
        const PAGE = {
          show_when: [
            { field: 'alpha', op: '=', value: 'Alpha' },
            { field: 'charlie', op: '!=', value: 'Charlie' }
          ]
        };
        expect(showFormPage(PAGE, DATA)).toBeTruthy();
      });

      it('SHOULD be shown when the page has NO show_when conditions and NO editable components', () => {
        const PAGE = {
          components: [ HTML, INSET_TEXT, HEADING ]
        };
        expect(showFormPage(PAGE, DATA)).toBeTruthy();
      });

      it('should NOT be shown when the page has NO show_when conditions and NO SHOWN editable components', () => {
        const TEXT = {
          type: 'text',
          show_when: { field: 'charlie', op: '=', value: 'Charlie' }
        };
        const RADIOS = {
          type: 'radios',
          show_when: { field: 'charlie', op: '=', value: 'Charlie' }
        };
        const PAGE = {
          components: [ TEXT, RADIOS ]
        };
        expect(showFormPage(PAGE, DATA)).toBeFalsy();
      });

      it('SHOULD be shown when the page has NO show_when conditions and AT LEAST ONE SHOWN editable components', () => {
        const TEXT = {
          type: 'text',
          show_when: { field: 'alpha', op: '=', value: 'Alpha' }
        };
        const RADIOS = {
          type: 'radios',
          show_when: { field: 'charlie', op: '=', value: 'Charlie' }
        };
        const PAGE = {
          components: [ TEXT, RADIOS ]
        };
        expect(showFormPage(PAGE, DATA)).toBeTruthy();
      });

      it('SHOULD be shown when the page has multiple show_when conditions, with type "or" provided and ALL are matched', () => {
        const PAGE = {
          show_when: {
            "type": "or",
            "conditions": [
              { field: 'alpha', op: '=', value: 'Alpha' },
              { field: 'bravo', op: '=', value: 'Bravo' }
            ]
          }
        };
        expect(showFormPage(PAGE, DATA)).toBeTruthy();
      });

      it('SHOULD be shown when the page has multiple show_when conditions, with type "or" provided and at least ONE is matched', () => {
        const PAGE = {
          show_when: {
            "type": "or",
            "conditions": [
              { field: 'alpha', op: '=', value: 'Alpha' },
              { field: 'charlie', op: '=', value: 'Charlie' }
            ]
          }
        };
        expect(showFormPage(PAGE, DATA)).toBeTruthy();
      });

      it('should NOT be shown when the page has multiple show_when conditions, with type "or" provided and NONE are matched', () => {
        const PAGE = {
          show_when: {
            "type": "or",
            "conditions": [
              { field: 'alpha', op: '!=', value: 'Alpha' },
              { field: 'charlie', op: '=', value: 'Charlie' }
            ]
          }
        };
        expect(showFormPage(PAGE, DATA)).toBeFalsy();
      });

    });

  });

});
