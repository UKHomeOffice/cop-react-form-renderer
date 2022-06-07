import { ValidationContextProvider } from './context';

export const expectObjectLike = (received, expected) => {
  Object.keys(expected).forEach(key => {
    expect(received[key]).toEqual(expected[key]);
  });
};
