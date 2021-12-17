// Local imports
import Data from '../Data';
import getParagraphFromText from './getParagraphFromText';
import useComponent from './useComponent';

const getFormPage = (pageOptions, formComponents, formData) => {
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

    return formData && formData.environmentContext ? Data.refData.setupUrl(ret, formData) : ret;
  });
  return {
    ...pageOptions,
    formData,
    components
  };
};

export default getFormPage
