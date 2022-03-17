// Local imports
import { ComponentTypes, FormPages, FormTypes, PageAction } from '../../../models';
import getSubmissionStatus from './getSubmissionStatus';

describe('components', () => {

  describe('FormRenderer', () => {

    describe('helpers', () => {

      describe('getSubmissionStatus', () => {
        const OPTIONS = [ { value: 'romeo', label: 'Romeo'}, { value: 'juliet', label: 'Juliet' } ];
        const RADIOS = { id: 'radios', fieldId: 'radios', type: ComponentTypes.RADIOS, data: { options: OPTIONS } };
        const TEXT = { id: 'text', fieldId: 'text', type: ComponentTypes.TEXT };
        const HTML = { type: ComponentTypes.HTML, content: 'HTML' };
        const SHOW_WHEN_JULIET = { field: RADIOS.fieldId, op: '=', value: OPTIONS[1].value };
        const SHOW_WHEN_ROMEO = { field: RADIOS.fieldId, op: '=', value: OPTIONS[0].value };
        const FORM_DATA = { radios: OPTIONS[0].value }; // 'romeo'
        const PAGES = [
          { id: 'alpha' },
          { id: 'bravo' },
          { id: 'charlie', components: [ RADIOS ]},
          { id: 'delta', components: [ TEXT ], show_when: SHOW_WHEN_JULIET },
          { id: 'echo', components: [ HTML ]},
          { id: 'foxtrot', components: [ TEXT ], show_when: SHOW_WHEN_ROMEO }
        ];

        describe(`when the action type is '${PageAction.TYPES.NAVIGATE}'`, () => {

          it('should return undefined if the action has no page property', () => {
            const ACTION = { type: PageAction.TYPES.NAVIGATE };
            expect(getSubmissionStatus(FormTypes.HUB, PAGES, PAGES[0].id, ACTION, FORM_DATA)).toMatchObject({
              page: undefined
            });
          });

          it('should return the page on the action if it exists among the pages', () => {
            const PAGE = PAGES[1].id;
            const ACTION = { type: PageAction.TYPES.NAVIGATE, page: PAGE };
            expect(getSubmissionStatus(FormTypes.HUB, PAGES, PAGES[0].id, ACTION, FORM_DATA)).toMatchObject({
              page: PAGE
            });
          });

          it('should return undefined if the page on the action does not exist among the pages', () => {
            const PAGE = 'golf';
            const ACTION = { type: PageAction.TYPES.NAVIGATE, page: PAGE };
            expect(getSubmissionStatus(FormTypes.HUB, PAGES, PAGES[0].id, ACTION, FORM_DATA)).toMatchObject({
              page: undefined
            });
          });

        });

        describe(`when the action type is '${PageAction.TYPES.SAVE_AND_RETURN}'`, () => {

          Object.values(FormTypes).forEach(formType => {
            it(`should return the current page if the form type is '${formType}'`, () => {
              const ACTION = PageAction.DEFAULTS.saveAndReturn;
              expect(getSubmissionStatus(formType, PAGES, PAGES[0].id, ACTION, FORM_DATA)).toMatchObject({
                page: PAGES[0].id
              });
            });
          });

        });

        describe(`when the form type is '${FormTypes.HUB}'`, () => {
          const FORM_TYPE = FormTypes.HUB;

          it(`should return '${FormPages.HUB}' by default`, () => {
            expect(getSubmissionStatus(FORM_TYPE, PAGES)).toMatchObject({
              page: FormPages.HUB
            });
          });

          it('should return action.page if specified', () => {
            const ACTION = { page: 'bob' };
            expect(getSubmissionStatus(FORM_TYPE, PAGES, undefined, ACTION, FORM_DATA)).toMatchObject({
              page: ACTION.page
            });
          });

        });

        describe(`when the form type is '${FormTypes.CYA}'`, () => {
          const FORM_TYPE = FormTypes.CYA;
          const ACTION = PageAction.DEFAULTS.saveAndContinue;

          it('should return the first page by default', () => {
            expect(getSubmissionStatus(FORM_TYPE, PAGES, ACTION, FORM_DATA)).toMatchObject({
              page: PAGES[0].id
            });
          });

          it('should return the second page when on the first page', () => {
            expect(getSubmissionStatus(FORM_TYPE, PAGES, PAGES[0].id, ACTION, FORM_DATA)).toMatchObject({
              page: PAGES[1].id
            });
          });

          it('should return the third page when on the second page', () => {
            expect(getSubmissionStatus(FORM_TYPE, PAGES, PAGES[1].id, ACTION, FORM_DATA)).toMatchObject({
              page: PAGES[2].id
            });
          });

          it(`should return the fifth page when on the third page because the fourth page show_when is not met`, () => {
            expect(getSubmissionStatus(FORM_TYPE, PAGES, PAGES[2].id, ACTION, FORM_DATA)).toMatchObject({
              page: PAGES[4].id
            });
          });

          it(`should return the sixth page when on the fifth page because the sixth page show_when is met`, () => {
            expect(getSubmissionStatus(FORM_TYPE, PAGES, PAGES[4].id, ACTION, FORM_DATA)).toMatchObject({
              page: PAGES[5].id
            });
          });

          it(`should return '${FormPages.CYA}' when on the sixth (last) page`, () => {
            const lastPageIndex = PAGES.length - 1;
            expect(getSubmissionStatus(FORM_TYPE, PAGES, PAGES[lastPageIndex].id, ACTION, FORM_DATA)).toMatchObject({
              page: FormPages.CYA
            });
          });

        });

        describe(`when the form type is '${FormTypes.WIZARD}'`, () => {
          const FORM_TYPE = FormTypes.WIZARD;

          it('should return the first page by default', () => {
            expect(getSubmissionStatus(FORM_TYPE, PAGES)).toMatchObject({
              page: PAGES[0].id
            });
          });

          it('should return the second page when on the first page', () => {
            expect(getSubmissionStatus(FORM_TYPE, PAGES, PAGES[0].id)).toMatchObject({
              page: PAGES[1].id
            });
          });

          it('should return undefined when on the last page', () => {
            expect(getSubmissionStatus(FORM_TYPE, PAGES, PAGES[PAGES.length - 1].id)).toMatchObject({
              page: undefined
            });
          });

        });

        describe(`when the form type is '${FormTypes.FORM}'`, () => {
          const FORM_TYPE = FormTypes.FORM;

          it(`should always return the first page if there any pages and the action is not '${PageAction.TYPES.SAVE_AND_RETURN}'`, () => {
            const ACTION = { type: PageAction.TYPES.SUBMIT, nextPageId: 'bob' };
            expect(getSubmissionStatus(FORM_TYPE, PAGES)).toMatchObject({ page: PAGES[0].id });
            expect(getSubmissionStatus(FORM_TYPE, PAGES, PAGES[0].id)).toMatchObject({ page: PAGES[0].id });
            expect(getSubmissionStatus(FORM_TYPE, PAGES, PAGES[1].id)).toMatchObject({ page: PAGES[0].id });
            expect(getSubmissionStatus(FORM_TYPE, PAGES, PAGES[0].id, ACTION)).toMatchObject({ page: PAGES[0].id });
          });

          it('should return undefined if there are no pages', () => {
            expect(getSubmissionStatus(FORM_TYPE, [])).toMatchObject({ page: undefined });
          });

        });

      });

    });

  });

});
