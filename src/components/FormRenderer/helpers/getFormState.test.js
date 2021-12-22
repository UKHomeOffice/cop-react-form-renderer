// Local imports
import { HubFormats } from '../../../models';
import getFormState from './getFormState';

describe('components', () => {

  describe('FormRenderer', () => {

    describe('helpers', () => {
      const HUB = { id: 'hub', components: [] };
      const PAGES = [
        { id: 'alpha', components: ['x'] },
        { id: 'bravo', components: ['y', 'z'] },
        HUB
      ];

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

    });

  });

});
