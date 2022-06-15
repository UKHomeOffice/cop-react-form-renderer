// Local imports
import getFormPage from './getFormPage';

describe('utils', () => {

  describe('FormPage', () => {

    describe('getFormPage', () => {

      const FORM_COMPONENTS = [
        { id: 'a', fieldId: 'a', label: 'Alpha', type: 'text' },
        { id: 'b', fieldId: 'b', label: 'Bravo', type: 'text' },
        // eslint-disable-next-line no-template-curly-in-string
        { id: 'c', fieldId: 'c', label: 'Charlie', type: 'radios', data: { url: '${urls.refData}/v3/charlies' } },
        // eslint-disable-next-line no-template-curly-in-string
        { id: 'd', fieldId: 'd', label: 'Roger ${currentUser.firstname}', type: 'text' },
        // eslint-disable-next-line no-template-curly-in-string
        { id: 'e', fieldId: 'e', label: 'Bravo ${currentUser.surname}', type: 'text' },
      ];

      const FORM_DATA = {
        urls: {
          refData: 'https://ho.gov.uk/ref-data/'
        }
      };

      it('should handle null or undefined pageOptions', () => {
        expect(getFormPage(null, FORM_COMPONENTS, FORM_DATA)).toBeNull();
        expect(getFormPage(undefined, FORM_COMPONENTS, FORM_DATA)).toBeNull();
      });

      it('should handle a page not using any form components', () => {
        const PAGE = {
          title: 'Page',
          components: [
            { type: 'heading', size: 'l', content: 'Page heading' }
          ]
        };
        expect(getFormPage(PAGE, FORM_COMPONENTS, FORM_DATA)).toEqual({
          title: PAGE.title,
          components: PAGE.components,
          formData: FORM_DATA
        });
      });

      it('should handle a page with inline strings and convert them to paragraphs', () => {
        const PAGE = {
          title: 'Page',
          components: [
            "Opening paragraph",
            { type: 'heading', size: 'l', content: 'Page heading' },
            "Closing paragraph"
          ]
        };
        expect(getFormPage(PAGE, FORM_COMPONENTS, FORM_DATA)).toEqual({
          title: PAGE.title,
          components: [
            { type: 'html', tagName: 'p', content: PAGE.components[0] },
            { ...PAGE.components[1], full_path: PAGE.components[1].fieldId },
            { type: 'html', tagName: 'p', content: PAGE.components[2] }
          ],
          formData: FORM_DATA
        });
      });

      it('should handle a page that references a form-level component', () => {
        const PAGE = {
          title: 'Page',
          components: [
            "Opening paragraph",
            { type: 'heading', size: 'l', content: 'Page heading' },
            "Closing paragraph",
            { use: 'a' }
          ]
        };
        const A = FORM_COMPONENTS[0];
        expect(getFormPage(PAGE, FORM_COMPONENTS, FORM_DATA)).toEqual({
          title: PAGE.title,
          components: [
            { type: 'html', tagName: 'p', content: PAGE.components[0] },
            { ...PAGE.components[1], full_path: PAGE.components[1].fieldId },
            { type: 'html', tagName: 'p', content: PAGE.components[2] },
            { use: 'a', ...A, cya_label: A.label, full_path: A.fieldId }
          ],
          formData: FORM_DATA
        });
      });

      it('should handle a page that references a form-level component with a data url', () => {
        const PAGE = {
          title: 'Page',
          components: [
            "Opening paragraph",
            { type: 'heading', size: 'l', content: 'Page heading' },
            "Closing paragraph",
            { use: 'c' }
          ]
        };
        const C = FORM_COMPONENTS[2];
        expect(getFormPage(PAGE, FORM_COMPONENTS, FORM_DATA)).toEqual({
          title: PAGE.title,
          components: [
            { type: 'html', tagName: 'p', content: PAGE.components[0] },
            { ...PAGE.components[1], full_path: PAGE.components[1].fieldId },
            { type: 'html', tagName: 'p', content: PAGE.components[2] },
            { use: 'c', ...C, cya_label: C.label, data: { url: `${FORM_DATA.urls.refData}/v3/charlies` }, full_path: C.fieldId }
          ],
          formData: FORM_DATA
        });
      });

      it('should handle a page that references a form-level component with a data url without an environment context', () => {
        const PAGE = {
          title: 'Page',
          components: [
            "Opening paragraph",
            { type: 'heading', size: 'l', content: 'Page heading' },
            "Closing paragraph",
            { use: 'c' }
          ]
        };
        const C = FORM_COMPONENTS[2];
        expect(getFormPage(PAGE, FORM_COMPONENTS, {})).toEqual({
          title: PAGE.title,
          components: [
            { type: 'html', tagName: 'p', content: PAGE.components[0] },
            { ...PAGE.components[1], full_path: PAGE.components[1].fieldId },
            { type: 'html', tagName: 'p', content: PAGE.components[2] },
            // eslint-disable-next-line no-template-curly-in-string
            { use: 'c', ...C, cya_label: C.label, full_path: C.fieldId, data: { url: '${urls.refData}/v3/charlies' } }
          ],
          formData: {}
        });
      });

      it('should interpolate and handle a page that references a form-level component with formData', () => {
        const PAGE = {
          // eslint-disable-next-line no-template-curly-in-string
          title: 'Page ${postFixTitle}',
          components: [
            "Opening paragraph",
            { type: 'heading', size: 'l', content: 'Page heading' },
            "Closing paragraph",
            { use: 'c' },
            { use: 'd' },
            "Kevin",
            { use: 'e' },
          ]
        };
        const DATA = { ...FORM_DATA, currentUser: {
          firstname: 'Bob',
          surname: 'Kevin'
        }, postFixTitle: 'Everyone'}
        const C = FORM_COMPONENTS[2];
        const D = FORM_COMPONENTS[3];
        const E = FORM_COMPONENTS[4];
        expect(getFormPage(PAGE, FORM_COMPONENTS, DATA)).toEqual({
          title: 'Page Everyone',
          components: [
            { type: 'html', tagName: 'p', content: PAGE.components[0] },
            { ...PAGE.components[1], full_path: PAGE.components[1].fieldId },
            { type: 'html', tagName: 'p', content: PAGE.components[2] },
            { use: 'c', ...C, cya_label: C.label, data: { url: `${FORM_DATA.urls.refData}/v3/charlies` }, full_path: C.fieldId },
            { use: 'd', ...D, label: 'Roger ' + DATA.currentUser.firstname, cya_label: 'Roger ' + DATA.currentUser.firstname, full_path: D.fieldId },
            { type: 'html', tagName: 'p', content: PAGE.components[5] },
            { use: 'e', ...E, label: 'Bravo ' + DATA.currentUser.surname, cya_label: 'Bravo ' + DATA.currentUser.surname, full_path: E.fieldId },
          ],
          formData: DATA
        });
      });

    });

  });

});
