// Local imports
import { FormTypes, HubFormats } from '../../models';
import getFormHub from './getFormHub';

describe('utils', () => {

  describe('Hub', () => {
    
    describe('getFormHub', () => {
      const FORM_COMPONENTS = [
        { id: 'a', fieldId: 'a', label: 'Alpha', type: 'text' },
        { id: 'b', fieldId: 'b', label: 'Bravo', type: 'text' },
        // eslint-disable-next-line no-template-curly-in-string
        { id: 'c', fieldId: 'c', label: 'Charlie', type: 'radios', data: { url: '${urls.refData}/v3/charlies' } }
      ];

      const FORM_DATA = {
        urls: {
          refData: 'https://ho.gov.uk/ref-data/'
        }
      };

      [FormTypes.CYA, FormTypes.FORM, FormTypes.WIZARD].forEach(formType => {
        describe(`when the FormType is "${formType}"`, () => {

          it('should return undefined', () => {
            expect(getFormHub(formType, {}, FORM_COMPONENTS, FORM_DATA)).toBeUndefined();
          });

        });
      });

      describe(`when the FormType is "${FormTypes.HUB}"`, () => {

        it('should return undefined when there is no hub', () => {
          expect(getFormHub(FormTypes.HUB, null, FORM_COMPONENTS, FORM_DATA)).toBeUndefined();
        });

        it(`should return undefined when the format is not "${HubFormats.CYA}" but hub also has no components`, () => {
          expect(getFormHub(FormTypes.HUB, {}, FORM_COMPONENTS, FORM_DATA)).toBeUndefined();
        });

        it(`should return the string "${HubFormats.CYA}" when the format is set to "${HubFormats.CYA}"`, () => {
          const HUB = { format: HubFormats.CYA };
          expect(getFormHub(FormTypes.HUB, HUB, FORM_COMPONENTS, FORM_DATA)).toEqual(HubFormats.CYA);
        });

        it(`should return an appropriate page when the format is not "${HubFormats.CYA}" and hub contains components`, () => {
          const HUB = {
            title: 'Hub title',
            components: [
              'Opening paragraph',
              { type: 'heading', size: 'l', content: 'Hub heading' },
              'Closing paragraph',
              { use: 'a' }
            ]
          };
          const A = FORM_COMPONENTS[0];
          expect(getFormHub(FormTypes.HUB, HUB, FORM_COMPONENTS, FORM_DATA)).toEqual({
            title: HUB.title,
            components: [
              { type: 'html', tagName: 'p', content: HUB.components[0] },
              { ...HUB.components[1], full_path: HUB.components[1].fieldId },
              { type: 'html', tagName: 'p', content: HUB.components[2] },
              { use: 'a', ...A, cya_label: A.label, full_path: A.fieldId }
            ],
            formData: FORM_DATA
          });
        });
      });

      describe(`when the FormType is "${FormTypes.TASK}"`, () => {
        it(`should return the string "${HubFormats.TASK}" when the format is set to "${HubFormats.TASK}"`, () => {
          const HUB = { format: HubFormats.TASK };
          expect(getFormHub(FormTypes.TASK, HUB, FORM_COMPONENTS, FORM_DATA)).toEqual(HubFormats.TASK);
        });
      });
    });
  });
});
