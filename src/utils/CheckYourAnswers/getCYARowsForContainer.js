// Local imports
import { ComponentTypes } from '../../models';
import getCYARow from './getCYARow';
import showComponentCYA from './showComponentCYA';

const getCYARowsForContainer = (page, container, formData, onAction) => {
  if (showComponentCYA(container, page.formData)) {
    return container.components.filter(c => showComponentCYA(c, page.formData)).flatMap(component => {
      if (component.type === ComponentTypes.CONTAINER) {
        const fd = formData ? formData[component.fieldId] : undefined;
        return getCYARowsForContainer(page, component, fd, onAction);
      }
      return getCYARow({ ...page, formData }, component, onAction);
    });
  }
};

export default getCYARowsForContainer;
