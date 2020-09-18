import getIn from './getIn';

describe('getIn', () => {
  it('should get defaultValue', () => {
    const obj = {};
    const result = getIn(obj, ['foo', 'bar'], 'defaultValue');
    const result2 = getIn(obj, ['foo'], {});
    expect(result).toEqual('defaultValue');
    expect(result2).toEqual({});
  });

  it('should get value in obj', () => {
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
    const result = getIn(obj, ['foo', 'zpp']);
    const result2 = getIn(obj, ['foo', 'zoo', 0]);
    const result3 = getIn(obj, ['foo', 'goo', 1, 'gooO']);
    expect(result).toEqual('zpp');
    expect(result2).toEqual('zoo1');
    expect(result3).toEqual('gooWoW');
  });

  it('should get value in array', () => {
    const array = [
      {
        foo: 'foo',
      },
      0,
      '',
      false,
    ];
    const result = getIn(array, [0, 'foo']);
    const result2 = getIn(array, [1]);
    const result3 = getIn(array, [2]);
    const result4 = getIn(array, [3]);
    expect(result).toBe('foo');
    expect(result2).toBe(0);
    expect(result3).toBe('');
    expect(result4).toBe(false);
  });

  it('should not have side effect', () => {
    const obj = {
      foo: {
        bar: {
          zoo: 'zoo',
        },
      },
    };
    const result = getIn(obj, ['foo', 'bar']);
    result.zoo = 'foo';
    expect(obj).toEqual({
      foo: {
        bar: {
          zoo: 'zoo',
        },
      },
    });
    expect(result).toEqual({
      zoo: 'foo',
    });

    const obj2 = {
      foo: {
        bar: [
          {
            zoo: 'zoo',
          },
        ],
      },
    };
    const result2 = getIn(obj2, ['foo', 'bar']);
    result2[0].zoo = 'foo';
    expect(obj2).toEqual({
      foo: {
        bar: [
          {
            zoo: 'zoo',
          },
        ],
      },
    });
    expect(result2).toEqual([
      {
        zoo: 'foo',
      },
    ]);
  });
});
