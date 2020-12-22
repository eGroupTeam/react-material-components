import groupBy from './groupBy';

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
describe('groupBy', () => {
  it('should group array to object by key', () => {
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
    expect(groupBy(array2, (el) => el.orderId % 2)).toEqual({
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
  it('should test groups type without type error', () => {
    const groups = groupBy(array2, 'name');
    const groupOrderIds = Object.keys(groups).map((groupName) => {
      const group = groups[groupName];
      return {
        [groupName]: group.map((el) => el.orderId),
      };
    });
    expect(groupOrderIds).toEqual([
      {
        Jerry: [1, 2],
      },
      {
        Amy: [3],
      },
      {
        Dan: [4],
      },
    ]);
  });
});
