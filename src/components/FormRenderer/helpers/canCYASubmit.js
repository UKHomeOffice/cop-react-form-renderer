/**
 * Assesses whether the CYA screen can submit.
 * Presently, this will validate all of the form pages and, only if all pages are
 * valid will it proceed.
 * @param {Array} pages All of the pages contained within the form.
 * @param {Function} pagesValidator A function to validate the page.
 * @returns A boolean where `true` means the CYA can submit and `false` means it cannot.
 */
const canCYASubmit = (pages, pagesValidator) => {
  return pagesValidator(pages).length === 0;
};

export default canCYASubmit;
