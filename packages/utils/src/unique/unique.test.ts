import unique from './unique';

describe('unique', () => {
  it('should unique array', () => {
    expect(unique([1, 1, 1, 2, 3])).toEqual([1, 2, 3]);
  });
  it('should unique array 2', () => {
    expect(unique([1, '1', 1, 2, 3])).toEqual([1, '1', 2, 3]);
  });
  it('should unique array 3', () => {
    expect(unique([1, '1', '1', '2', 3])).toEqual([1, '1', '2', 3]);
  });
});
