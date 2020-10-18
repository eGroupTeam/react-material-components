import flatten from './flatten';

describe('flatten', () => {
  it('should flatten object', () => {
    const test = {
      a: 'jack',
      b: {
        c: 'sparrow',
        d: {
          e: 'hahaha',
        },
      },
    };
    const result = {
      a: 'jack',
      'b.c': 'sparrow',
      'b.d.e': 'hahaha',
    };
    expect(flatten(test)).toEqual(result);
  });
});
