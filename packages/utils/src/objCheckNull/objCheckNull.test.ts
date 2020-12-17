import objCheckNull from './objCheckNull';

describe('objCheckNull', () => {
  it('should check if object key with null or undefined value(Shallow).', () => {
    const obj = {
      zpp: 'zpp',
      bar: 'bar',
      zap: undefined,
    };
    expect(objCheckNull(obj)).toBe(true);

    const obj2 = {
      foo: {},
      zoo: [],
      goo: ['goo', {}],
    };
    expect(objCheckNull(obj2)).toBe(false);
  });
});
