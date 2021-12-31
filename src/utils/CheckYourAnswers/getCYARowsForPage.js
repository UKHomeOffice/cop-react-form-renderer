// Local imports
import getCYARow from './getCYARow';
import showComponentCYA from './showComponentCYA';

/**
 * Gets an array of row objects, each configured appropriately for a Check your answers component.
 * 
 * @param {object} page The page to show components for.
 * @param {Function} onAction A function to invoke if the change link on any row is clicked.
 * 
 * @returns An array of configuration objects for Check your answers rows.
 */
const getCYARowsForPage = (page, onAction) => {
  return page.components.filter(c => showComponentCYA(c, page.formData)).map(component => {
    return getCYARow(page, component, onAction);
  });
};

export default getCYARowsForPage;
