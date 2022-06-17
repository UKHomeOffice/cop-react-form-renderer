// Local imports
import Data from '../Data';

const makeComponentFieldsAbsolute = (component) => {
  if (component.show_when?.type){
    const full_path = component.full_path;
    const show_when = Array.isArray(component.show_when.conditions) ? component.show_when.conditions : [component.show_when.conditions];
    return show_when.map(sw => {
      const field = Data.getDataPath(sw.field, full_path);
      return {...sw, field};
    })
  }
  if (component.show_when) {
    const full_path = component.full_path;
    const show_when = Array.isArray(component.show_when) ? component.show_when : [component.show_when];
    return show_when.map(sw => {
      const field = Data.getDataPath(sw.field, full_path);
      return { ...sw, field };
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
