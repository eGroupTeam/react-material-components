import deleteIn from './deleteIn';

describe('deleteIn', () => {
  it('should delete value in obj', () => {
    const obj = {
      foo: {
        bar: 'bar',
      },
    };
    deleteIn(obj, ['foo', 'bar']);
    expect(obj).toEqual({
      foo: {},
    });

    const obj2 = {
      foo: {
        zoo: 'zoo',
        bar: 'bar',
      },
    };
    deleteIn(obj2, ['foo', 'bar']);
    expect(obj2).toEqual({
      foo: {
        zoo: 'zoo',
      },
    });
  });

  it('should not do anything', () => {
    const obj = {
      zoo: 'zoo',
    };
    deleteIn(obj, ['foo', 'bar']);
    expect(obj).toEqual(obj);
  });
});
