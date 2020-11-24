import calcPaddingTop from './calcPaddingTop';

it('should calc padding top 1', () => {
  expect(calcPaddingTop('16:9')).toEqual('56.25%');
});

it('should calc padding top 2', () => {
  expect(calcPaddingTop('1:1')).toEqual('100%');
});
