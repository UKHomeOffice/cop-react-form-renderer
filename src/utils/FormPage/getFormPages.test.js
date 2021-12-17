// Local imports
import getFormPages from './getFormPages';

describe('utils', () => {

  describe('FormPage', () => {

    describe('getFormPages', () => {

      const FORM_COMPONENTS = [
        { id: 'a', fieldId: 'a', label: 'Alpha', type: 'text' },
        { id: 'b', fieldId: 'b', label: 'Bravo', type: 'text' },
        // eslint-disable-next-line no-template-curly-in-string
        { id: 'c', fieldId: 'c', label: 'Charlie', type: 'radios', data: { url: '${environmentContext.refData}/v3/charlies' } }
      ];

      const FORM_DATA = {
        environmentContext: {
          refData: 'https://ho.gov.uk/ref-data/'
        }
      };

      it('should handle null or undefined pageOptions', () => {
        expect(getFormPages(null, FORM_COMPONENTS, FORM_DATA)).toEqual([]);
        expect(getFormPages(undefined, FORM_COMPONENTS, FORM_DATA)).toEqual([]);
      });

      it('should appropriately set up multiples pages with various configurations', () => {
        const PAGE_1 = {
          title: 'Page 1',
          components: [
            { type: 'heading', size: 'l', content: 'Page heading' }
          ]
        };
        const PAGE_2 = {
          title: 'Page 2',
          components: [
            "Opening paragraph",
            { type: 'heading', size: 'l', content: 'Page heading' },
            "Closing paragraph",
            { use: 'c' }
          ]
        };
        const PAGES = [ PAGE_1, PAGE_2 ];
        const C = FORM_COMPONENTS[2];
        expect(getFormPages(PAGES, FORM_COMPONENTS, FORM_DATA)).toEqual([
          {
            index: 0,
            title: PAGE_1.title,
            components: PAGE_1.components,
            formData: FORM_DATA
          },
          {
            index: 1,
            title: PAGE_2.title,
            components: [
              { type: 'html', tagName: 'p', content: PAGE_2.components[0] },
              PAGE_2.components[1],
              { type: 'html', tagName: 'p', content: PAGE_2.components[2] },
              { use: 'c', ...C, cya_label: C.label, data: { url: `${FORM_DATA.environmentContext.refData}/v3/charlies` } }
            ],
            formData: FORM_DATA
          }
        ]);
      });

    });

  });

});
