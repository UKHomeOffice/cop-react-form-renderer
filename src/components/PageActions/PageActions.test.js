// Global imports
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

// Local imports
import { PageAction } from '../../models';
import { DEFAULT_LABEL } from './ActionButton';
import PageActions from './PageActions';

describe('components', () => {

  describe('PageActions', () => {
    const ON_ACTION_CALLS = [];
    const ON_ACTION = (action) => {
      ON_ACTION_CALLS.push(action);
    };
    
    beforeEach(() => {
      ON_ACTION_CALLS.length = 0;
    });

    it('should handle an empty array of actions', async () => {
      const ACTIONS = [];
      const { container } = render(
        <PageActions actions={ACTIONS} onAction={ON_ACTION} />
      );
      expect(container.childNodes.length).toEqual(0);
    });

    it('should appropriately display a single submit action', async () => {
      const ACTIONS = [PageAction.TYPES.SUBMIT];
      const { container } = render(
        <PageActions actions={ACTIONS} onAction={ON_ACTION} />
      );
      const buttonGroup = container.childNodes[0];
      expect(buttonGroup.childNodes.length).toEqual(ACTIONS.length);

      const submit = buttonGroup.childNodes[0];
      expect(submit.tagName).toEqual('BUTTON');
      expect(submit.textContent).toEqual(DEFAULT_LABEL);

      // Click the button and make sure it fires the onAction handler.
      fireEvent.click(submit, {});
      expect(ON_ACTION_CALLS.length).toEqual(1);
      expect(ON_ACTION_CALLS[0]).toEqual(PageAction.DEFAULTS.submit);
    });

    it('should appropriately display a custom action', async () => {
      const ACTIONS = [{ type: 'navigate', url: '/alpha', label: 'Alpha' }];
      const { container } = render(
        <PageActions actions={ACTIONS} onAction={ON_ACTION} />
      );
      const buttonGroup = container.childNodes[0];
      expect(buttonGroup.childNodes.length).toEqual(1);

      const navigate = buttonGroup.childNodes[0];
      expect(navigate.tagName).toEqual('BUTTON');
      expect(buttonGroup.childNodes.length).toEqual(ACTIONS.length);

      // Click the button and make sure it fires the onAction handler.
      fireEvent.click(navigate, {});
      expect(ON_ACTION_CALLS.length).toEqual(1);
      expect(ON_ACTION_CALLS[0]).toEqual(ACTIONS[0]);
    });

    it('should appropriately display multiple actions', async () => {
      const NAVIGATE = { type: PageAction.TYPES.NAVIGATE, url: '/alpha', label: 'Alpha' };
      const ACTIONS = [ NAVIGATE, PageAction.TYPES.SUBMIT ];
      const { container } = render(
        <PageActions actions={ACTIONS} onAction={ON_ACTION} />
      );
      const buttonGroup = container.childNodes[0];
      expect(buttonGroup.childNodes.length).toEqual(ACTIONS.length);

      const navigate = buttonGroup.childNodes[0];
      expect(navigate.tagName).toEqual('BUTTON');
      expect(navigate.textContent).toEqual(NAVIGATE.label);

      const submit = buttonGroup.childNodes[1];
      expect(submit.tagName).toEqual('BUTTON');
      expect(submit.textContent).toEqual(DEFAULT_LABEL);

      // Click each button in turn button and make sure it fires the onAction handler.
      fireEvent.click(navigate, {});
      fireEvent.click(submit, {});
      expect(ON_ACTION_CALLS.length).toEqual(2);
      expect(ON_ACTION_CALLS[0]).toEqual(NAVIGATE);
      expect(ON_ACTION_CALLS[1]).toEqual(PageAction.DEFAULTS.submit);
    });

  });

});
