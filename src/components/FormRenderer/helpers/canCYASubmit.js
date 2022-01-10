// Local imports
import Utils from '../../../utils';

/**
 * Assesses whether the CYA screen can submit.
 * Presently, this will validate all of the form pages and, only if all pages are
 * valid will it proceed.
 * @param {Array} pages All of the pages contained within the form.
 * @param {Function} onError A function to call with any validation errors.
 * @returns A boolean where `true` means the CYA can submit and `false` means it cannot.
 */
const canCYASubmit = (pages, onError) => {
  const errors = [];
  pages.forEach(p => {
    errors.push(...Utils.Validate.page(p.components, p.formData));
  });
  onError(errors);
  return errors.length === 0;
};

export default canCYASubmit;
