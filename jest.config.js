module.exports = {
  // TypeScript files will be handled by ts-jest, and JavaScript files will be handled by babel-jest.
  preset: 'ts-jest/presets/js-with-babel',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  testPathIgnorePatterns: ["/build/"]
};
