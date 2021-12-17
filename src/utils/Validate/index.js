// Local imports
import validateComponent from './validateComponent';
import validateEmail from './validateEmail';
import validatePage from './validatePage';
import validateRequired from './validateRequired';

const Validate = {
  component: validateComponent,
  email: validateEmail,
  page: validatePage,
  required: validateRequired
};

export default Validate;