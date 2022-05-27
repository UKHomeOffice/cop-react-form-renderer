// Global imports
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

// Local imports
import CIVIL_SERVANT from '../../json/areYouACivilServant.json';
import GRADE from '../../json/grade.json';
import TEAMS from '../../json/team.json';
import USER_PROFILE_DATA from '../../json/userProfile.data.json';
import USER_PROFILE from '../../json/userProfile.json';
import GROUPED_ADDRESS_DATA_JSON from '../../json/group.data.json';
import GROUPED_ADDRESS  from '../../json/group.json';
import GROUP_ROWS from '../../json/groupOfRow.json';
import Utils from '../../utils';
import CheckYourAnswers, { DEFAULT_CLASS, DEFAULT_MARGIN_BOTTOM, DEFAULT_TITLE } from './CheckYourAnswers';

describe('components', () => {

  describe('CheckYourAnswers', () => {

    const mockAxios = new MockAdapter(axios);
    const DATA = Utils.Data.setupForm(USER_PROFILE.pages, USER_PROFILE.components, USER_PROFILE_DATA)
    const PAGES = Utils.FormPage.getAll(USER_PROFILE.pages, USER_PROFILE.components, { ...DATA });
    const ON_ROW_ACTION_CALLS = [];
    const ON_ROW_ACTION = (row) => {
      ON_ROW_ACTION_CALLS.push(row);
    };
    const ON_ACTION_CALLS = [];
    const ON_ACTION = (action, onError) => {
      ON_ACTION_CALLS.push({ action, onError });
    };
    let container = null;

    const refDataUrl = (suffix) => {
      return `${USER_PROFILE_DATA.urls.refData}/${suffix}`;
    }

    beforeEach(() => {
      ON_ROW_ACTION_CALLS.length = 0;
      ON_ACTION_CALLS.length = 0;
      container = document.createElement('div');
      document.body.appendChild(container);
      mockAxios.reset();

      mockAxios.onGet(refDataUrl('areYouACivilServant')).reply(200, CIVIL_SERVANT);
      mockAxios.onGet(refDataUrl('grade')).reply(200, GRADE);
      mockAxios.onGet(refDataUrl('team')).reply(200, TEAMS);
    });

    afterEach(() => {
      unmountComponentAtNode(container);
      container.remove();
      container = null;
    });

    const checkCYA = (container) => {
      const cya = container.childNodes[0];
      expect(cya.tagName).toEqual('DIV');
      expect(cya.classList).toContain(DEFAULT_CLASS);
      return cya;
    };

    const checkRow = (row, key, value, action) => {
      expect(row.textContent).toContain(key);
      expect(row.textContent).toContain(value);
      if (action) {
        expect(row.textContent).toContain('Change');
      } else {
        expect(row.textContent).not.toContain('Change');
      }
    };

    it('should show default title if none is provided', async () => {
      await act(async () => {
        render(<CheckYourAnswers pages={PAGES} onRowAction={ON_ROW_ACTION} onAction={ON_ACTION} />, container);
      });
      const cya = checkCYA(container);
      const title = cya.childNodes[0];
      expect(title.classList).toContain('govuk-heading-l');
      expect(title.textContent).toEqual(DEFAULT_TITLE);
    });

    it('should allow title to be overridden', async () => {
      const TITLE = 'Alpha Bravo Charlie';
      await act(async () => {
        render(<CheckYourAnswers title={TITLE} pages={PAGES} onRowAction={ON_ROW_ACTION} onAction={ON_ACTION} />, container);
      });
      const cya = checkCYA(container);
      const title = cya.childNodes[0];
      expect(title.classList).toContain('govuk-heading-l');
      expect(title.textContent).toEqual(TITLE);
    });

    it('should show readonly page components correctly', async () => {
      await act(async () => {
        render(<CheckYourAnswers pages={PAGES} onRowAction={ON_ROW_ACTION} onAction={ON_ACTION} />, container);
      });
      const cya = checkCYA(container);
      const [, cyaChildNode] = cya.childNodes;
      const names = cyaChildNode.childNodes[0];
      expect(names.tagName).toEqual('DL');
      expect(names.classList).toContain(`govuk-!-margin-bottom-${DEFAULT_MARGIN_BOTTOM}`);
      const [ firstName, surname ] = names.childNodes;
      checkRow(firstName, 'First name', 'John', false);
      checkRow(surname, 'Last name', 'Smith', false);
    });

    it('should show editable page components correctly', async () => {
      await act(async () => {
        render(<CheckYourAnswers pages={PAGES} onRowAction={ON_ROW_ACTION} onAction={ON_ACTION} />, container);
      });
      const cya = checkCYA(container);
      const [, , title, cyaChildNode] = cya.childNodes;
      const civilServant = cyaChildNode.childNodes[0];
      expect(title.textContent).toEqual('Are you a civil servant?');
      expect(civilServant.tagName).toEqual('DL');
      expect(civilServant.classList).toContain(`govuk-!-margin-bottom-${DEFAULT_MARGIN_BOTTOM}`);
      const [ status ] = civilServant.childNodes;
      checkRow(status, 'Are you a civil servant?', 'Yes', true);
    });

    it('should show editable page components correctly with page titles hidden', async () => {
      await act(async () => {
        render(<CheckYourAnswers pages={PAGES} onRowAction={ON_ROW_ACTION} onAction={ON_ACTION} hide_page_titles={true} />, container);
      });
      const cya = checkCYA(container);
      const [, , cyaChildNode] = cya.childNodes; // The title simply isn't returned
      const civilServant = cyaChildNode.childNodes[0];
      expect(civilServant.tagName).toEqual('DL');
      expect(civilServant.classList).toContain(`govuk-!-margin-bottom-0`); // Changed margin if no titles
      const [ status ] = civilServant.childNodes;
      checkRow(status, 'Are you a civil servant?', 'Yes', true);
    });

    it('should show no title if is set to hidden', async () => {
      await act(async () => {
        render(<CheckYourAnswers pages={PAGES} onRowAction={ON_ROW_ACTION} onAction={ON_ACTION} hide_title={true}/>, container);
      });
      const cya = checkCYA(container);
      const [cyaChildNode] = cya.childNodes;
      const names = cyaChildNode.childNodes[0];
      expect(names.tagName).toEqual('DL');
      expect(names.classList).toContain(`govuk-!-margin-bottom-${DEFAULT_MARGIN_BOTTOM}`);
      const [ firstName, surname ] = names.childNodes;
      checkRow(firstName, 'First name', 'John', false);
      checkRow(surname, 'Last name', 'Smith', false);
    });

    it('Show answers from multiple address fields into in one DL', async () => {
      const DATA = Utils.Data.setupForm(GROUPED_ADDRESS.pages, GROUPED_ADDRESS.components, GROUPED_ADDRESS_DATA_JSON)
      const GROUP_PAGES = Utils.FormPage.getAll(GROUPED_ADDRESS.pages, GROUPED_ADDRESS.components, { ...DATA });

      await act(async () => {
        render(<CheckYourAnswers pages={GROUP_PAGES} onRowAction={ON_ROW_ACTION} onAction={ON_ACTION} hide_title={true}/>, container);
      });

      const cya = checkCYA(container);
      const groupedComponent = cya.childNodes[10];
      const keyGroup = groupedComponent.childNodes[0].childNodes[0].childNodes[0];
      expect(keyGroup.tagName).toEqual('DT');
      expect(keyGroup.textContent).toEqual('Address details (optional)');

      const valueGroup = groupedComponent.childNodes[0].childNodes[0].childNodes[1];
      expect(valueGroup.childNodes.length).toEqual(4);
      expect(valueGroup.tagName).toEqual('DD');
      expect(valueGroup.childNodes[0].textContent).toContain('10 Downing Street');
      expect(valueGroup.childNodes[1].textContent).toContain('City of Westminster');
      expect(valueGroup.childNodes[2].textContent).toContain('London');
      expect(valueGroup.childNodes[3].textContent).toContain('SW1A 2AA');

      const changeButtonDiv = groupedComponent.childNodes[0].childNodes[0].childNodes[2];
      expect(changeButtonDiv.classList).toContain('govuk-summary-list__actions');
      const changeButton = changeButtonDiv.childNodes[0];
      expect(changeButton.tagName).toEqual('A');
      expect(changeButton.textContent).toEqual('Change address details');
    });

    it('should render a group with one action button', async () => {
      const GROUP_PAGES = Utils.FormPage.getAll(GROUP_ROWS.pages, GROUP_ROWS.components, { ...DATA });

      await act(async () => {
        render(<CheckYourAnswers pages={GROUP_PAGES} onRowAction={ON_ROW_ACTION} onAction={ON_ACTION} groups={GROUP_ROWS.cya.groups} />, container);
      });
      const cya = checkCYA(container);
      const namesGroup = cya.childNodes[2];

      const firstNameRow = namesGroup.childNodes[0].childNodes[0];
      expect(firstNameRow.childNodes.length).toEqual(2);
      expect(firstNameRow.childNodes[0].textContent).toEqual('First name (optional)');
      expect(firstNameRow.childNodes[0].tagName).toEqual('DT');
      expect(firstNameRow.childNodes[1].textContent).toEqual('John');
      expect(firstNameRow.childNodes[1].tagName).toEqual('DD');

      const surname = namesGroup.childNodes[0].childNodes[1];
      expect(surname.childNodes.length).toEqual(2);
      expect(surname.childNodes[0].textContent).toEqual('Last name (optional)');
      expect(surname.childNodes[0].tagName).toEqual('DT');
      expect(surname.childNodes[1].textContent).toEqual('Smith');
      expect(surname.childNodes[1].tagName).toEqual('DD');

      const changeButtonDiv = namesGroup.childNodes[0].childNodes[2];
      expect(changeButtonDiv.classList).toContain('change-group-button');
      const changeButton = changeButtonDiv.childNodes[0];
      expect(changeButton.tagName).toEqual('A');
      expect(changeButton.textContent).toEqual('Change names');
    });

  });

});
