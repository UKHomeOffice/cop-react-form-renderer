// Local imports
import Component from '../Component';
import Condition from '../Condition';
import getEditableComponents from './getEditableComponents';

/**
 * Checks whether any of the editable components on a container should be shown.
 * @param {Array} editableComponents The editable components on the container.
 * @param {object} data The top-level form data.
 * @returns Boolean true if ANY of the editable components should be shown; false otherwise.
 */
const showEditableComponent = (editableComponents, data) => {
  return editableComponents.some(component => Component.show(component, data));
};

/**
 * Indicates whether or not a container should be shown.
 * @param {object} container The container to consider.
 * @param {object} data The top-level form data.
 * @returns Boolean true if the container should be shown; false if not.
 */
const showContainer = (container, data) => {
  if (!container) {
    return false;
  }

  // If the container has a show_when condition, we should evaluate that.
  if (container.show_when) {
    if (container.show_when?.type === "or") {
      return Condition.meetsOne(container, data);
    }
    return Condition.meetsAll(container, data);
  }

  // If the container itself doesn't have a show_when, we need to make sure that if it
  // contains ANY editable components, at least one of them is shown.
  const editableComponents = getEditableComponents(container);
  if (editableComponents.length > 0) {
    return showEditableComponent(editableComponents, data);
  }

  // At this point, either the container has no show_when condition of its own, or
  // the container has no editable components. In either case, it should be shown.
  return true;
};

export default showContainer;
