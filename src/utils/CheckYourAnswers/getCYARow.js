// Local imports
import Component from '../Component';
import getCYAAction from './getCYAAction';

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
