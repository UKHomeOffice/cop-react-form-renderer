// Global imports
import { Utils } from '@ukhomeoffice/cop-react-components';

// Local imports
import { CollectionLabels, ComponentTypes } from '../../models';
import getCYARowsForContainer from './getCYARowsForContainer';
import showComponentCYA from './showComponentCYA';

const getContainerForItem = (collection, item, labelCount, full_path) => {
  return {
    id: item.id,
    fieldId: item.id,
    type: ComponentTypes.CONTAINER,
    required: collection.required,
    full_path,
    components: collection.item.map(component => {
      return {
        ...component,
        label: Utils.interpolateString(component.label, { ...item, index: labelCount }),
        full_path: `${full_path}.${component.fieldId}`
      };
    })
  };
};

const getTitleRowForItem = (collection, item, pageId, labelCount, full_path) => {
  const labels = {
    ...CollectionLabels,
    ...collection.labels
  };
  if (labels.item) {
    return {
      pageId,
      fieldId: collection.fieldId,
      full_path: full_path,
      key: Utils.interpolateString(labels.item, { ...item, index: labelCount }),
      type: 'title',
      action: null
    };
  }
  return null;
};

const getCYARowsForCollection = (page, collection, items, onAction) => {
  if (Array.isArray(items) && showComponentCYA(collection, page.formData)) {
    return items.flatMap((item, index) => {
      const labelCount = (collection.countOffset || 0) + index + 1;
      const full_path = `${collection.full_path || collection.fieldId}[${index}]`;
      const container = getContainerForItem(collection, item, labelCount, full_path);
      return [
        getTitleRowForItem(collection, item, page.id, labelCount, full_path),
        ...getCYARowsForContainer(page, container, item, onAction)
      ];
    }).filter(r => !!r);
  }
  return [];
};

export default getCYARowsForCollection;
