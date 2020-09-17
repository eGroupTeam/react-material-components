import {
  isTwId,
  isResidentPermitId,
  isTwIdFormatValid,
  isResidentPermitIdFormatValid,
} from './twIdValidator';

describe('twIdValidator', () => {
  it('should pass with TW Id', () => {
    expect(isTwId('A123456789')).toBe(true);
    expect(isTwId('B134863148')).toBe(true);
    expect(isTwId('C193753053')).toBe(true);
    expect(isTwId('D172455240')).toBe(true);
    expect(isTwId('A800000014')).toBe(true);
    expect(isTwId('A900000016')).toBe(true);
    expect(isTwId('A870000015')).toBe(true);
    expect(isTwId('A970000017')).toBe(true);
    expect(isTwId('A880000018')).toBe(true);
    expect(isTwId('A980000010')).toBe(true);
    expect(isTwId('A890000011')).toBe(true);
    expect(isTwId('A990000013')).toBe(true);
  });

  it('should not pass with TW Id', () => {
    expect(isTwId('A123456788')).toBe(false);
    expect(isTwId('a123456789')).toBe(false);
    expect(isTwId('F131104091')).toBe(false);
    expect(isTwId('O158238842')).toBe(false);
  });

  it('should not pass with wrong TW Id format', () => {
    expect(isTwIdFormatValid(1234567890)).toBe(false);
    expect(isTwIdFormatValid('A1234567890')).toBe(false);
  });

  it('should pass with TW resident permit Id', () => {
    expect(isResidentPermitId('AC82420552')).toBe(true);
    expect(isResidentPermitId('AD34096702')).toBe(true);
    expect(isResidentPermitId('AA14250777')).toBe(true);
    expect(isResidentPermitId('AB64839220')).toBe(true);
  });

  it('should not pass with TW resident permit Id', () => {
    expect(isResidentPermitId('AE87654321')).toBe(false);
    expect(isResidentPermitId('AA12345678')).toBe(false);
  });

  it('should not pass with TW wrong resident permit Id format', () => {
    expect(isResidentPermitIdFormatValid('ZZ64839220')).toBe(false);
    expect(isResidentPermitIdFormatValid(12345678)).toBe(false);
  });
});
