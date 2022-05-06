// Local imports
import Container from '../Container';
import Data from '../Data';
import getPageActions from './getPageActions';
import getParagraphFromText from './getParagraphFromText';
import useComponent from './useComponent';

/**
 * Converts a page object defined in the JSON to a page object for rendering.
 * @param {object} pageOptions The JSON page.
 * @param {Array} formComponents The components defined at the top-level of the form.
 * @param {object} formData The top-level form data, used for setting up components.
 * @returns A page object for rendering.
 */
const getFormPage = (pageOptions, formComponents, formData) => {
  if (!pageOptions) {
    return null;
  }
  const components = pageOptions.components.map(componentOptions => {
    if (typeof componentOptions === 'string') {
      return getParagraphFromText(componentOptions);
    }
    let ret = undefined;
    if (componentOptions.use) {
      ret = useComponent(componentOptions, formComponents);
    } else {
      ret = { ...componentOptions };
    }

    return formData && formData.urls ? Data.refData.setupUrl(ret, formData) : ret;
  });
  const actions = getPageActions(pageOptions);
  return Container.setup({
    ...pageOptions,
    formData,
    components,
    actions
  });
};

export default getFormPage;
