// Local imports
import Validate from '../../../utils/Validate';
import canActionProceed from './canActionProceed';

describe('components.FormRenderer.helpers.canActionProceed', () => {

  it('should return true when the action does not require validation', () => {
    const ACTION = { validate: false };
    expect(canActionProceed(ACTION, {}, Validate.page)).toBeTruthy();
  });

  it('should return true when the page is valid', () => {
    const ACTION = { validate: true };
    const PAGE = {
      components: [
        { id: 'a', fieldId: 'a', label: 'Alpha', required: true }
      ],
      formData: {
        a: 'Bravo'
      }
    };
    expect(canActionProceed(ACTION, PAGE, Validate.page)).toBeTruthy();
  });

  it('should return false when the page is invalid', () => {
    const ACTION = { validate: true };
    const PAGE = {
      components: [
        { id: 'a', fieldId: 'a', label: 'Alpha', required: true }
      ],
      formData: {}
    };
    expect(canActionProceed(ACTION, PAGE, Validate.page)).toBeFalsy();
  });

});
