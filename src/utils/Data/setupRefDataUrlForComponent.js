// Global imports
import { Utils as HOUtils } from '@ukhomeoffice/cop-react-components';
import { ComponentTypes } from '../../models';

const setupRefDataForContainer = (container, data) => ({
  ...container,
  components: setupRefDataUrlForComponents(container.components, data)
});

const setupRefDataForCollection = (collection, data) => ({
  ...collection,
  item: setupRefDataUrlForComponents(collection.item, data)
});

const setupRefDataUrlForComponents = (components, data) => {
  return components.map(component => setupRefDataUrlForComponent(component, data));
};

const setupRefDataUrlForComponent = (component, data) => {
  if (component) {
    if (component.type === ComponentTypes.CONTAINER) {
      return setupRefDataForContainer(component, data);
    }
    if (component.type === ComponentTypes.COLLECTION) {
      return setupRefDataForCollection(component, data);
    }
    if (component.data && component.data.url) {
      return {
        ...component,
        data: {
          ...component.data,
          url: HOUtils.interpolateString(component.data.url, data)
        }
      };
    }
  }
  return component;
};

export default setupRefDataUrlForComponent;
