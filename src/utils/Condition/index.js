import meetsAllConditions from './meetsAllConditions';
import meetsCondition from './meetsCondition';
import meetsOneCondition from './meetsOneCondition';

const Condition = {
  meetsOne: meetsOneCondition,
  meetsAll: meetsAllConditions,
  met: meetsCondition
};

export default Condition;
