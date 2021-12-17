// Local imports
import { ComponentTypes } from '../../models';

/**
 * Converts simple text into a paragraph component.
 * @param {string} content The content to render as a paragraph.
 * @returns An HTML component configuration for a paragraph of the supplied tect.
 */
const getParagraphFromText = (content) => {
  return { type: ComponentTypes.HTML, tagName: 'p', content };
};

export default getParagraphFromText;
