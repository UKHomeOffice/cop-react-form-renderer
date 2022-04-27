// Local imports
import Data from '../Data';
import meetsCondition from './meetsCondition';

/**
 * Evaluates all condition(s) on a page, container, or component.
 * @param {object} conditions The container to consider.
 * @param {object} data The top-level form data.
 * @returns Boolean true if all conditions are met; false otherwise.
 */
const meetsAllConditions = (conditions, data) => {
  if (conditions) {
    const arr = Array.isArray(conditions) ? conditions : [conditions];
    return arr.reduce((allMet, condition) => {
      const sourceDataValue = Data.getSource(data, condition.field);
      return allMet && meetsCondition(condition, sourceDataValue);
    }, true);
  }
  return true;
};

export default meetsAllConditions;
