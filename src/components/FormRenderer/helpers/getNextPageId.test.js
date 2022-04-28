// Local imports
import { ComponentTypes, FormPages, FormTypes, PageAction } from '../../../models';
import getNextPageId from './getNextPageId';

describe('components', () => {

  describe('FormRenderer', () => {

    describe('helpers', () => {

      describe('getNextPageId', () => {
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
            expect(getNextPageId(FormTypes.HUB, PAGES, PAGES[0].id, ACTION, FORM_DATA)).toBeUndefined();
          });

          it('should return the page on the action if it exists among the pages', () => {
            const PAGE = PAGES[1].id;
            const ACTION = { type: PageAction.TYPES.NAVIGATE, page: PAGE };
            expect(getNextPageId(FormTypes.HUB, PAGES, PAGES[0].id, ACTION, FORM_DATA)).toEqual(PAGE);
          });

          it('should return undefined if the page on the action does not exist among the pages', () => {
            const PAGE = 'golf';
            const ACTION = { type: PageAction.TYPES.NAVIGATE, page: PAGE };
            expect(getNextPageId(FormTypes.HUB, PAGES, PAGES[0].id, ACTION, FORM_DATA)).toBeUndefined();
          });

        });

        describe(`when the form type is '${FormTypes.HUB}'`, () => {
          const FORM_TYPE = FormTypes.HUB;

          it(`should return '${FormPages.HUB}' by default`, () => {
            expect(getNextPageId(FORM_TYPE, PAGES)).toEqual(FormPages.HUB);
          });

          it(`should return '${FormPages.HUB}' if the action is '${PageAction.TYPES.SAVE_AND_RETURN}'`, () => {
            const ACTION = PageAction.DEFAULTS.saveAndReturn;
            expect(getNextPageId(FORM_TYPE, PAGES, PAGES[0].id, ACTION, FORM_DATA)).toEqual(FormPages.HUB);
          });

          it('should return action.page if specified', () => {
            const ACTION = { page: 'bob' };
            expect(getNextPageId(FORM_TYPE, PAGES, undefined, ACTION, FORM_DATA)).toEqual(ACTION.page);
          });

        });

        describe(`when the form type is '${FormTypes.CYA}'`, () => {
          const FORM_TYPE = FormTypes.CYA;

          it('should return the first page by default', () => {
            expect(getNextPageId(FORM_TYPE, PAGES)).toEqual(PAGES[0].id);
          });

          it('should return the second page when on the first page', () => {
            expect(getNextPageId(FORM_TYPE, PAGES, PAGES[0].id)).toEqual(PAGES[1].id);
          });

          it('should return the third page when on the second page', () => {
            expect(getNextPageId(FORM_TYPE, PAGES, PAGES[1].id)).toEqual(PAGES[2].id);
          });

          it(`should return the fifth page when on the third page because the fourth page show_when is not met`, () => {
            expect(getNextPageId(FORM_TYPE, PAGES, PAGES[2].id, PageAction.DEFAULTS.saveAndContinue, FORM_DATA)).toEqual(PAGES[4].id);
          });

          it(`should return the sixth page when on the fifth page because the sixth page show_when is met`, () => {
            expect(getNextPageId(FORM_TYPE, PAGES, PAGES[4].id, PageAction.DEFAULTS.saveAndContinue, FORM_DATA)).toEqual(PAGES[5].id);
          });

          it(`should return undefined if the action is '${PageAction.TYPES.SAVE_AND_RETURN}'`, () => {
            const ACTION = PageAction.DEFAULTS.saveAndReturn;
            expect(getNextPageId(FORM_TYPE, PAGES, PAGES[0].id, ACTION, FORM_DATA)).toBeUndefined();
          });

        });

        describe(`when the form type is '${FormTypes.WIZARD}'`, () => {
          const FORM_TYPE = FormTypes.WIZARD;

          it('should return the first page by default', () => {
            expect(getNextPageId(FORM_TYPE, PAGES)).toEqual(PAGES[0].id);
          });

          it('should return the second page when on the first page', () => {
            expect(getNextPageId(FORM_TYPE, PAGES, PAGES[0].id)).toEqual(PAGES[1].id);
          });

          it('should return undefined when on the last page', () => {
            expect(getNextPageId(FORM_TYPE, PAGES, PAGES[PAGES.length - 1].id)).toBeUndefined();
          });

          it(`should return undefined if the action is '${PageAction.TYPES.SAVE_AND_RETURN}'`, () => {
            const ACTION = PageAction.DEFAULTS.saveAndReturn;
            expect(getNextPageId(FORM_TYPE, PAGES, PAGES[0].id, ACTION)).toBeUndefined();
          });

        });

        describe(`when the form type is '${FormTypes.FORM}'`, () => {
          const FORM_TYPE = FormTypes.FORM;

          it(`should always return the first page if there any pages and the action is not '${PageAction.TYPES.SAVE_AND_RETURN}'`, () => {
            const ACTION = { type: PageAction.TYPES.SUBMIT, nextPageId: 'bob' };
            expect(getNextPageId(FORM_TYPE, PAGES)).toEqual(PAGES[0].id);
            expect(getNextPageId(FORM_TYPE, PAGES, PAGES[0].id)).toEqual(PAGES[0].id);
            expect(getNextPageId(FORM_TYPE, PAGES, PAGES[1].id)).toEqual(PAGES[0].id);
            expect(getNextPageId(FORM_TYPE, PAGES, PAGES[0].id, ACTION)).toEqual(PAGES[0].id);
          });

          it(`should return undefined if the action is '${PageAction.TYPES.SAVE_AND_RETURN}'`, () => {
            const ACTION = PageAction.DEFAULTS.saveAndReturn;
            expect(getNextPageId(FORM_TYPE, PAGES, PAGES[0].id, ACTION)).toBeUndefined();
          });

          it('should return undefined if there are no pages', () => {
            expect(getNextPageId(FORM_TYPE, [])).toBeUndefined();
          });

        });

        describe(`when the form type is '${FormTypes.TASK}'`, () => {
          const FORM_TYPE = FormTypes.TASK;

          it(`should return '${FormPages.HUB}' by default`, () => {
            expect(getNextPageId(FORM_TYPE, PAGES)).toEqual(FormPages.HUB);
          });

        });

      });

    });

  });

});
