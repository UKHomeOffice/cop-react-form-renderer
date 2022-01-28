// Local imports
import { FormPages, HubFormats } from '../../../models';
import getFormState from './getFormState';

describe('components', () => {

  describe('FormRenderer', () => {

    describe('helpers', () => {
      const HUB = { id: FormPages.HUB, components: [] };
      const PAGES = [
        { id: 'alpha', components: ['x'] },
        { id: 'bravo', components: ['y', 'z'] },
        HUB
      ];

      describe('getFormState', () => {

        it('should set up accordingly when viewing a hub that is the CYA', () => {
          expect(getFormState(FormPages.HUB, PAGES, HubFormats.CYA)).toEqual({
            pageId: FormPages.HUB,
            cya: { title: '' },
            page: undefined
          });
        });

        it('should set up accordingly when viewing a hub that is NOT the CYA', () => {
          expect(getFormState(FormPages.HUB, PAGES, HUB)).toEqual({
            pageId: FormPages.HUB,
            cya: undefined,
            page: HUB
          });
        });

        it('should set up accordingly when viewing the CYA', () => {
          expect(getFormState(FormPages.CYA, PAGES, HUB)).toEqual({
            pageId: FormPages.CYA,
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

    });

  });

});
