// Local imports
import { canActionProceed, getCYA, getFormState, getPage } from './helpers';
import { HubFormats } from '../../models';

describe('components', () => {

  describe('FormRenderer', () => {

    describe('helpers', () => {
      const HUB = { id: 'hub', components: [] };
      const PAGES = [
        { id: 'alpha', components: ['x'] },
        { id: 'bravo', components: ['y', 'z'] },
        HUB
      ];

      describe('getCYA', () => {

        it('should give an empty object if the pageId is "CYA"', () => {
          expect(getCYA(HubFormats.CYA)).toEqual({});
        });

        it('should give an object with a blank title if the pageId is "hub" and the hub is the CYA', () => {
          expect(getCYA('hub', HubFormats.CYA)).toEqual({ title: '' });
        });

        it('should give undefined if pageId is "hub" and the hub is NOT the CYA', () => {
          expect(getCYA('hub', HUB)).toBeUndefined();
        });

        it('should give undefined if pageId is NOT "hub" and the hub is NOT the CYA', () => {
          expect(getCYA('bob', HUB)).toBeUndefined();
        });

        it('should give undefined if pageId is NOT "hub" and the hub is the CYA', () => {
          expect(getCYA('bob', HubFormats.CYA)).toBeUndefined();
        });

      });

      describe('getPage', () => {

        it('should give undefined if the pageId is undefined', () => {
          expect(getPage(undefined, PAGES, HubFormats.CYA)).toBeUndefined();
        });

        it('should give undefined if the pageId is "hub" but the hub is the CYA', () => {
          expect(getPage('hub', PAGES, HubFormats.CYA)).toBeUndefined();
        });

        it('should give hub if the pageId is "hub" and the hub is NOT the CYA', () => {
          expect(getPage('hub', PAGES, HUB)).toEqual(HUB);
        });

        it('should give find the appropriate page if the pageId is not "hub"', () => {
          expect(getPage('alpha', PAGES, HUB)).toEqual({ id: 'alpha', components: ['x']});
        });

        it('should give undefined if the pageId is not "hub" and not found in the pages collection', () => {
          expect(getPage('charlie', PAGES, HUB)).toBeUndefined();
        });

      });

      describe('getFormState', () => {

        it('should set up accordingly when viewing a hub that is the CYA', () => {
          expect(getFormState('hub', PAGES, HubFormats.CYA)).toEqual({
            pageId: 'hub',
            cya: { title: '' },
            page: undefined
          });
        });

        it('should set up accordingly when viewing a hub that is NOT the CYA', () => {
          expect(getFormState('hub', PAGES, HUB)).toEqual({
            pageId: 'hub',
            cya: undefined,
            page: HUB
          });
        });

        it('should set up accordingly when viewing the CYA', () => {
          expect(getFormState(HubFormats.CYA, PAGES, HUB)).toEqual({
            pageId: HubFormats.CYA,
            cya: {},
            page: undefined
          });
        });

        it('should set up accordingly when viewing a standard page', () => {
          expect(getFormState('bravo', PAGES, HUB)).toEqual({
            pageId: 'bravo',
            cya: undefined,
            page: { id: 'bravo', components: ['y', 'z'] }
          });
        });

      });

      describe('canActionProceed', () => {

        it('should return true when the action does not require validation', () => {
          const ACTION = { validate: false };
          expect(canActionProceed(ACTION, {}, () => {})).toBeTruthy();
        });

        it('should return true when the page is valid', () => {
          const ACTION = { validate: true };
          const PAGE = {
            components: [
              { id: 'a', fieldId: 'a', label: 'Alpha', required: true }
            ],
            formData: {
              a: 'Bravo'
            }
          };
          expect(canActionProceed(ACTION, PAGE, () => {})).toBeTruthy();
        });

        it('should return false when the page is invalid and should have called the onErrors method appropriately', () => {
          const ACTION = { validate: true };
          const PAGE = {
            components: [
              { id: 'a', fieldId: 'a', label: 'Alpha', required: true }
            ],
            formData: {}
          };
          const ERRORS = [];
          const ON_ERROR = (errors) => {
            ERRORS.push(...errors);
          };
          expect(canActionProceed(ACTION, PAGE, ON_ERROR)).toBeFalsy();
          expect(ERRORS.length).toEqual(1);
          expect(ERRORS[0].id).toEqual('a');
          expect(ERRORS[0].error).toEqual('Alpha is required');
        });

      });

    });

  });

});
