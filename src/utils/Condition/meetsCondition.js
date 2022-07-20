const getComparisonValue = (condition) => {
  if (['in', 'nin'].includes(condition.op)) {
    return condition.values;
  }
  return condition.value;
};

/**
 * Looks at a condition object to see if the supplied value meets it.
 * The condition object contains an `op` property, along with a comparator
 * `value` (or `values`).
 * 
 * The evaluation is strict - i.e., it matches the value AND the type.
 * 
 * @param {object} condition The condition object.
 * @param {*} value The value to test against the condition.
 * 
 * @returns A boolean indicating whether the value meets the condition.
 */
const meetsCondition = (condition, value) => {
  if (condition && typeof(condition) === 'object') {
    const compare = getComparisonValue(condition);
    switch (condition.op) {
      case '=':
      case 'eq': {
        return compare === value;
      }
      case '!=':
      case '<>':
      case 'ne':
      case 'neq': {
        return compare !== value;
      }
      case 'in': {
        if (Array.isArray(compare)) {
          return compare.includes(value);
        }
        // If it's not an array, nothing can be IN it, so it must fail the condition.
        return false;
      }
      case 'nin': {
        if (Array.isArray(compare)) {
          return compare.includes(value) === false;
        }
        // If it's not an array, nothing can be IN it, so it must meet the condition.
        return true;
      }
      case 'contains': {
        return value?.toString().toLowerCase().includes(compare);
       // If no value is provided, the field cannot contain it, so it must fail the condition.
      }
      default:
        return false;
    }
  }
  return true;
};

export default meetsCondition;
