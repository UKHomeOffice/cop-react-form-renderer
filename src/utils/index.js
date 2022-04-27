// Global imports
import { Utils as HOUtils } from '@ukhomeoffice/cop-react-components';

// Local imports
import CheckYourAnswers from './CheckYourAnswers';
import Component from './Component';
import Condition from './Condition';
import Data from './Data';
import Format from './Format';
import FormPage from './FormPage';
import Hub from './Hub';
import Validate from './Validate';

const Utils = {
  CheckYourAnswers,
  Component,
  Data,
  Format,
  FormPage,
  Hub,
  Condition,
  Validate,
  ...HOUtils
};

export default Utils;
