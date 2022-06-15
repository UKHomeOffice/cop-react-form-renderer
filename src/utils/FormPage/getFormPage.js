// Local imports
import { Utils } from '@ukhomeoffice/cop-react-components';
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
  pageOptions = interpolatePageOptions(pageOptions, formData);
  formComponents = interpolateFormComponents(formComponents, formData);
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

/**
 * Interpolate 'Variable Expression' using formData - for local use only.
 * @param {object} pageOptions The JSON page.
 * @param {object} formData The top-level form data, used for setting up components.
 * @returns interpolated pageOptions.
 */
const interpolatePageOptions = (pageOptions, formData) => {
  return JSON.parse(Utils.interpolateString(JSON.stringify(pageOptions), formData));
}
/**
 * Interpolate 'Variable Expression' using formData excluding each component's data block - for local use only.
 * @param {Array} formComponents The components defined at the top-level of the form.
 * @param {object} formData The top-level form data, used for setting up components.
 * @returns interpolated formComponents
 */
const interpolateFormComponents = (formComponents, formData) => {
    return formComponents.map((c, i) => {
      let formComponentsData = formComponents[i].data;
      let  interpolatedFormComponent = JSON.parse(Utils.interpolateString(JSON.stringify(formComponents[i]), formData));
      interpolatedFormComponent.data = formComponentsData;
      return interpolatedFormComponent;
    })
}

export default getFormPage;
