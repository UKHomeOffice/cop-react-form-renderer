// Global imports
import { render } from '@testing-library/react';
import React from 'react';

// Local imports
import { useHooks } from '../../hooks';
import HooksContextProvider, { ALLOWED_HOOKS } from './HooksContext';

const TestComponent = () => {
  const { hooks, addHook, removeHook } = useHooks();
  return (
    <>
      {typeof (addHook) === 'function' && <span>addHook is a function</span>}
      {typeof (removeHook) === 'function' && <span>removeHook is a function</span>}
      {
        Object.keys(hooks).map(key => {
          return typeof hooks[key] === 'function' && <span key={key}>{key} is a function</span>
        })
      }
    </>
  );
};

describe('context.ValidationContext', () => {

  it('should appropriately set up the context', async () => {
    const { container } = render(
      <HooksContextProvider>
        <TestComponent />
      </HooksContextProvider>
    );
    expect(container.childNodes.length).toEqual(2 + ALLOWED_HOOKS.length);
    expect(container.textContent).toContain('addHook is a function');
    expect(container.textContent).toContain('removeHook is a function');
    ALLOWED_HOOKS.forEach(hook => {
      expect(container.textContent).toContain(`${hook} is a function`);
    })
  });

});
