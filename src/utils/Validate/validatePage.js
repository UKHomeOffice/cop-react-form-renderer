// Global imports
import { Utils } from '@ukhomeoffice/cop-react-components';

// Local imports
import validateComponent from './validateComponent';
import showFormPage from '../FormPage/showFormPage';

/**
 * Validate all of the components on a page.
 * @param {object} page The page to validate
 * @returns An array containing all of the errors.
 */
const validatePage = (page) => {
  if (showFormPage(page, page.formData) && Array.isArray(page.components)) {
    const errs = page.components.reduce((errors, component) => {
      let componentErrors = validateComponent(component, page.formData, page.formData);
      return errors.concat(componentErrors).flat().map(err => {
        return !!err ? { ...err, error: Utils.interpolateString(err.error, page.formData) } : err;
      });
    }, []).filter(e => !!e).flat();
    return errs;
  }
  return [];
};

export default validatePage;
