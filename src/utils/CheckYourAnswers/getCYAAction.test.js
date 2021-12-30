// Local imports
import getCYAAction from './getCYAAction';

describe('utils', () => {

  describe('CheckYourAnswers', () => {
    
    describe('getCYAAction', () => {

      it('should return null if readonly', () => {
        expect(getCYAAction(true, {}, () => {})).toBeNull();
      });

      it('should return null if there is no cya_link', () => {
        expect(getCYAAction(false, null, () => {})).toBeNull();
      });

      it('should return a default action if the cya_link is empty', () => {
        const CYA_LINK = {};
        const ON_ACTION = () => {};
        expect(getCYAAction(false, CYA_LINK, ON_ACTION)).toEqual({
          href: '#',
          label: 'Change',
          onAction: ON_ACTION
        });
      });

      it('should use url specified in cya_link', () => {
        const URL = 'https://fake.url.com/something';
        const CYA_LINK = { url: URL };
        const ON_ACTION = () => {};
        expect(getCYAAction(false, CYA_LINK, ON_ACTION)).toEqual({
          href: URL,
          label: 'Change',
          onAction: ON_ACTION
        });
      });

      it('should use label specified in cya_link', () => {
        const LABEL = 'Alpha Bravo Charlie';
        const CYA_LINK = { label: LABEL };
        const ON_ACTION = () => {};
        expect(getCYAAction(false, CYA_LINK, ON_ACTION)).toEqual({
          href: '#',
          label: LABEL,
          onAction: ON_ACTION
        });
      });

      it('should use aria_suffix specified in cya_link', () => {
        const ARIA_SUFFIX = 'This is hidden text';
        const CYA_LINK = { aria_suffix: ARIA_SUFFIX };
        const ON_ACTION = () => {};
        expect(getCYAAction(false, CYA_LINK, ON_ACTION)).toEqual({
          href: '#',
          label: 'Change',
          aria_suffix: ARIA_SUFFIX,
          onAction: ON_ACTION
        });
      });

      it('should use all properties specified in cya_link', () => {
        const URL = 'https://fake.url.com/something';
        const LABEL = 'Alpha Bravo Charlie';
        const ARIA_SUFFIX = 'This is hidden text';
        const CYA_LINK = { label: LABEL, url: URL, aria_suffix: ARIA_SUFFIX };
        const ON_ACTION = () => {};
        expect(getCYAAction(false, CYA_LINK, ON_ACTION)).toEqual({
          href: URL,
          label: LABEL,
          aria_suffix: ARIA_SUFFIX,
          onAction: ON_ACTION
        });
      });

    });

  });

});
