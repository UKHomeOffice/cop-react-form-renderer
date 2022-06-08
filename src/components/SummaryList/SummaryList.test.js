// Global imports
import { fireEvent, getByTestId, render } from '@testing-library/react';
import React from 'react';

// Local imports
import SummaryList, { DEFAULT_CLASS } from './SummaryList';

describe('components', () => {
  describe('SummaryList', () => {
    const checkSummaryList = (container, id) => {
      const summaryList = getByTestId(container, id);
      expect(summaryList.tagName).toEqual('DL');
      expect(summaryList.classList).toContain(DEFAULT_CLASS);
      return summaryList;
    };

    const checkTitleRow = (summaryList, index) => {
      const row = summaryList.childNodes[index];
      expect(row.tagName).toEqual('DIV');
      expect(row.classList).toContain(`${DEFAULT_CLASS}__row`);
      expect(row.classList).toContain(`${DEFAULT_CLASS}__title`);
      const [heading] = row.childNodes;
      expect(heading.tagName).toEqual('H3');
      expect(heading.classList).toContain('govuk-heading-s');
      return heading;
    };

    const checkRow = (summaryList, index) => {
      const row = summaryList.childNodes[index];
      expect(row.tagName).toEqual('DIV');
      expect(row.classList).toContain(`${DEFAULT_CLASS}__row`);
      const [key, value, actions] = row.childNodes;
      expect(key.tagName).toEqual('DT');
      expect(key.classList).toContain(`${DEFAULT_CLASS}__key`);
      expect(value.tagName).toEqual('DD');
      expect(value.classList).toContain(`${DEFAULT_CLASS}__value`);
      expect(actions.tagName).toEqual('DD');
      expect(actions.classList).toContain(`${DEFAULT_CLASS}__actions`);
      return [key, value, actions];
    };

    const checkRowNoChangeActions = (summaryList, index) => {
      const row = summaryList.childNodes[index];
      expect(row.tagName).toEqual('DIV');
      expect(row.classList).toContain(`${DEFAULT_CLASS}__row`);
      const [key, value] = row.childNodes;
      expect(key.tagName).toEqual('DT');
      expect(key.classList).toContain(`${DEFAULT_CLASS}__key`);
      expect(value.tagName).toEqual('DD');
      expect(value.classList).toContain(`${DEFAULT_CLASS}__value`);
      expect(row.childNodes.length).toEqual(2);
      return [key, value];
    };

    it('should handle an empty rows array', () => {
      const ID = 'test-id';
      const ROWS = [];
      const { container } = render(
        <SummaryList data-testid={ID} rows={ROWS} />
      );
      const summaryList = checkSummaryList(container, ID);
      expect(summaryList.childNodes.length).toEqual(0);
    });

    it('should handle rows with no actions and string values', () => {
      const ID = 'test-id';
      const ROWS = [
        { pageId: 'p1', fieldId: 'a', key: 'Alpha', value: 'Alpha value' },
        { pageId: 'p2', fieldId: 'b', key: 'Bravo', value: 'Bravo value' }
      ];
      const { container } = render(
        <SummaryList data-testid={ID} rows={ROWS} />
      );
      const summaryList = checkSummaryList(container, ID);
      expect(summaryList.childNodes.length).toEqual(ROWS.length);
      ROWS.forEach((row, index) => {
        const [key, value, actions] = checkRow(summaryList, index);
        expect(key.textContent).toEqual(`${row.key} (optional)`);
        expect(value.textContent).toEqual(row.value);
        expect(actions.childNodes.length).toEqual(0);
      });
    });

    it('should handle title rows', () => {
      const ID = 'test-id';
      const ROWS = [
        { pageId: 'p1', fieldId: 'a', type: 'title', key: 'Title' },
        { pageId: 'p1', fieldId: 'a', key: 'Alpha', value: 'Alpha value' },
        { pageId: 'p2', fieldId: 'b', key: 'Bravo', value: 'Bravo value' }
      ];
      const { container } = render(
        <SummaryList data-testid={ID} rows={ROWS} />
      );
      const summaryList = checkSummaryList(container, ID);
      expect(summaryList.childNodes.length).toEqual(ROWS.length);
      const assessTitleRow = (row, index) => {
        const heading = checkTitleRow(summaryList, index);
        expect(heading.textContent).toEqual(row.key);
      };
      const assessRow = (row, index) => {
        const [key, value, actions] = checkRow(summaryList, index);
        expect(key.textContent).toEqual(`${row.key} (optional)`);
        expect(value.textContent).toEqual(row.value);
        expect(actions.childNodes.length).toEqual(0);
      };
      ROWS.forEach((row, index) => {
        if (row.type === 'title') {
          assessTitleRow(row, index);
        } else {
          assessRow(row, index);
        }
      });
    });

    it('should handle rows with no actions and component values', () => {
      const ID = 'test-id';
      const VALUES = ['Alpha component value', 'Bravo component value'];
      const ROWS = [
        {
          pageId: 'p1',
          fieldId: 'a',
          key: 'Alpha',
          value: <div>{VALUES[0]}</div>
        },
        {
          pageId: 'p2',
          fieldId: 'b',
          key: 'Bravo',
          value: <div>{VALUES[1]}</div>
        }
      ];
      const { container } = render(
        <SummaryList data-testid={ID} rows={ROWS} />
      );
      const summaryList = checkSummaryList(container, ID);
      expect(summaryList.childNodes.length).toEqual(ROWS.length);
      ROWS.forEach((row, index) => {
        const [key, value, actions] = checkRow(summaryList, index);
        expect(key.textContent).toEqual(`${row.key} (optional)`);
        expect(value.childNodes.length).toEqual(1);
        const valueDiv = value.childNodes[0];
        expect(valueDiv.tagName).toEqual('DIV');
        expect(valueDiv.textContent).toEqual(VALUES[index]);
        expect(actions.childNodes.length).toEqual(0);
      });
    });

    it('should handle rows with actions', () => {
      const ID = 'test-id';
      const ON_ACTION_CALLS = [];
      const ON_ACTION = (row) => {
        ON_ACTION_CALLS.push(row);
      };
      const ROWS = [
        {
          pageId: 'p1',
          fieldId: 'a',
          key: 'Alpha',
          value: 'Alpha value',
          action: { label: 'Change A', onAction: ON_ACTION }
        },
        {
          pageId: 'p2',
          fieldId: 'b',
          key: 'Bravo',
          value: 'Bravo value',
          action: { label: 'Change B', onAction: ON_ACTION }
        }
      ];
      const { container } = render(
        <SummaryList data-testid={ID} rows={ROWS} />
      );
      const summaryList = checkSummaryList(container, ID);
      expect(summaryList.childNodes.length).toEqual(ROWS.length);
      ROWS.forEach((row, index) => {
        const [key, value, actions] = checkRow(summaryList, index);
        expect(key.textContent).toEqual(`${row.key} (optional)`);
        expect(value.textContent).toEqual(row.value);
        const a = actions.childNodes[0];
        expect(a.textContent).toEqual(row.action.label);
        fireEvent.click(a, {});
        expect(ON_ACTION_CALLS.length).toEqual(index + 1);
        expect(ON_ACTION_CALLS[index]).toEqual(row);
      });
    });

    it('should handle rows with component values and actions set to hidden', () => {
      const ID = 'test-id';
      const VALUES = ['Alpha component value', 'Bravo component value'];
      const ROWS = [
        {
          pageId: 'p1',
          fieldId: 'a',
          key: 'Alpha',
          value: <div>{VALUES[0]}</div>
        },
        {
          pageId: 'p2',
          fieldId: 'b',
          key: 'Bravo',
          value: <div>{VALUES[1]}</div>
        }
      ];
      const { container } = render(
        <SummaryList data-testid={ID} rows={ROWS} noChangeAction={true} />
      );
      const summaryList = checkSummaryList(container, ID);
      expect(summaryList.childNodes.length).toEqual(ROWS.length);
      ROWS.forEach((row, index) => {
        const [key, value] = checkRowNoChangeActions(summaryList, index);
        expect(key.textContent).toEqual(`${row.key} (optional)`);
        expect(value.childNodes.length).toEqual(1);
        const valueDiv = value.childNodes[0];
        expect(valueDiv.tagName).toEqual('DIV');
        expect(valueDiv.textContent).toEqual(VALUES[index]);
      });
    });

    it('should render groups of rows corretly', () => {
      const ID = 'test-id';
      const VALUES = ['Alpha component value', 'Bravo component value', 'Charlie component value'];
      const ISGROUP = true;
      const ROWS = [
        {
          pageId: 'p1',
          fieldId: 'a',
          key: 'Alpha',
          value: <div>{VALUES[0]}</div>
        },
        {
          pageId: 'p1',
          fieldId: 'b',
          key: 'Bravo',
          value: <div>{VALUES[1]}</div>
        },
        {
          pageId: 'p1',
          fieldId: 'c',
          key: 'Charlie',
          value: <div>{VALUES[2]}</div>
        }
      ];
      const { container } = render(
        <SummaryList data-testid={ID} rows={ROWS} isGroup={ISGROUP} />
      );
      const summaryList = checkSummaryList(container, ID);
      expect(summaryList.childNodes.length).toEqual(ROWS.length + 1);
      ROWS.forEach((row, index) => {
        const [key, value] = checkRow(summaryList, index);
        expect(key.textContent).toEqual(`${row.key} (optional)`);
        expect(value.childNodes.length).toEqual(1);
        const valueDiv = value.childNodes[0];
        expect(valueDiv.tagName).toEqual('DIV');
        expect(valueDiv.textContent).toEqual(VALUES[index]);
      });
    });

  });
});
