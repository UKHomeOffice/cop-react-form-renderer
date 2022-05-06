// Local imports
import Data from '../Data';
import meetsCondition from './meetsCondition';
import setupConditions from './setupConditions';

/**
 * Evaluates all condition(s) on a page, container, or component.
 * @param {object} options The container to consider.
 * @param {object} data The top-level form data.
 * @returns Boolean true if all conditions are met; false otherwise.
 */
const meetsAllConditions = (options, data) => {
  const conditions = setupConditions(options);
  if (conditions) {
    const arr = Array.isArray(conditions) ? conditions : [conditions];
    return arr.every(condition => {
      const sourceDataValue = Data.getSource(data, condition.field);
      return meetsCondition(condition, sourceDataValue);
    });
  }
  return true;
};

export default meetsAllConditions;
