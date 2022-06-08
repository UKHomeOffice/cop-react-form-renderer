import { render } from '@testing-library/react';
import { render as domRender } from 'react-dom';
import { ValidationContextProvider } from './context';

export const renderWithValidation = (ui, options) => render(
  <ValidationContextProvider>{ui}</ValidationContextProvider>
, options);

export const renderDomWithValidation = (ui, container, callback) => domRender(
  <ValidationContextProvider>{ui}</ValidationContextProvider>
, container, callback);

export const expectObjectLike = (received, expected) => {
  Object.keys(expected).forEach(key => {
    expect(received[key]).toEqual(expected[key]);
  });
};
