// Local imports
import { ComponentTypes } from '../../models';
import validateComponent from './validateComponent';

describe('utils', () => {

  describe('Validate', () => {

    describe('component', () => {

      const setup = (id, type, label, required) => {
        return { id, fieldId: id, type, label, required };
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

      });

    });

  });

});
