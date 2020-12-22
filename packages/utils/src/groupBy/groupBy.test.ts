import groupBy from './groupBy';

describe('groupBy', () => {
  it('should group array to object by key', () => {
    const array = ['abc', 'bca', 'zxc', 'zxcvb'];
    const array2 = [
      {
        name: 'Jerry',
        orderId: 1,
      },
      {
        name: 'Jerry',
        orderId: 2,
      },
      {
        name: 'Amy',
        orderId: 3,
      },
      {
        name: 'Dan',
        orderId: 4,
      },
    ];
    expect(groupBy(array, 'length')).toEqual({
      3: ['abc', 'bca', 'zxc'],
      5: ['zxcvb'],
    });
    expect(groupBy(array2, 'name')).toEqual({
      Jerry: [
        {
          name: 'Jerry',
          orderId: 1,
        },
        {
          name: 'Jerry',
          orderId: 2,
        },
      ],
      Amy: [
        {
          name: 'Amy',
          orderId: 3,
        },
      ],
      Dan: [
        {
          name: 'Dan',
          orderId: 4,
        },
      ],
    });
  });
  it('should group array to object by callback func', () => {
    const array = [
      {
        name: 'Jerry',
        orderId: 1,
      },
      {
        name: 'Jerry',
        orderId: 2,
      },
      {
        name: 'Amy',
        orderId: 3,
      },
      {
        name: 'Dan',
        orderId: 4,
      },
    ];
    expect(groupBy(array, (el) => el.orderId % 2)).toEqual({
      0: [
        {
          name: 'Jerry',
          orderId: 2,
        },
        {
          name: 'Dan',
          orderId: 4,
        },
      ],
      1: [
        {
          name: 'Jerry',
          orderId: 1,
        },
        {
          name: 'Amy',
          orderId: 3,
        },
      ],
    });
  });
});
