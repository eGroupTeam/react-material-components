import setIn from './setIn';

describe('setIn', () => {
  it('should set value in obj', () => {
    const obj = {};
    setIn(obj, ['foo', 'bar'], 'value');
    expect(obj).toEqual({
      foo: {
        bar: 'value',
      },
    });
    const obj2 = {};
    setIn(obj2, ['foo', 'bar', 0], 'value');
    expect(obj2).toEqual({
      foo: {
        bar: {
          0: 'value',
        },
      },
    });
    const obj3 = { x: { y: [] } };
    setIn(obj3, ['x', 'y', 0], 'value');
    expect(obj3).toEqual({
      x: {
        y: ['value'],
      },
    });
    const obj4 = {};
    setIn(obj4, ['x', 0, 'y'], 'value');
    expect(obj4).toEqual({
      x: {
        0: {
          y: 'value',
        },
      },
    });

    const obj5 = {
      foo: {
        zoo: 'zoo',
      },
    };
    setIn(obj5, ['foo', 'bar'], 'value');
    expect(obj5).toEqual({
      foo: {
        zoo: 'zoo',
        bar: 'value',
      },
    });
  });
});
