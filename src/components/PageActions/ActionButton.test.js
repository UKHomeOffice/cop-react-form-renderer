// Global imports
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

// Local imports
import { PageAction } from '../../models';
import ActionButton, { DEFAULT_LABEL } from './ActionButton';

describe('components', () => {

  describe('PageActions.ActionButton', () => {
    const ON_ACTION_CALLS = [];
    const ON_ACTION = (action) => {
      ON_ACTION_CALLS.push(action);
    };
    
    beforeEach(() => {
      ON_ACTION_CALLS.length = 0;
    });

    it('should handle an unknown action identifier', async () => {
      const ACTION = 'unknown';
      const { container } = render(
        <ActionButton action={ACTION} onAction={ON_ACTION} />
      );
      expect(container.childNodes.length).toEqual(0);
    });

    it('should appropriately display a submit action', async () => {
      const ACTION = PageAction.TYPES.SUBMIT;
      const { container } = render(
        <ActionButton action={ACTION} onAction={ON_ACTION} />
      );
      const button = container.childNodes[0];
      expect(button.tagName).toEqual('BUTTON');
      expect(button.textContent).toEqual(DEFAULT_LABEL);

      // Click the button and make sure it fires the onAction handler.
      fireEvent.click(button, {});
      expect(ON_ACTION_CALLS.length).toEqual(1);
      expect(ON_ACTION_CALLS[0]).toEqual(PageAction.DEFAULTS.submit);
    });

    it('should appropriately display a custom action', async () => {
      const ACTION = { type: 'navigate', url: '/alpha', label: 'Alpha' };
      const { container } = render(
        <ActionButton action={ACTION} onAction={ON_ACTION} />
      );
      const button = container.childNodes[0];
      expect(button.tagName).toEqual('BUTTON');
      expect(button.textContent).toEqual(ACTION.label);

      // Click the button and make sure it fires the onAction handler.
      fireEvent.click(button, {});
      expect(ON_ACTION_CALLS.length).toEqual(1);
      expect(ON_ACTION_CALLS[0]).toEqual(ACTION);
    });

  });

});
