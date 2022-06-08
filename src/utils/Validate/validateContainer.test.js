// Local imports
import { ComponentTypes } from '../../models';
import validateContainer from './validateContainer';

describe('utils.Validate.Container', () => {

  const setup = (id, type, label, required, additionalValidation) => {
    return { id, fieldId: id, type, label, required, additionalValidation };
  };

  it('should return an empty array when the component is null', () => {
    expect(validateContainer(null, {})).toEqual([]);
  });

  it('should return an empty array when the container has an undefined components array', () => {
    const ID = 'container';
    const LABEL = 'field';
    const CONTAINER = setup(ID, ComponentTypes.CONTAINER, LABEL, false);
    expect(validateContainer(CONTAINER, null)).toEqual([]);
  });

  it('should return an empty array when the container has no components', () => {
    const ID = 'container';
    const LABEL = 'field';
    const CONTAINER = setup(ID, ComponentTypes.CONTAINER, LABEL, false);
    CONTAINER.components = [];
    expect(validateContainer(CONTAINER, null)).toEqual([]);
  });

  it('should return an empty array when the container has only valid components', () => {
    const EMAIL_ID = 'email';
    const EMAIL_LABEL = 'Email';
    const EMAIL = setup(EMAIL_ID, ComponentTypes.EMAIL, EMAIL_LABEL, false);
    const ID = 'container';
    const LABEL = 'field';
    const CONTAINER = setup(ID, ComponentTypes.CONTAINER, LABEL, false);
    CONTAINER.components = [EMAIL];
    const DATA = {
      [ID]: {
        [EMAIL_ID]: 'alpha.bravo@digital.homeoffice.gov.uk'
      }
    };
    expect(validateContainer(CONTAINER, DATA)).toEqual([]);
  });

  it('should return an array containing an error when the container has an invalid component', () => {
    const EMAIL_ID = 'email';
    const EMAIL_LABEL = 'Email';
    const EMAIL = setup(EMAIL_ID, ComponentTypes.EMAIL, EMAIL_LABEL, false);
    const ID = 'container';
    const LABEL = 'field';
    const CONTAINER = setup(ID, ComponentTypes.CONTAINER, LABEL, false);
    CONTAINER.components = [EMAIL];
    const DATA = {
      [ID]: {
        [EMAIL_ID]: 'alpha.bravo@digital.homeoffice.com'
      }
    };
    expect(validateContainer(CONTAINER, DATA)).toEqual([{
        id: EMAIL_ID,
        error: `Enter ${EMAIL_LABEL.toLowerCase()} in the correct format, like jane.doe@homeoffice.gov.uk`
    }]);
  });

});
