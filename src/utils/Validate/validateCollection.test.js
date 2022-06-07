// Local imports
import { ComponentTypes } from '../../models';
import validateCollection from './validateCollection';

describe('utils.Validate.Collection', () => {

  const setup = (id, type, label, required, item) => {
    return { id, fieldId: id, type, label, required, item };
  };

  it('should return an empty array when the component is null', () => {
    expect(validateCollection(null, [])).toEqual([]);
  });

  it('should return an empty array when the collection has an undefined item array', () => {
    const ID = 'collection';
    const LABEL = 'field';
    const COLLECTION = setup(ID, ComponentTypes.COLLECTION, LABEL, false, undefined);
    expect(validateCollection(COLLECTION, [])).toEqual([]);
  });

  it('should return an empty array when the collection has an empty item array', () => {
    const ID = 'collection';
    const LABEL = 'field';
    const COLLECTION = setup(ID, ComponentTypes.COLLECTION, LABEL, false, []);
    expect(validateCollection(COLLECTION, [])).toEqual([]);
  });

  it('should return an empty array when the collection has only valid items', () => {
    const EMAIL_ID = 'email';
    const EMAIL_LABEL = 'Email';
    const EMAIL = setup(EMAIL_ID, ComponentTypes.EMAIL, EMAIL_LABEL, false);
    const ID = 'collection';
    const LABEL = 'field';
    const COLLECTION = setup(ID, ComponentTypes.COLLECTION, LABEL, false, [EMAIL]);
    const ITEMS = [
      { [EMAIL_ID]: 'alpha.bravo@homeoffice.gov.uk' },
      { [EMAIL_ID]: 'charlie.delta@homeoffice.gov.uk' }
    ];
    expect(validateCollection(COLLECTION, ITEMS)).toEqual([]);
  });

  it('should return an array containing an error when the collection has an invalid first item', () => {
    const EMAIL_ID = 'email';
    const EMAIL_LABEL = 'Email';
    const EMAIL = setup(EMAIL_ID, ComponentTypes.EMAIL, EMAIL_LABEL, false);
    const ID = 'container';
    const LABEL = 'field';
    const COLLECTION = setup(ID, ComponentTypes.CONTAINER, LABEL, false, [EMAIL]);
    const ITEMS = [
      { [EMAIL_ID]: 'alpha.bravo@digital.homeoffice.com' },
      { [EMAIL_ID]: 'alpha.bravo@digital.homeoffice.gov.uk' }
    ];
    expect(validateCollection(COLLECTION, ITEMS)).toEqual([{
      id: `${ID}[0].${EMAIL_ID}`,
      error: `Enter ${EMAIL_LABEL.toLowerCase()} in the correct format, like jane.doe@homeoffice.gov.uk`
    }]);
  });

  it('should return an array containing an error when the collection has an invalid second item', () => {
    const EMAIL_ID = 'email';
    const EMAIL_LABEL = 'Email';
    const EMAIL = setup(EMAIL_ID, ComponentTypes.EMAIL, EMAIL_LABEL, false);
    const ID = 'container';
    const LABEL = 'field';
    const COLLECTION = setup(ID, ComponentTypes.CONTAINER, LABEL, false, [EMAIL]);
    const ITEMS = [
      { [EMAIL_ID]: 'alpha.bravo@digital.homeoffice.gov.uk' },
      { [EMAIL_ID]: 'alpha.bravo@digital.homeoffice.com' }
    ];
    expect(validateCollection(COLLECTION, ITEMS)).toEqual([{
      id: `${ID}[1].${EMAIL_ID}`,
      error: `Enter ${EMAIL_LABEL.toLowerCase()} in the correct format, like jane.doe@homeoffice.gov.uk`
    }]);
  });

});
