// Global imports
import { Utils } from '@ukhomeoffice/cop-react-components';

// Local imports
import validateComponent from './validateComponent';
import showFormPage from '../FormPage/showFormPage';

/**
 * Validate all of the components on a page.
 * @param {object} page The page to validate
 * @param {object} patch The page's local patch data.
 * @returns An array containing all of the errors.
 */
const validatePage = (page, patch) => {
  let validationData = { ...page.formData, ...patch };
  if (showFormPage(page, page.formData) && Array.isArray(page.components)) {
    const errs = page.components.reduce((errors, component) => {
      let componentErrors = validateComponent(component, validationData, validationData);
      return errors.concat(componentErrors).flat().map(err => {
        return !!err ? { ...err, error: Utils.interpolateString(err.error, validationData) } : err;
      });
    }, []).filter(e => !!e).flat();
    return errs;
  }
  return [];
};

export default validatePage;
