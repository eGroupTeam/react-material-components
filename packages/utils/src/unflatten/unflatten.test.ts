import unflatten from './unflatten';

describe('unflatten', () => {
  it('should unflatten object', () => {
    const test = {
      'three.levels.deep': 42,
      'three.levels': {
        nested: true,
      },
    };
    const result = {
      three: {
        levels: {
          deep: 42,
          nested: true,
        },
      },
    };
    expect(unflatten(test)).toEqual(result);
  });
});
