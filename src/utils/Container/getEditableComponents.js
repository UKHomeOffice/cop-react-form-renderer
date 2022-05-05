// Local imports
import { ComponentTypes } from '../../models';
import Component from '../Component';

/**
 * Gets all the editable components in a container.
 * @param {object} container The container to consider.
 * @returns An array of ONLY the editable components in a container.
 */
const getEditableComponents = (container) => {
  if (container && Array.isArray(container.components)) {
    return container.components.flatMap(c => {
      if (c.type === ComponentTypes.CONTAINER) {
        return getEditableComponents(c);
      }
      return Component.editable(c) ? c : null;
    }).filter(c => !!c);
  }
  return [];
};

export default getEditableComponents;
