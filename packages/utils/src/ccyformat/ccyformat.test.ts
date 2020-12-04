import ccyformat from './ccyformat';

it('should format number to ccy', () => {
  expect(ccyformat(1000000)).toEqual('1,000,000');
  expect(ccyformat(10000000)).toEqual('10,000,000');
  expect(ccyformat(10)).toEqual('10');
  expect(ccyformat(100)).toEqual('100');
  expect(ccyformat(1000)).toEqual('1,000');
  expect(ccyformat(100000)).toEqual('100,000');
});
