import { render } from '@testing-library/react';
import { ValidationContextProvider } from './context';

export const renderWithValidation = (ui, options) => render(
  <ValidationContextProvider>{ui}</ValidationContextProvider>
, options);

export const expectObjectLike = (received, expected) => {
  Object.keys(expected).forEach(key => {
    expect(received[key]).toEqual(expected[key]);
  });
};
