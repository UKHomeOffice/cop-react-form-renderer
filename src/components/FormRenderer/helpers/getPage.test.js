// Local imports
import { FormPages, HubFormats } from '../../../models';
import getPage from './getPage';

describe('components', () => {

  describe('FormRenderer', () => {

    describe('helpers', () => {
      const HUB = { id: FormPages.HUB, components: [] };
      const PAGES = [
        { id: 'alpha', components: ['x'] },
        { id: 'bravo', components: ['y', 'z'] },
        HUB
      ];

      describe('getPage', () => {

        it('should give undefined if the pageId is undefined', () => {
          expect(getPage(undefined, PAGES, HubFormats.CYA)).toBeUndefined();
        });

        it('should give undefined if the pageId is "hub" but the hub is the CYA', () => {
          expect(getPage(FormPages.HUB, PAGES, HubFormats.CYA)).toBeUndefined();
        });

        it('should give hub if the pageId is "hub" and the hub is NOT the CYA', () => {
          expect(getPage(FormPages.HUB, PAGES, HUB)).toEqual(HUB);
        });

        it('should give find the appropriate page if the pageId is not "hub"', () => {
          expect(getPage('alpha', PAGES, HUB)).toEqual({ id: 'alpha', components: ['x']});
        });

        it('should give undefined if the pageId is not "hub" and not found in the pages collection', () => {
          expect(getPage('charlie', PAGES, HUB)).toBeUndefined();
        });

      });

    });

  });

});
