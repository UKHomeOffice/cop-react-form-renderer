// Local imports
import validateComponent from './validateComponent';
import validateDate from './validateDate';
import validateEmail from './validateEmail';
import validatePage from './validatePage';
import validateRegex from './validateRegex';
import validateRequired from './validateRequired';
import validateTime from './validateTime';

const Validate = {
  component: validateComponent,
  email: validateEmail,
  date: validateDate,
  page: validatePage,
  regex: validateRegex,
  required: validateRequired,
  time: validateTime
};

export default Validate;
