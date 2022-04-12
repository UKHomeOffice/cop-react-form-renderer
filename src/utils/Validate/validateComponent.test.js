// Local imports
import { ComponentTypes } from '../../models';
import validateComponent from './validateComponent';

describe('utils', () => {

  describe('Validate', () => {

    describe('component', () => {

      const setup = (id, type, label, required, additionalValidation) => {
        return { id, fieldId: id, type, label, required, additionalValidation };
      };

      it('should return no error when the component is null', () => {
        expect(validateComponent(null, {})).toBeUndefined();
      });

      describe('when there is no form data', () => {

        it('should return no error when the component is not required and not an email type', () => {
          const ID = 'field';
          const LABEL = 'Field';
          const COMPONENT = setup(ID, ComponentTypes.TEXT, LABEL, false);
          expect(validateComponent(COMPONENT, null)).toBeUndefined();
        });
  
        it('should return a required error when the component is required and not an email type', () => {
          const ID = 'field';
          const LABEL = 'Field';
          const COMPONENT = setup(ID, ComponentTypes.TEXT, LABEL, true);
          expect(validateComponent(COMPONENT, null)).toEqual({
            id: ID,
            error: `${LABEL} is required`
          });
        });
  
        it('should return a required error when the component is required and of type email', () => {
          const ID = 'field';
          const LABEL = 'Field';
          const COMPONENT = setup(ID, ComponentTypes.EMAIL, LABEL, true);
          expect(validateComponent(COMPONENT, null)).toEqual({
            id: ID,
            error: `${LABEL} is required`
          });
        });
  
        it('should return no error when the component is of type email but not required', () => {
          const ID = 'field';
          const LABEL = 'Field';
          const COMPONENT = setup(ID, ComponentTypes.EMAIL, LABEL, false);
          expect(validateComponent(COMPONENT, null)).toBeUndefined();
        });

      });

      describe('when the value is fully valid', () => {
        const ID = 'field';
        const DATA = { [ID]: 'alpha.bravo@digital.homeoffice.gov.uk' };

        it('should return no error when the component is not required and not an email type', () => {
          const LABEL = 'Field';
          const COMPONENT = setup(ID, ComponentTypes.TEXT, LABEL, false);
          expect(validateComponent(COMPONENT, DATA)).toBeUndefined();
        });
  
        it('should return no error when the component is required and not an email type', () => {
          const LABEL = 'Field';
          const COMPONENT = setup(ID, ComponentTypes.TEXT, LABEL, true);
          expect(validateComponent(COMPONENT, DATA)).toBeUndefined();
        });
  
        it('should return no error when the component is required and of type email', () => {
          const LABEL = 'Field';
          const COMPONENT = setup(ID, ComponentTypes.EMAIL, LABEL, true);
          expect(validateComponent(COMPONENT, DATA)).toBeUndefined();
        });
  
        it('should return no error when the component is of type email but not required', () => {
          const LABEL = 'Field';
          const COMPONENT = setup(ID, ComponentTypes.EMAIL, LABEL, false);
          expect(validateComponent(COMPONENT, DATA)).toBeUndefined();
        });

      });

      describe('when the value is an invalid email', () => {
        const ID = 'field';
        const DATA = { [ID]: 'alpha.bravo@hotmail.com' };

        it('should return no error when the component is not required and not an email type', () => {
          const LABEL = 'Field';
          const COMPONENT = setup(ID, ComponentTypes.TEXT, LABEL, false);
          expect(validateComponent(COMPONENT, DATA)).toBeUndefined();
        });
  
        it('should return no error when the component is required and not an email type', () => {
          const LABEL = 'Field';
          const COMPONENT = setup(ID, ComponentTypes.TEXT, LABEL, true);
          expect(validateComponent(COMPONENT, DATA)).toBeUndefined();
        });
  
        it('should return no error when the component is required and of type email', () => {
          const LABEL = 'Field';
          const COMPONENT = setup(ID, ComponentTypes.EMAIL, LABEL, true);
          expect(validateComponent(COMPONENT, DATA)).toEqual({
            id: ID,
            error: `Enter ${LABEL.toLowerCase()} in the correct format, like jane.doe@homeoffice.gov.uk`
          });
        });
  
        it('should return no error when the component is of type email but not required', () => {
          const LABEL = 'Field';
          const COMPONENT = setup(ID, ComponentTypes.EMAIL, LABEL, false);
          expect(validateComponent(COMPONENT, DATA)).toEqual({
            id: ID,
            error: `Enter ${LABEL.toLowerCase()} in the correct format, like jane.doe@homeoffice.gov.uk`
          });
        });

      });
  
      describe('when the component is a Date Input', () => {
        const ID = 'field';
        
        it('should always reject invalid dates', () => {
          const LABEL = 'Field';
          const COMPONENT = setup(ID, ComponentTypes.DATE, LABEL, false);
          const DATA = { [ID]: '25-45-2033' };
          expect(validateComponent(COMPONENT, DATA)).toEqual({ error: 'Month must be between 1 and 12', id: ID });
        });
        

        it('should apply optional validators when specified', () => {
          const LABEL = 'Field';
          const DATA = { [ID]: '25-3-3033' };
          const ADDITIONAL_VALIDATION = [
            { function: 'mustBeBefore', value: 3, unit: 'day', message: 'Date must be less than 3 days in the future' },
          ]
          const COMPONENT = setup(ID, ComponentTypes.DATE, LABEL, false, ADDITIONAL_VALIDATION);
          expect(validateComponent(COMPONENT, DATA)).toEqual({ error: 'Date must be less than 3 days in the future', id: ID });
        });

      });

      describe('when the component is a Time Input', () => {
        const ID = 'field';
        it('should always reject invalid time', () => {
          const LABEL = 'Field';
          const COMPONENT = setup(ID, ComponentTypes.TIME, LABEL, false);
          const DATA = { [ID]: '25:45' };
          expect(validateComponent(COMPONENT, DATA)).toEqual({ error: 'Hour must be between 0 and 23', id: ID });
        });

      });
    });
  });

});
