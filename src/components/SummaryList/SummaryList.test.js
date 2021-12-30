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

    const checkRow = (summaryList, index) => {
      const row = summaryList.childNodes[index];
      expect(row.tagName).toEqual('DIV');
      expect(row.classList).toContain(`${DEFAULT_CLASS}__row`);
      const [ key, value, actions ] = row.childNodes;
      expect(key.tagName).toEqual('DT');
      expect(key.classList).toContain(`${DEFAULT_CLASS}__key`);
      expect(value.tagName).toEqual('DD');
      expect(value.classList).toContain(`${DEFAULT_CLASS}__value`);
      expect(actions.tagName).toEqual('DD');
      expect(actions.classList).toContain(`${DEFAULT_CLASS}__actions`);
      return [ key, value, actions ];
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
        const [ key, value, actions ] = checkRow(summaryList, index);
        expect(key.textContent).toEqual(row.key);
        expect(value.textContent).toEqual(row.value);
        expect(actions.childNodes.length).toEqual(0);
      });
    });

    it('should handle rows with no actions and component values', () => {
      const ID = 'test-id';
      const VALUES = ['Alpha component value', 'Bravo component value'];
      const ROWS = [
        { pageId: 'p1', fieldId: 'a', key: 'Alpha', value: <div>{VALUES[0]}</div> },
        { pageId: 'p2', fieldId: 'b', key: 'Bravo', value: <div>{VALUES[1]}</div> }
      ];
      const { container } = render(
        <SummaryList data-testid={ID} rows={ROWS} />
      );
      const summaryList = checkSummaryList(container, ID);
      expect(summaryList.childNodes.length).toEqual(ROWS.length);
      ROWS.forEach((row, index) => {
        const [ key, value, actions ] = checkRow(summaryList, index);
        expect(key.textContent).toEqual(row.key);
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
        { pageId: 'p1', fieldId: 'a', key: 'Alpha', value: 'Alpha value', action: { label: 'Change A', onAction: ON_ACTION } },
        { pageId: 'p2', fieldId: 'b', key: 'Bravo', value: 'Bravo value', action: { label: 'Change B', onAction: ON_ACTION } }
      ];
      const { container } = render(
        <SummaryList data-testid={ID} rows={ROWS} />
      );
      const summaryList = checkSummaryList(container, ID);
      expect(summaryList.childNodes.length).toEqual(ROWS.length);
      ROWS.forEach((row, index) => {
        const [ key, value, actions ] = checkRow(summaryList, index);
        expect(key.textContent).toEqual(row.key);
        expect(value.textContent).toEqual(row.value);
        const a = actions.childNodes[0];
        expect(a.textContent).toEqual(row.action.label);
        fireEvent.click(a, {});
        expect(ON_ACTION_CALLS.length).toEqual(index + 1);
        expect(ON_ACTION_CALLS[index]).toEqual(row);
      });
    });

  });

});