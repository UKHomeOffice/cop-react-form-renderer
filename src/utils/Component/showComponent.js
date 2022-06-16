// Local imports
import Condition from '../Condition';

const showComponent = (component, data) => {
  if (!component) {
    return false;
  }
  if (component.hidden && component.disabled) {
    return false;
  }
  if (component.show_when?.type === "or") {
    return Condition.meetsOne(component, data)
  }
  return Condition.meetsAll(component, data);
};

export default showComponent;
