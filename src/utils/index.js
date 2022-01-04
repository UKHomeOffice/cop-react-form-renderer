// Global imports
import { Utils as HOUtils } from '@ukhomeoffice/cop-react-components';

// Local imports
import CheckYourAnswers from './CheckYourAnswers';
import Component from './Component';
import Data from './Data';
import FormPage from './FormPage';
import Hub from './Hub';
import meetsCondition from './meetsCondition';

const Utils = {
  CheckYourAnswers,
  Component,
  Data,
  FormPage,
  Hub,
  meetsCondition,
  ...HOUtils
};

export default Utils;
