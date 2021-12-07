// Global imports
import { Utils as HOUtils } from '@ukhomeoffice/cop-react-components';

// Local imports
import Component from './Component';
import Data from './Data';
import meetsCondition from './meetsCondition';
const Utils = {
  Component,
  Data,
  meetsCondition,
  ...HOUtils
};

export default Utils;
