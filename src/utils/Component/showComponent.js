// Local imports
import Condition from '../Condition';

const showComponent = (component, data) => {
  if (!component) {
    return false;
  }
  if (component.hidden && component.disabled) {
    return false;
  }
  return Condition.meetsAll(component.show_when, data);
};

export default showComponent;
