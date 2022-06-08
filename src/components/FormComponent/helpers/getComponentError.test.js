import getComponentError from './getComponentError';

describe('components.FormComponent.helpers.getComponentError', () => {
  const ALPHA = { id: 'alpha' };
  const BETA = { id: 'beta', full_path: 'beta' };
  const ALPHA_ERROR = { id: ALPHA.id, error: 'Alpha is required' };
  const BETA_ERROR = { id: BETA.id, error: 'Year is required', properties: { year: true } };

  it('should return undefined if the errors array is undefined', () => {
    expect(getComponentError(ALPHA, undefined)).toBeUndefined();
  });
  it('should return undefined if the errors array is null', () => {
    expect(getComponentError(ALPHA, null)).toBeUndefined();
  });
  it('should return undefined if the errors array is empty', () => {
    expect(getComponentError(ALPHA, [])).toBeUndefined();
  });
  it('should return undefined if the errors array does not contain an error for the component', () => {
    const ERRORS = [ BETA_ERROR ]
    expect(getComponentError(ALPHA, ERRORS)).toBeUndefined();
  });
  it('should return an appropriate response if the errors array contains an error for the component', () => {
    const ERRORS = [ ALPHA_ERROR ]
    expect(getComponentError(ALPHA, ERRORS)).toEqual({
      error: ALPHA_ERROR.error
    });
  });
  it('should return an appropriate response if the errors array contains an error with properties for the component', () => {
    const ERRORS = [ BETA_ERROR ]
    expect(getComponentError(BETA, ERRORS)).toEqual({
      error: BETA_ERROR.error,
      propsInError: BETA_ERROR.properties
    });
  });

});
