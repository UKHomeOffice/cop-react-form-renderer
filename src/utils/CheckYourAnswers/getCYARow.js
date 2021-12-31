// Local imports
import Component from '../Component';
import getCYAAction from './getCYAAction';

/**
 * Gets a row object, configured appropriately for a Check your answers component.
 * 
 * @param {object} page The page to which this component row belongs.
 * @param {object} component The component to render on this row.
 * @param {Function} onAction A function to invoke if the change link is clicked.
 * 
 * @returns A configuration object for a Check your answers row.
 */
const getCYARow = (page, component, onAction) => {
  return {
    pageId: page.id,
    fieldId: component.fieldId,
    key: component.label || component.cya_label,
    component: Component.editable(component) ? component : undefined,
    value: page.formData[component.fieldId] || '',
    action: getCYAAction(component.readonly, page.cya_link, onAction)
  };
};

export default getCYARow;