import hasIn from './hasIn';

describe('hasIn', () => {
  it('should know does value has in object.', () => {
    const obj = {
      foo: {
        zpp: 'zpp',
        bar: 'bar',
        zoo: ['zoo1', 'zoo2'],
        goo: [
          'goo1',
          {
            gooO: 'gooWoW',
          },
        ],
      },
    };
    expect(hasIn(obj, ['foo', 'bar'])).toBe(true);
    expect(hasIn(obj, ['foo', 'zoo', 0])).toBe(true);
    expect(hasIn(obj, ['foo', 'goo', 1, 'gooO'])).toBe(true);

    const obj2 = {
      foo: {},
      zoo: [],
      goo: ['goo', {}],
    };
    expect(hasIn(obj2, ['foo', 'bar'])).toBe(false);
    expect(hasIn(obj2, ['zoo', 0])).toBe(false);
    expect(hasIn(obj2, ['goo', 1, 'bar'])).toBe(false);
  });

  it('should not have side effect', () => {
    const obj = {
      foo: {
        bar: {
          zoo: 'zoo',
        },
      },
    };
    const result = hasIn(obj, ['foo', 'bar']);
    expect(obj).toEqual({
      foo: {
        bar: {
          zoo: 'zoo',
        },
      },
    });
    expect(result).toBe(true);
  });
});
