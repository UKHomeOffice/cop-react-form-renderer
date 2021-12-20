// Local imports
import setupFormData from './setupFormData';
import { default as USER_PROFILE } from '../../json/userProfile.json';
import { default as USER_PROFILE_DATA } from '../../json/userProfile.data.json';

describe('utils', () => {

  describe('Data', () => {

    describe('setupFormData', () => {

      it('should populate a simple form', () => {
        const PAGES = [];
        const COMPONENTS = [
          { fieldId: 'testField', source: { field: 'sourceField' } }
        ];
        const DATA = { sourceField: 'VALUE' };
        const RESULT = setupFormData(PAGES, COMPONENTS, DATA);
        expect(RESULT).toEqual({
          sourceField: 'VALUE',
          testField: 'VALUE'
        });
      });

      it('should handle a missing source field', () => {
        const PAGES = [];
        const COMPONENTS = [
          { fieldId: 'testField', source: { field: 'otherSourceField' } }
        ];
        const DATA = { sourceField: 'VALUE' };
        const RESULT = setupFormData(PAGES, COMPONENTS, DATA);
        expect(RESULT).toEqual({
          sourceField: 'VALUE',
          testField: undefined
        });
      });

      it('should handle a nested source field', () => {
        const PAGES = [];
        const COMPONENTS = [
          { fieldId: 'testField', source: { field: 'nested.sourceField' } }
        ];
        const DATA = { nested: { sourceField: 'VALUE' } };
        const RESULT = setupFormData(PAGES, COMPONENTS, DATA);
        expect(RESULT).toEqual({
          nested: { sourceField: 'VALUE' },
          testField: 'VALUE'
        });
      });

      it('should handle a missing nested source field', () => {
        const PAGES = [];
        const COMPONENTS = [
          { fieldId: 'testField', source: { field: 'nested.otherSourceField' } }
        ];
        const DATA = { nested: { sourceField: 'VALUE' } };
        const RESULT = setupFormData(PAGES, COMPONENTS, DATA);
        expect(RESULT).toEqual({
          nested: { sourceField: 'VALUE' },
          testField: undefined
        });
      });

      it('should handle an entirely missing nested source field', () => {
        const PAGES = [];
        const COMPONENTS = [
          { fieldId: 'testField', source: { field: 'otherNested.sourceField' } }
        ];
        const DATA = { nested: { sourceField: 'VALUE' } };
        const RESULT = setupFormData(PAGES, COMPONENTS, DATA);
        expect(RESULT).toEqual({
          nested: { sourceField: 'VALUE' },
          testField: undefined
        });
      });

      it('should handle sources within pages', () => {
        const PAGES = [
          { components: [ { fieldId: 'pageField', source: { field: 'pageSourceField' } } ] },
          { components: [ { fieldId: 'secondPageField', source: { field: 'secondPageSourceField' } } ] }
        ];
        const COMPONENTS = [
          { fieldId: 'testField', source: { field: 'nested.sourceField' } }
        ];
        const DATA = {
          nested: { sourceField: 'VALUE' },
          pageSourceField: 'PAGE 1',
          secondPageSourceField: 'Bob'
        };
        const RESULT = setupFormData(PAGES, COMPONENTS, DATA);
        expect(RESULT).toEqual({
          nested: { sourceField: 'VALUE' },
          pageSourceField: 'PAGE 1',
          secondPageSourceField: 'Bob',
          testField: 'VALUE',
          pageField: 'PAGE 1',
          secondPageField: 'Bob'
        });
      });

      it('should ignore sources within pages that reference a top-level component', () => {
        const PAGES = [
          { components: [ { fieldId: 'pageField', use: 'testField', source: { field: 'pageSourceField' } } ] },
          { components: [ { fieldId: 'secondPageField', source: { field: 'secondPageSourceField' } } ] }
        ];
        const COMPONENTS = [
          { fieldId: 'testField', source: { field: 'nested.sourceField' } }
        ];
        const DATA = {
          nested: { sourceField: 'VALUE' },
          pageSourceField: 'PAGE 1',
          secondPageSourceField: 'Bob'
        };
        const RESULT = setupFormData(PAGES, COMPONENTS, DATA);
        expect(RESULT).toEqual({
          nested: { sourceField: 'VALUE' },
          pageSourceField: 'PAGE 1',
          secondPageSourceField: 'Bob',
          testField: 'VALUE',
          secondPageField: 'Bob'
        });
      });

      it('should populate data for the user profile configuration and source', () => {
        const { pages, components } = USER_PROFILE;
        const RESULT = setupFormData(pages, components, USER_PROFILE_DATA);

        // It should produce an aggregation of the original source data (USER_PROFILE_DATA)
        // and data calculated for the fields, based on that source data.
        expect(RESULT).toEqual({
          ...USER_PROFILE_DATA,
          firstName: USER_PROFILE_DATA.keycloakContext.givenName,
          surname: USER_PROFILE_DATA.keycloakContext.familyName,
          team: USER_PROFILE_DATA.staffDetailsDataContext.defaultteam,
          staffGradeId: USER_PROFILE_DATA.staffDetailsDataContext.gradeid,
          linemanagerEmail: USER_PROFILE_DATA.extendedStaffDetailsContext.linemanagerEmail,
          delegateEmails: USER_PROFILE_DATA.extendedStaffDetailsContext.delegateEmails
        });
      });
    });

  });

});
