// Local imports
import formatData from './formatData';

/**
 * Formats the data for a given component, according to the component's format configuration.
 * @param {object} component The component to format.
 * @param {object} data The top-level form data.
 * @param {string} eventType What type of event initiated this call.
 */
const formatDataForComponent = (component, data, eventType) => {
  if (component.format && component.format.on === eventType) {
    data[component.fieldId] = formatData(component.format, data[component.fieldId]);
  }
};

/**
 * Formats the data for an array of components, according to each component's format configuration.
 * @param {Array} components The array of components to format.
 * @param {object} data The top-level form data.
 * @param {string} eventType What type of event initiated this call.
 */
export const formatDataForComponents = (components, data, eventType) => {
  components.forEach(component => formatDataForComponent(component, data, eventType));
};

export default formatDataForComponent;
