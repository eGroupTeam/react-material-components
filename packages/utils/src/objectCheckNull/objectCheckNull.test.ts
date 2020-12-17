import objectCheckNull from './objectCheckNull';

describe('objectCheckNull', () => {
  it('should check if object key with null or undefined value(Shallow).', () => {
    const obj = {
      zpp: 'zpp',
      bar: 'bar',
      zap: undefined,
    };
    expect(objectCheckNull(obj)).toBe(true);

    const obj2 = {
      foo: {},
      zoo: [],
      goo: ['goo', {}],
    };
    expect(objectCheckNull(obj2)).toBe(false);
  });
});
