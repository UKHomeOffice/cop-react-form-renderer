import { ComponentTypes } from '../../models';

const nestComponents = (container) => {
  const containerPath = container.full_path || container.fieldId;
  return container.components.map(component => {
    const full_path = containerPath ? `${containerPath}.${component.fieldId}` : component.fieldId;
    const ret = { ...component, full_path };
    if (component.type === ComponentTypes.CONTAINER) {
      return setupNesting(ret);
    }
    return ret;
  });
};

const setupNesting = (container) => {
  if (container) {
    const components = nestComponents(container);
    return { ...container, components };
  }
  return container;
};

export default setupNesting;
