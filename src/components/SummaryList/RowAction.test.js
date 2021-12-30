// Global imports
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

// Local imports
import RowAction from './RowAction';

describe('components', () => {

  describe('SummaryList.RowAction', () => {

    it('should handle a row without an action', () => {
      const ROW = {};
      const { container } = render(
        <RowAction row={ROW} />
      );
      expect(container.childNodes.length).toEqual(0);
    });

    it('should handle a row with an href in the action', () => {
      const HREF = 'http://alpha.homeoffice.gov.uk';
      const ROW = { action: { href: HREF, label: 'Change' } };
      const { container } = render(
        <RowAction row={ROW} />
      );
      const link = container.childNodes[0];
      expect(link.tagName).toEqual('A');
      expect(link.getAttribute('href')).toEqual(HREF);
      expect(link.textContent).toEqual(ROW.action.label);
    });

    it('should render an aria_suffix appropriately', () => {
      const HREF = 'http://alpha.homeoffice.gov.uk';
      const ROW = { action: { href: HREF, label: 'Change', aria_suffix: 'the thing' } };
      const { container } = render(
        <RowAction row={ROW} />
      );
      const link = container.childNodes[0];
      expect(link.tagName).toEqual('A');
      expect(link.getAttribute('href')).toEqual(HREF);
      expect(link.textContent).toEqual(`${ROW.action.label} ${ROW.action.aria_suffix}`);
    });

    it('should handle a row with an onAction in the action', () => {
      const ON_ACTION_CALLS = [];
      const ON_ACTION = (row) => {
        ON_ACTION_CALLS.push(row);
      };
      const ROW = { action: { onAction: ON_ACTION, label: 'Change' } };
      const { container } = render(
        <RowAction row={ROW} />
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