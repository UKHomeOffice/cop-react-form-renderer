// Local imports
import setupRefDataUrlForComponent from './setupRefDataUrlForComponent';

describe('utils', () => {

  describe('Data', () => {

    describe('setupRefDataUrlForComponent', () => {

      const DATA = {
        urls: {
          refData: '/ref-data'
        }
      };

      it('can handle a null component', () => {
        expect(setupRefDataUrlForComponent(null, DATA)).toBeNull();
      });

      it('can handle an undefined component', () => {
        expect(setupRefDataUrlForComponent(undefined, DATA)).toBeUndefined();
      });

      it('can handle a component with no data property', () => {
        const COMPONENT = { id: 'component' };
        expect(setupRefDataUrlForComponent(COMPONENT, DATA)).toEqual(COMPONENT);
      });

      it('can handle a component with no data.url property', () => {
        const COMPONENT = {
          id: 'component',
          data: { options: [] }
        };
        expect(setupRefDataUrlForComponent(COMPONENT, DATA)).toEqual(COMPONENT);
      });

      it('should appropriately updates the component URL', () => {
        const COMPONENT = {
          id: 'component',
          // eslint-disable-next-line no-template-curly-in-string
          data: { url: '${urls.refData}/v1/teams' }
        };
        expect(setupRefDataUrlForComponent(COMPONENT, DATA)).toEqual({
          id: COMPONENT.id,
          data: {
            url: `${DATA.urls.refData}/v1/teams`
          }
        });
      });

      it('should leave a URL alone that does not require replacement', () => {
        const COMPONENT = {
          id: 'component',
          data: { url: '/somewhere-else/v1/teams' }
        };
        expect(setupRefDataUrlForComponent(COMPONENT, DATA)).toEqual({
          id: COMPONENT.id,
          data: {
            url: COMPONENT.data.url
          }
        });
      });

      it('should appropriately handle a missing value in the data', () => {
        const COMPONENT = {
          id: 'component',
          // eslint-disable-next-line no-template-curly-in-string
          data: { url: '${urls.referenceData}/v1/teams' }
        };
        expect(setupRefDataUrlForComponent(COMPONENT, DATA)).toEqual({
          id: COMPONENT.id,
          data: {
            url: '/v1/teams'
          }
        });
      });

    });

  });

});
