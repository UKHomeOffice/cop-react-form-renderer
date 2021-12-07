// Local imports
import Data from '../Data';
import meetsCondition from '../meetsCondition';

const showComponent = (component, data) => {
  if (!component) {
    return false;
  }
  if (component.hidden && component.disabled) {
    return false;
  }
  if (component.show_when) {
    if (Array.isArray(component.show_when)) {
      let allConditionsMet = true;
      component.show_when.forEach(condition => {
        const sourceDataValue = Data.getSource(data, condition.field);
        allConditionsMet = allConditionsMet && meetsCondition(condition, sourceDataValue);
      });
      return allConditionsMet;
    } else {
      const sourceDataValue = Data.getSource(data, component.show_when.field);
      return meetsCondition(component.show_when, sourceDataValue);
    }
  }
  return true;
};

export default showComponent;
