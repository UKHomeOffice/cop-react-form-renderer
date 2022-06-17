// Local imports
import Data from '../Data';
import meetsCondition from './meetsCondition';
import setupConditions from './setupConditions';

/**
 * Evaluates all condition(s) on a page, container, or component.
 * @param {object} options The container to consider.
 * @param {object} data The top-level form data.
 * @returns Boolean true if at least one conditions is met; false otherwise.
 */

const meetsOneCondition = (options, data) => {
  const conditions = setupConditions(options);
  if (conditions) {
    const arr = Array.isArray(conditions) ? conditions: [conditions];
    return arr.some(condition => {
      const sourceDataValue = Data.getSource(data, condition.field);
      return meetsCondition(condition, sourceDataValue);
    });
  }
  return true;
}

export default meetsOneCondition
