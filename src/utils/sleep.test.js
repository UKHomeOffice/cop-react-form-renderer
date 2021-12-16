const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

describe('sleep', () => {
  it('should exist as a function', () => {
    expect(typeof sleep).toEqual('function');
  });
});

export default sleep;
