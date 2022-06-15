import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { render as domRender } from 'react-dom';
import { HooksContextProvider, ValidationContextProvider } from './context';

export const renderWithValidation = (ui, options) => render(
  <HooksContextProvider overrides={options?.hooks}>
    <ValidationContextProvider key="vcp">{ui}</ValidationContextProvider>
  </HooksContextProvider>
, options);

export const renderDomWithValidation = (ui, container, options) => domRender(
  <HooksContextProvider overrides={options?.hooks}>
    <ValidationContextProvider key="vcp">{ui}</ValidationContextProvider>
  </HooksContextProvider>
, container);

export const renderHookWithProvider = (hook, options) => {
  const wrapper = ({children}) => (
    <HooksContextProvider overrides={options?.hooks}>{children}</HooksContextProvider>
  )
  return renderHook(() => hook(), { wrapper } );
};

export const expectObjectLike = (received, expected) => {
  Object.keys(expected).forEach(key => {
    expect(received[key]).toEqual(expected[key]);
  });
};
