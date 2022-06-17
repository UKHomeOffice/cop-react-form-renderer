// Local imports
import Data from '../Data';

const makeComponentFieldsAbsolute = (component) => {
  if (component.show_when) {
    let conditions = component.show_when.type ? component.show_when.conditions : component.show_when;
    const full_path = component.full_path;
    conditions = Array.isArray(conditions) ? conditions : [conditions];
    return conditions.map(condition=> {
      const field = Data.getDataPath(condition.field, full_path);
      return { ...condition, field };
    });
  }
  return undefined;
};

const isCondition = (options) => {
  return Array.isArray(options) || !!(options.field && options.op);
};

const setupConditions = (options) => {
  if (options && !isCondition(options)) {
    return makeComponentFieldsAbsolute(options);
  }
  return options;
};

export default setupConditions;
