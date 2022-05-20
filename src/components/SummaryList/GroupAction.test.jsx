// Global imports
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

// Local imports
import GroupAction from './GroupAction';

describe('components', () => {

  describe('SummaryList.GroupAction', () => {

    it('should handle a group row without an action', () => {
      const ROW = {};
      const { container } = render(
          <GroupAction group={ROW} groupObj={{}} />
      );
      expect(container.childNodes.length).toEqual(0);
    });

    it('should handle a row with an href in the action', () => {
      const PAGE = 'alpha';
      const ROW = { action: { page: PAGE, label: 'Change' } };
      const { container } = render(
        <GroupAction group={ROW} />
      );
      const link = container.childNodes[0];
      expect(link.tagName).toEqual('A');
      expect(link.getAttribute('href')).toEqual(`/${PAGE}`);
      expect(link.textContent).toEqual(ROW.action.label);
    });

    it('should render an aria_suffix appropriately', () => {
      const PAGE = 'alpha';
      const ROW = { action: { page: PAGE, label: 'Change', aria_suffix: 'the thing' } };
      const { container } = render(
        <GroupAction group={ROW} />
      );
      const link = container.childNodes[0];
      expect(link.tagName).toEqual('A');
      expect(link.getAttribute('href')).toEqual(`/${PAGE}`);
      expect(link.textContent).toEqual(`${ROW.action.label} ${ROW.action.aria_suffix}`);
    });

    it('should handle a row with an onAction in the action', () => {
      const ON_ACTION_CALLS = [];
      const ON_ACTION = (row) => {
        ON_ACTION_CALLS.push(row);
      };
      const ROW = { action: { onAction: ON_ACTION, label: 'Change' } };
      const { container } = render(
        <GroupAction group={ROW} />
      );
      const link = container.childNodes[0];
      expect(link.tagName).toEqual('A');
      expect(link.getAttribute('onClick')).toBeDefined();
      expect(link.textContent).toEqual(ROW.action.label);
      fireEvent.click(link, {});
      expect(ON_ACTION_CALLS.length).toEqual(1);
      expect(ON_ACTION_CALLS[0]).toEqual(ROW);
    });

  });

});
