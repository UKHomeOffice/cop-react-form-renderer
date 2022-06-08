/**
 * Assesses whether the action can proceed when navigating, submitting, etc.
 * Presently, this will validate a page when submitting and, only if the page is
 * valid will it proceed. If it's simple navigation, it simply returns true.
 * @param {object} action The action object we're assessing.
 * @param {object} page The page configuration object this action relates to.
 * @param {Function} pageValidator A function to validate the page.
 * @returns A boolean where `true` means the action can proceed and `false` means it cannot.
 */
const canActionProceed = (action, page, pageValidator) => {
  if (action.validate) {
    return pageValidator(page).length === 0;
  }
  return true;
};

export default canActionProceed;
