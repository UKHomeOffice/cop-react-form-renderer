// Local imports
import validateComponent from './validateComponent';
import showFormPage from '../FormPage/showFormPage';
import { Utils } from '@ukhomeoffice/cop-react-components';

/**
 * Validate all of the components on a page.
 * @param {object} page The page to validate
 * @returns An array containing all of the errors.
 */
const validatePage = (page) => {
  if (showFormPage(page, page.formData) && Array.isArray(page.components)) {
    return page.components.reduce((errors, component) => {
      return errors.concat(validateComponent(component, page.formData, page.formData)).map(err => {
        return !!err ? { ...err, error: Utils.interpolateString(err.error, page.formData) } : err;
      });
    }, []).filter(e => !!e).flat();
  }
  return [];
};

export default validatePage;
