// Local imports
import validateContainer from './validateContainer';

/**
 * Validates all of the items within a collection.
 * @param {object} collection The collection to validate.
 * @param {object} items The data items in the collection.
 * @param {object} formData The data at the top level of the form.
 * @returns Errors for all components for all items within the collection.
 */
const validateCollection = (collection, items, formData) => {
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
      errors.push(validateContainer(container, item, formData));
    });
  }
  return errors.filter(e => !!e).flat();
};

export default validateCollection;
