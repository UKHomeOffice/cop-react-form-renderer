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
  }

  setNestedValue(component, page);

  return {
    pageId: page.id,
    id: component.id,
    fieldId: component.fieldId,
    key: component.label || component.cya_label,
    component: Component.editable(component) ? component : undefined,
    value: value || '',
    action: getCYAAction(component.readonly, page, onAction)
  };
};

const setNestedValue = (component, page) => {
  component.data?.options?.forEach((option, index) => {
    //check if option is selected and has nested component
    if (page.formData[component.id] === option.value && option.nested) {
      component.data.options[index].nested.value = page.formData[option.nested.id];
    }
  });
}

export default getCYARow;
