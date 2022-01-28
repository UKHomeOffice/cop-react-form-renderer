// Local imports
import { ComponentTypes } from '../../models';
import getParagraphFromText from './getParagraphFromText';

describe('utils', () => {

  describe('FormPage', () => {

    describe('getParagraphFromText', () => {

      it('should handle text content', () => {
        const CONTENT = 'Appropriate text content';
        expect(getParagraphFromText(CONTENT)).toEqual({
          type: ComponentTypes.HTML,
          tagName: 'p',
          content: CONTENT
        });
      });

      it('should handle undefined content', () => {
        expect(getParagraphFromText(undefined)).toEqual({
          type: ComponentTypes.HTML,
          tagName: 'p'
        });
      });

    });

  });

});
