// Local imports
import { ComponentTypes } from '../../models';
import FormPage from '../FormPage';
import getCYARow from './getCYARow';
import getCYARowForGroup from './getCYARowForGroup';
import getCYARowsForContainer from './getCYARowsForContainer';
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
  if (FormPage.show(page, page.formData)) {
    const rows = page.components.filter(c => showComponentCYA(c, page.formData)).flatMap(component => {
      if (component.type === ComponentTypes.CONTAINER) {
        return getCYARowsForContainer(page, component, page.formData[component.fieldId], onAction);
      }
      return getCYARow(page, component, onAction);
    });

    if (page.groups?.length > 0) {
      page.groups.forEach(group => {
        const { row, insertAt } = getCYARowForGroup(page, group, rows, onAction);
        if (insertAt > -1) {
          rows.splice(insertAt, 0, row);
        } else {
          rows.push(row);
        }
      });
      const allReplacedIds = page.groups.flatMap(g => g.components);
      return rows.filter(r => !allReplacedIds.includes(r.id));
    }
    
    return rows;
  }
  return [];
};

export default getCYARowsForPage;