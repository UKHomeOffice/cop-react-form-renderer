// Local imports
import { ComponentTypes } from '../../models';
import showComponentCYA from './showComponentCYA';

describe('utils', () => {

  describe('CheckYourAnswers', () => {
    
    describe('showComponentCYA', () => {

      it('should not show when there are no options', () => {
        expect(showComponentCYA(null, null)).toBeFalsy();
      });

      it('should not show when it is a heading type', () => {
        expect(showComponentCYA({ type: ComponentTypes.HEADING }, null)).toBeFalsy();
      });

      it('should not show when it is an html type', () => {
        expect(showComponentCYA({ type: ComponentTypes.HTML }, null)).toBeFalsy();
      });

      it('should not show when it is an inset-text type', () => {
        expect(showComponentCYA({ type: ComponentTypes.INSET_TEXT }, null)).toBeFalsy();
      });

      it('should not show when it hidden and disabled', () => {
        expect(showComponentCYA({ hidden: true, disabled: true }, null)).toBeFalsy();
      });

      it('should show when it hidden but not disabled', () => {
        expect(showComponentCYA({ hidden: true }, null)).toBeTruthy();
      });

      it('should show when it disabled but not hidden', () => {
        expect(showComponentCYA({ disabled: true }, null)).toBeTruthy();
      });

      it('should show when it not html, inset-text, a heading, hidden, or disabled', () => {
        expect(showComponentCYA({ type: ComponentTypes.TEXT }, null)).toBeTruthy();
      });

    });

  });

});
