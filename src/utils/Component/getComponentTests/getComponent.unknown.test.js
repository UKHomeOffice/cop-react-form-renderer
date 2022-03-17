// Local imports
import getComponent from '../getComponent';

describe('utils.Component.get', () => {
      
  it('should return null for an unknown type', () => {
    expect(getComponent({ type: 'unknown' })).toBeNull();
  });

});
