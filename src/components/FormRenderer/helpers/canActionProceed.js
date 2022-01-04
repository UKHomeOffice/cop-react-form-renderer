// Local imports
import Utils from '../../../utils';

/**
 * Assesses whether the action can proceed when navigating, submitting, etc.
 * Presently, this will validate a page when submitting and, only if the page is
 * valid will it proceed. If it's simple navigation, it simply returns true.
 * @param {object} action The action object we're assessing.
 * @param {object} page The page configuration object this action relates to.
 * @param {Function} onError A function to call with any validation errors.
 * @returns A boolean where `true` means the action can proceed and `false` means it cannot.
 */
const canActionProceed = (action, page, onError) => {
  if (action.validate) {
    const errors = Utils.Validate.page(page.components, page.formData);
    onError(errors);
    return errors.length === 0;
  }
  return true;
};

export default canActionProceed;
