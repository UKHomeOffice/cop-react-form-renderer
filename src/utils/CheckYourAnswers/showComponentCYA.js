// Local imports
import { ComponentTypes } from '../../models';
import Component from '../Component';
import Container from '../Container';

const EXCLUDE_FROM_CYA = [
  ComponentTypes.HEADING,
  ComponentTypes.HTML,
  ComponentTypes.INSET_TEXT
];

/**
 * Determines whether a given component should display on the Check your answers screen.
 * 
 * @param {object} options The component options.
 * @param {object} data The data contained on the form.
 * 
 * @returns A boolean true if the component should show; otherwise false.
 */
const showComponentCYA = (options, data) => {
  if (!options) {
    return false;
  }
  if (EXCLUDE_FROM_CYA.includes(options.type)) {
    return false;
  }
  if (options.type === ComponentTypes.CONTAINER) {
    return Container.show(options, data);
  }
  return Component.show(options, data);
};

export default showComponentCYA;
