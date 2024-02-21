module.exports = jest.fn().mockImplementation(() => {
  return {
    play: jest.fn(),
    pause: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };
});
