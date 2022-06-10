// Local imports
import Validate from '../../../utils/Validate';
import canCYASubmit from './canCYASubmit';

describe('components.FormRenderer.helpers.canCYASubmit', () => {

  const ALPHA = { id: 'a', fieldId: 'a', label: 'Alpha', required: true };
  const CHARLIE = { id: 'c', fieldId: 'c', label: 'Charlie', required: true };
  const validatePages = (pages) => {
    return pages.flatMap(page => Validate.page(page));
  };

  it('should return true when all pages are valid', () => {
    const PAGE_1 = {
      components: [ ALPHA ],
      formData: { a: 'Bravo' }
    };
    const PAGE_2 = {
      components: [ CHARLIE ],
      formData: { c: 'Delta' }
    };
    expect(canCYASubmit([ PAGE_1, PAGE_2 ], validatePages)).toBeTruthy();
  });

  it('should return false when the first page is invalid', () => {
    const PAGE_1 = {
      components: [ ALPHA ],
      formData: {}
    };
    const PAGE_2 = {
      components: [ CHARLIE ],
      formData: { c: 'Delta' }
    };
    expect(canCYASubmit([PAGE_1, PAGE_2], validatePages)).toBeFalsy();
  });

  it('should return false when the second page is invalid', () => {
    const PAGE_1 = {
      components: [ ALPHA ],
      formData: { a: 'Bravo' }
    };
    const PAGE_2 = {
      components: [ CHARLIE ],
      formData: {}
    };
    expect(canCYASubmit([PAGE_1, PAGE_2], validatePages)).toBeFalsy();
  });

  it('should return false when the both pages are invalid', () => {
    const PAGE_1 = {
      components: [ ALPHA ],
      formData: {}
    };
    const PAGE_2 = {
      components: [ CHARLIE ],
      formData: {}
    };
    expect(canCYASubmit([PAGE_1, PAGE_2], validatePages)).toBeFalsy();
  });

});
