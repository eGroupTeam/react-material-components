import objectKeysFilter from './objectKeysFilter';

describe('objectKeysFilter', () => {
  it('should check if object key with null or undefined value(Shallow).', () => {
    const obj = {
      zpp: 'zpp',
      bar: 'bar',
      zap: undefined,
    };
    const allowed = ['zpp', 'zap'];
    expect(objectKeysFilter(obj, allowed)).toEqual({
      zpp: 'zpp',
      zap: undefined,
    });
  });
});
