// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import fs from 'fs'

const dirname = 'test-images/processed'

if (!fs.existsSync(dirname)) {
  fs.mkdirSync(dirname);
}
