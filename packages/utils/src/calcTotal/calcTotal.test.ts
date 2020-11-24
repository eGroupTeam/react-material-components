import calcTotal from './calcTotal';

it('should calc total 1', () => {
  const amounts = [10, 20, 30, 40, 50, 60];
  expect(calcTotal(amounts)).toEqual(210);
});

it('should calc total 2', () => {
  const amounts = [0, 0, 10, 20, 30, 40, 50, 60];
  expect(calcTotal(amounts)).toEqual(210);
});
