import calcPercent from './calcPercent';

it('should calc percent 1', () => {
  expect(calcPercent(20, 100)).toEqual('20%');
});

it('should calc percent 2', () => {
  expect(calcPercent(20, 0)).toEqual('0%');
});
