import roundToTwoDecimal from './roundToTwoDecimal';

describe('roundToTwoDecimal', () => {
  it('should round number to two decimal.', () => {
    expect(roundToTwoDecimal(10)).toBe(10);
    expect(roundToTwoDecimal(1.7777777)).toBe(1.78);
    expect(roundToTwoDecimal(9.1)).toBe(9.1);
    expect(roundToTwoDecimal(1.005)).toBe(1.01);
    expect(roundToTwoDecimal(0.2833333333333333)).toBe(0.28);
  });
});
