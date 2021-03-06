// Global imports
import { Utils } from '@ukhomeoffice/cop-react-components';

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
  let value = '';
  if (page.formData && component.fieldId) {
    value = page.formData[component.fieldId];
    setNestedValue(component, page);
  }

  return {
    pageId: page.id,
    id: component.id,
    fieldId: component.fieldId,
    full_path: component.full_path,
    key: Utils.interpolateString(component.label || component.cya_label, page.formData),
    required: component.required,
    component: Component.editable(component) ? component : undefined,
    value: value || '',
    action: getCYAAction(component.readonly, page, onAction)
  };
};

const setNestedValue = (component, page) => {
  component.data?.options?.forEach((option) => {
    //check if option is selected and has nested component
    if (Array.isArray(option.nested) && page.formData[component.id] === option.value) {
      option.nested.forEach((child) => {
        child.value = page.formData[child.id];
      });
    }
  });
}

export default getCYARow;
