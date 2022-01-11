// Global imports
import { fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

// Local imports
import { PageAction } from '../../models';
import { DEFAULT_CLASS as CYA_DEFAULT_CLASS } from '../CheckYourAnswers/CheckYourAnswers';
import FormRenderer, { DEFAULT_CLASS } from './FormRenderer';

// JSON
import CIVIL_SERVANT from '../../json/areYouACivilServant.json';
import GRADE from '../../json/grade.json';
import TEAMS from '../../json/team.json';
import USER_PROFILE_DATA from '../../json/userProfile.data.json';
import USER_PROFILE from '../../json/userProfile.json';

describe('components', () => {

  describe('FormRenderer', () => {

    const mockAxios = new MockAdapter(axios);
    let container = null;

    const refDataUrl = (suffix) => {
      return `${USER_PROFILE_DATA.environmentContext.referenceDataUrl}/${suffix}`;
    }

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
      mockAxios.reset();

      mockAxios.onGet(refDataUrl('v2/entities/areYouACivilServant')).reply(200, CIVIL_SERVANT);
      mockAxios.onGet(refDataUrl('v2/entities/grade')).reply(200, GRADE);
      mockAxios.onGet(refDataUrl('v1/entities/team')).reply(200, TEAMS);
    });

    afterEach(() => {
      unmountComponentAtNode(container);
      container.remove();
      container = null;
    });

    const checkForm = (container) => {
      const form = container.childNodes[0];
      expect(form.tagName).toEqual('DIV');
      expect(form.classList).toContain(DEFAULT_CLASS);
      return form;
    };

    const getChangeLink = (summaryList) => {
      const [ , , actions ] = summaryList.childNodes[0].childNodes;
      return actions.childNodes[0];
    };

    const getContinueButton = (page) => {
      return page.childNodes[page.childNodes.length - 1].childNodes[0].childNodes[0];
    };

    it('should start on the hub page correctly and display the title', async () => {
      await act(async () => {
        render(<FormRenderer {...USER_PROFILE} data={USER_PROFILE_DATA} />, container);
      });
      const form = checkForm(container);
      expect(form.childNodes.length).toEqual(2); // Title + Hub page (= CYA)
      const title = form.childNodes[0];
      expect(title.tagName).toEqual('H1');
      expect(title.textContent).toEqual(USER_PROFILE.title);
      const hub = form.childNodes[1];
      expect(hub.tagName).toEqual('DIV');
      expect(hub.classList).toContain(CYA_DEFAULT_CLASS);
    });

    it('should fire the onFormLoad method passed in the hooks', async () => {
      let onFormLoadCalled = false;
      const ON_FORM_LOAD = () => {
        onFormLoadCalled = true;
      };
      const HOOKS = {
        onFormLoad: ON_FORM_LOAD
      };
      await act(async () => {
        render(<FormRenderer {...USER_PROFILE} data={USER_PROFILE_DATA} hooks={HOOKS} />, container);
      });
      expect(onFormLoadCalled).toBeTruthy();
    });

    it('should navigate to the first editable page', async () => {
      const ON_PAGE_CHANGE_CALLS = [];
      const ON_PAGE_CHANGE = (pageId) => {
        ON_PAGE_CHANGE_CALLS.push(pageId);
      };
      const HOOKS = {
        onPageChange: ON_PAGE_CHANGE
      };
      await act(async () => {
        render(<FormRenderer {...USER_PROFILE} data={USER_PROFILE_DATA} hooks={HOOKS} />, container);
      });
      const form = checkForm(container);
      const hub = form.childNodes[1]; // Hub = CYA
      const [ , , civilServantList ] = hub.childNodes;
      const link = getChangeLink(civilServantList);
      expect(ON_PAGE_CHANGE_CALLS.length).toEqual(0);
      fireEvent.click(link, {});
      expect(ON_PAGE_CHANGE_CALLS.length).toEqual(1);
      expect(ON_PAGE_CHANGE_CALLS[0]).toEqual(USER_PROFILE.pages[1].id);
      
      // The form layout should have changed to the current page.
      expect(form.childNodes.length).toEqual(1); // Just the page.
      const page = form.childNodes[0];
      const pageHeading = page.childNodes[0];
      expect(pageHeading.tagName).toEqual('H1');
      expect(pageHeading.textContent).toEqual(USER_PROFILE.pages[1].title);
    });

    it('should handle a page submission', async () => {
      const ON_SUBMIT_CALLS = [];
      const ON_SUBMIT = (type, payload, onSuccess, onError) => {
        ON_SUBMIT_CALLS.push({ type, payload, onSuccess, onError });
        onSuccess();
      };
      const HOOKS = {
        onSubmit: ON_SUBMIT
      };
      await act(async () => {
        render(<FormRenderer {...USER_PROFILE} data={USER_PROFILE_DATA} hooks={HOOKS} />, container);
      });
      const form = checkForm(container);

      // Navigate to the "Are you a civil servant?" page.
      const hub = form.childNodes[1]; // Hub = CYA
      const [ , , civilServantList ] = hub.childNodes;
      const link = getChangeLink(civilServantList);
      fireEvent.click(link, {});

      // Should already be answered "Yes", so simply click "Continue".
      const page = form.childNodes[0];
      const continueButton = getContinueButton(page);
      expect(ON_SUBMIT_CALLS.length).toEqual(0);
      fireEvent.click(continueButton, {});
      expect(ON_SUBMIT_CALLS.length).toEqual(1);
      expect(ON_SUBMIT_CALLS[0].type).toEqual(PageAction.TYPES.SUBMIT);
      expect(ON_SUBMIT_CALLS[0].payload.areYouACivilServant).toEqual('yes');

      // And we should be back on the hub.
      expect(form.childNodes.length).toEqual(2); // Title + Hub page (= CYA)
      const title = form.childNodes[0];
      expect(title.tagName).toEqual('H1');
      expect(title.textContent).toEqual(USER_PROFILE.title);
    });

    it('should handle a page submission error', async () => {
      const ON_SUBMIT_CALLS = [];
      const ON_SUBMIT = (type, payload, onSuccess, onError) => {
        ON_SUBMIT_CALLS.push({ type, payload, onSuccess, onError });
        onError([{ id: 'unknown', error: 'Something went wrong' }]);
      };
      const HOOKS = {
        onSubmit: ON_SUBMIT
      };
      await act(async () => {
        render(<FormRenderer {...USER_PROFILE} data={USER_PROFILE_DATA} hooks={HOOKS} />, container);
      });
      const form = checkForm(container);

      // Navigate to the "Are you a civil servant?" page.
      const hub = form.childNodes[1]; // Hub = CYA
      const [ , , civilServantList ] = hub.childNodes;
      const link = getChangeLink(civilServantList);
      fireEvent.click(link, {});

      // Should already be answered "Yes", so simply click "Continue".
      const page = form.childNodes[0];
      const continueButton = getContinueButton(page);
      expect(ON_SUBMIT_CALLS.length).toEqual(0);
      fireEvent.click(continueButton, {});
      expect(ON_SUBMIT_CALLS.length).toEqual(1);
      expect(ON_SUBMIT_CALLS[0].type).toEqual(PageAction.TYPES.SUBMIT);
      expect(ON_SUBMIT_CALLS[0].payload.areYouACivilServant).toEqual('yes');

      // And we should be kept on the same page.
      expect(form.childNodes.length).toEqual(1); // Just the page.
      const pageHeading = form.childNodes[0].childNodes[0];
      expect(pageHeading.tagName).toEqual('H1');
      expect(pageHeading.textContent).toEqual(USER_PROFILE.pages[1].title);
    });

    it('should handle page navigation', async () => {
      const ON_PAGE_CHANGE_CALLS = [];
      const ON_PAGE_CHANGE = (pageId) => {
        ON_PAGE_CHANGE_CALLS.push(pageId);
      };
      const HOOKS = {
        onPageChange: ON_PAGE_CHANGE
      };
      await act(async () => {
        render(<FormRenderer {...USER_PROFILE} data={USER_PROFILE_DATA} hooks={HOOKS} />, container);
      });
      const form = checkForm(container);

      // Navigate to the "Add or change a line manager" page.
      const hub = form.childNodes[1]; // Hub = CYA
      const [ , , , , , lineManagerList ] = hub.childNodes;
      const link = getChangeLink(lineManagerList);
      expect(ON_PAGE_CHANGE_CALLS.length).toEqual(0);
      fireEvent.click(link, {});
      expect(ON_PAGE_CHANGE_CALLS[0]).toEqual(USER_PROFILE.pages[4].id);

      // Should be on the page explaining what changing the line manager means.
      const page = form.childNodes[0];
      const pageHeading = page.childNodes[0];
      expect(pageHeading.tagName).toEqual('H1');
      expect(pageHeading.textContent).toEqual(USER_PROFILE.pages[4].title);

      // Now click on the "Continue" button on here.
      const continueButton = getContinueButton(page);
      expect(ON_PAGE_CHANGE_CALLS.length).toEqual(1);
      fireEvent.click(continueButton, {});
      expect(ON_PAGE_CHANGE_CALLS.length).toEqual(2);
      expect(ON_PAGE_CHANGE_CALLS[1]).toEqual(USER_PROFILE.pages[5].id);
      const newPageHeading = form.childNodes[0].childNodes[0];
      expect(newPageHeading.tagName).toEqual('H1');
      expect(newPageHeading.textContent).toEqual(USER_PROFILE.pages[5].title);
    });

  });

});
