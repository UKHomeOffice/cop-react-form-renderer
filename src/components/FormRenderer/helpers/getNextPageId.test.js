// Local imports
import { FormPages, FormTypes, PageAction } from '../../../models';
import getNextPageId from './getNextPageId';

describe('components', () => {

  describe('FormRenderer', () => {

    describe('helpers', () => {

      describe('getNextPageId', () => {

        const PAGES = [
          { id: 'alpha' },
          { id: 'bravo' }
        ];

        describe(`when the form type is '${FormTypes.HUB}'`, () => {
          const FORM_TYPE = FormTypes.HUB;

          it(`should return '${FormPages.HUB}' by default`, () => {
            expect(getNextPageId(FORM_TYPE, PAGES)).toEqual(FormPages.HUB);
          });

          it(`should return '${FormPages.HUB}' if the action is '${PageAction.TYPES.SAVE_AND_RETURN}'`, () => {
            const ACTION = PageAction.DEFAULTS.saveAndReturn;
            expect(getNextPageId(FORM_TYPE, PAGES, PAGES[0].id, ACTION)).toEqual(FormPages.HUB);
          });

          it('should return action.nextPageId if specified', () => {
            const ACTION = { nextPageId: 'bob' };
            expect(getNextPageId(FORM_TYPE, PAGES, undefined, ACTION)).toEqual(ACTION.nextPageId);
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

          it(`should return '${FormPages.CYA}' when on the last page`, () => {
            expect(getNextPageId(FORM_TYPE, PAGES, PAGES[PAGES.length - 1].id)).toEqual(FormPages.CYA);
          });

          it(`should return undefined if the action is '${PageAction.TYPES.SAVE_AND_RETURN}'`, () => {
            const ACTION = PageAction.DEFAULTS.saveAndReturn;
            expect(getNextPageId(FORM_TYPE, PAGES, PAGES[0].id, ACTION)).toBeUndefined();
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

      });

    });

  });

});
