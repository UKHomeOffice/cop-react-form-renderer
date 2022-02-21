// Local imports
import handlers from '.';

describe('components', () => {

  describe('FormRenderer', () => {

    describe('handlers', () => {

      describe('cyaAction', () => {

        it('should not call the onChange method when the page is unchanged', () => {
          const CURRENT_PAGE_ID = 'alpha';
          const PAGE = { pageId: CURRENT_PAGE_ID };
          const ON_CHANGE_CALLS = [];
          const ON_CHANGE = (pageId) => {
            ON_CHANGE_CALLS.push(pageId);
          };
          handlers.cyaAction(PAGE, CURRENT_PAGE_ID, ON_CHANGE);
          expect(ON_CHANGE_CALLS.length).toEqual(0);
        });

        it('should call the onChange method when the page has changed', () => {
          const CURRENT_PAGE_ID = 'alpha';
          const NEW_PAGE_ID = 'bravo';
          const PAGE = { pageId: NEW_PAGE_ID };
          const ON_CHANGE_CALLS = [];
          const ON_CHANGE = (pageId) => {
            ON_CHANGE_CALLS.push(pageId);
          };
          handlers.cyaAction(PAGE, CURRENT_PAGE_ID, ON_CHANGE);
          expect(ON_CHANGE_CALLS.length).toEqual(1);
          expect(ON_CHANGE_CALLS[0]).toEqual(NEW_PAGE_ID);
        });

      });

      describe('navigate', () => {

        it('should not call the onNavigate method when the page is unchanged', () => {
          const CURRENT_PAGE_ID = 'alpha';
          const ACTION = { page: CURRENT_PAGE_ID };
          const ON_NAVIGATE_CALLS = [];
          const ON_NAVIGATE = (pageId) => {
            ON_NAVIGATE_CALLS.push(pageId);
          };
          handlers.navigate(ACTION, CURRENT_PAGE_ID, ON_NAVIGATE);
          expect(ON_NAVIGATE_CALLS.length).toEqual(0);
        });

        it('should call the onNavigate method when the page has changed', () => {
          const CURRENT_PAGE_ID = 'alpha';
          const NEW_PAGE_ID = 'bravo';
          const ACTION = { page: NEW_PAGE_ID };
          const ON_NAVIGATE_CALLS = [];
          const ON_NAVIGATE = (pageId) => {
            ON_NAVIGATE_CALLS.push(pageId);
          };
          handlers.navigate(ACTION, CURRENT_PAGE_ID, ON_NAVIGATE);
          expect(ON_NAVIGATE_CALLS.length).toEqual(1);
          expect(ON_NAVIGATE_CALLS[0]).toEqual(NEW_PAGE_ID);
        });

      });

      describe('submissionError', () => {

        it('should call the onError method with the same errors', () => {
          const ON_ERROR_CALLS = [];
          const ON_ERROR = (errors) => {
            ON_ERROR_CALLS.push(errors);
          };
          const ERRORS = ['alpha', 'bravo', 'charlie'];
          handlers.submissionError(ERRORS, ON_ERROR);
          expect(ON_ERROR_CALLS.length).toEqual(1);
          expect(ON_ERROR_CALLS[0]).toEqual(ERRORS);
        });

      });

    });

  });

});
