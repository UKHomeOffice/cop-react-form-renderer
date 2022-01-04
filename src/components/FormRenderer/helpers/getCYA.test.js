// Local imports
import { HubFormats } from '../../../models';
import getCYA from './getCYA';

describe('components', () => {

  describe('FormRenderer', () => {

    describe('helpers', () => {
      const HUB = { id: 'hub', components: [] };

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

    });

  });

});
