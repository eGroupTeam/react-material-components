module.exports = {
  // TypeScript files will be handled by ts-jest, and JavaScript files will be handled by babel-jest.
  preset: 'ts-jest/presets/js-with-babel',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  // ignore these build, dist & library directories
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],
  modulePathIgnorePatterns: [
    '<rootDir>/packages/material/build',
    '<rootDir>/packages/material-form/build',
    '<rootDir>/packages/material-formik/build',
    '<rootDir>/packages/material-icons/build',
    '<rootDir>/packages/material-lab/build',
    '<rootDir>/packages/material-layout/build',
    '<rootDir>/packages/material-module/build'
  ]
};
