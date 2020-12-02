import replacer from './replacer';

describe('replacer', () => {
  it('should replace text with variables.', () => {
    const variables = { name: 'Jerry', greeting: 'Hello' };
    const text = '{{greeting}}, {{name}}.';
    expect(replacer(text, variables)).toBe('Hello, Jerry.');
  });

  it('should not replace text when variables is empty.', () => {
    const variables = {};
    const text = '{{greeting}}, {{name}}.';
    expect(replacer(text, variables)).toBe(text);
  });
});
