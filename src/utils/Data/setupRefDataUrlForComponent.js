// Global imports
import { Utils as HOUtils } from '@ukhomeoffice/cop-react-components';

const setupRefDataUrlForComponent = (component, data) => {
  if (component && component.data && component.data.url) {
    return {
      ...component,
      data: {
        ...component.data,
        url: HOUtils.interpolateString(component.data.url, data)
      }
    };
  }
  return component;
};

export default setupRefDataUrlForComponent;
