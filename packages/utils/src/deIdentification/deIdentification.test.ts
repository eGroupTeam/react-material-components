import deIdentification from './deIdentification';

describe('deIdentification', () => {
  it('should deIdentification value', () => {
    const nameEn = 'Jerry LI';
    const nameZh = '李彥欣';

    expect(deIdentification(nameEn)).toBe('J○○○○○○○');
    expect(deIdentification(nameZh)).toBe('李○○');

    expect(deIdentification(nameEn, true)).toBe('Je○○○○LI');
    expect(deIdentification(nameZh, true)).toBe('李○欣');
  });
});
