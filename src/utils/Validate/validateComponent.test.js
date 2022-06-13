// Local imports
import { ComponentTypes } from '../../models';
import validateComponent from './validateComponent';

describe('utils.Validate.Component', () => {
  
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
            error: `${LABEL} is required`,
          });
        });

        it('should return a required error when the component is required and of type email', () => {
          const ID = 'field';
          const LABEL = 'Field';
          const COMPONENT = setup(ID, ComponentTypes.EMAIL, LABEL, true);
          expect(validateComponent(COMPONENT, null)).toEqual({
            id: ID,
            error: `${LABEL} is required`,
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
            error: `Enter ${LABEL.toLowerCase()} in the correct format, like jane.doe@homeoffice.gov.uk`,
          });
        });

        it('should return no error when the component is of type email but not required', () => {
          const LABEL = 'Field';
          const COMPONENT = setup(ID, ComponentTypes.EMAIL, LABEL, false);
          expect(validateComponent(COMPONENT, DATA)).toEqual({
            id: ID,
            error: `Enter ${LABEL.toLowerCase()} in the correct format, like jane.doe@homeoffice.gov.uk`,
          });
        });
      });

      describe('when the component is a Date Input', () => {
        const ID = 'field';

        it('should always reject invalid dates', () => {
          const LABEL = 'Field';
          const COMPONENT = setup(ID, ComponentTypes.DATE, LABEL, false);
          const DATA = { [ID]: '25-45-2033' };
          expect(validateComponent(COMPONENT, DATA)).toEqual({
            error: 'Month must be between 1 and 12',
            id: ID,
            properties: { month: true },
          });
        });

        it('should apply optional validators when specified', () => {
          const LABEL = 'Field';
          const DATA = { [ID]: '25-3-3033' };
          const ADDITIONAL_VALIDATION = [
            { function: 'mustBeBefore', value: 3, unit: 'day', message: 'Date must be less than 3 days in the future' },
          ];
          const COMPONENT = setup(ID, ComponentTypes.DATE, LABEL, false, ADDITIONAL_VALIDATION);
          expect(validateComponent(COMPONENT, DATA)).toEqual({
            error: 'Date must be less than 3 days in the future',
            id: ID,
            properties: { day: true, month: true, year: true },
          });
        });
      });

      describe('when the component is a Time Input', () => {
        const ID = 'field';
        it('should always reject invalid time', () => {
          const LABEL = 'Field';
          const COMPONENT = setup(ID, ComponentTypes.TIME, LABEL, false);
          const DATA = { [ID]: '25:45' };
          expect(validateComponent(COMPONENT, DATA)).toEqual({
            error: 'Hour must be between 0 and 23',
            id: ID,
            properties: { hour: true },
          });
        });
      });

      describe('when the component is a container', () => {
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
              [EMAIL_ID]: 'alpha.bravo@digital.homeoffice.gov.uk',
            },
          };
          expect(validateComponent(CONTAINER, DATA)).toEqual([]);
        });
      });

      describe('when the component is a collection', () => {
        it('should return an empty array when the collection has only valid items', () => {
          const EMAIL_ID = 'email';
          const EMAIL_LABEL = 'Email';
          const EMAIL = setup(EMAIL_ID, ComponentTypes.EMAIL, EMAIL_LABEL, false);
          const ID = 'collection';
          const LABEL = 'field';
          const COLLECTION = setup(ID, ComponentTypes.COLLECTION, LABEL, false);
          COLLECTION.item = [EMAIL];
          const DATA = {
            [ID]: [{ [EMAIL_ID]: 'alpha.bravo@homeoffice.gov.uk' }, { [EMAIL_ID]: 'charlie.delta@homeoffice.gov.uk' }],
          };
          expect(validateComponent(COLLECTION, DATA)).toEqual([]);
        });
      });

      describe('when the component has a nested component', () => {
        it('should return no error when the radio component contains nested components without errors', () => {
          const NESTED_ID = 'nestedId';
          const NESTED_VALUE = 'nestedValue';
          const FORMDATA = { [NESTED_ID]: NESTED_VALUE };
          const COMPONENT = {
            type: 'radios',
            id: 'a',
            data: {
              options: [
                {
                  nested: [
                    {
                      type: 'text',
                      fieldId: NESTED_ID,
                      id: NESTED_ID,
                      required: true,
                      shown: true,
                    },
                  ],
                },
              ],
            },
          };
          expect(validateComponent(COMPONENT, FORMDATA)).toEqual([]);
        });

        it('should return an error when the radio component contains nested components with errors', () => {
          const NESTED_ID = 'nestedId';
          const FORMDATA = {};
          const COMPONENT = {
            type: 'radios',
            id: 'a',
            data: {
              options: [
                {
                  nested: [
                    {
                      type: 'text',
                      fieldId: NESTED_ID,
                      id: NESTED_ID,
                      required: true,
                      shown: true,
                    },
                  ],
                },
              ],
            },
          };
          expect(validateComponent(COMPONENT, FORMDATA)).toEqual([{
            id: NESTED_ID,
            error: `Field is required`,
          }]);
        });

        it('should return no error when a non selected radio component contains nested components with errors', () => {
          const NESTED_ID = 'nestedId';
          const COMPONENT = {
            type: 'radios',
            id: 'a',
            data: {
              options: [
                {
                  value: 'optionValue',
                  nested: [
                    {
                      type: 'text',
                      fieldId: NESTED_ID,
                      id: NESTED_ID,
                      required: true,
                    },
                  ],
                },
              ],
            },
          };
          expect(validateComponent(COMPONENT, {})).toEqual([]);
        });
      });
});
