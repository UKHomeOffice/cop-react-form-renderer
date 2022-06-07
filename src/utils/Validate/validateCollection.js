// Local imports
import validateContainer from './validateContainer';

const validateCollection = (collection, items) => {
  const errors = [];
  if (collection && Array.isArray(collection.item) && Array.isArray(items)) {
    items.forEach((item, index) => {
      const full_path = `${collection.full_path || collection.fieldId}[${index}]`;
      const container = {
        full_path,
        components: collection.item.map(component => {
          return {
            ...component,
            full_path: `${full_path}.${component.fieldId}`
          };
        })
      };
      errors.push(validateContainer(container, item));
    });
  }
  return errors.filter(e => !!e).flat();
};

export default validateCollection;
