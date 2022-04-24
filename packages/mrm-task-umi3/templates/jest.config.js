module.exports = {
  testPathIgnorePatterns: ['.umirc*'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
