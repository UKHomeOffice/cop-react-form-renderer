// Local imports
import { ComponentTypes } from '../../models';

const getParagraphFromText = (content) => {
  return { type: ComponentTypes.HTML, tagName: 'p', content };
};

export default getParagraphFromText;