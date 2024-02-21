module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/test/**/*.test.ts'],
  transformIgnorePatterns: ['/node_modules/', '/dist/'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
