import { isValid, toDate, format, isBefore } from './dateUtils';

describe('dateUtils', () => {
  it('should valid date', () => {
    const dateObj = new Date();
    const dateStr = '1994-01-20';
    const dateNum = new Date().getTime();
    expect(isValid(dateObj)).toBe(true);
    expect(isValid(dateStr)).toBe(true);
    expect(isValid(dateNum)).toBe(true);
  });

  it('should parse to date', () => {
    const dateObj = new Date();
    const dateStr = '1994-01-20T00:00:00.000Z';
    const dateNum = new Date().getTime();
    expect(toDate(dateObj)).toStrictEqual(dateObj);
    expect(toDate(dateStr)).toStrictEqual(new Date(dateStr));
    expect(toDate(dateNum)).toStrictEqual(new Date(dateNum));
  });

  it('should format the date', () => {
    const dateObj = new Date('1994-01-20');
    const dateStr = '1994-01-20T00:00:00.000Z';
    const dateNum = new Date('1994-01-20').getTime();
    expect(format(dateObj, 'yyyy-MM-dd')).toBe('1994-01-20');
    expect(format(dateStr, 'yyyy-MM-dd')).toBe('1994-01-20');
    expect(format(dateNum, 'yyyy-MM-dd')).toBe('1994-01-20');
  });

  it('should know if the date isBefore another.', () => {
    const dateObj = new Date('1994-01-20');
    const dateStr = '1994-01-20T00:00:00.000Z';
    const dateNum = new Date('1994-01-20').getTime();
    const dateCompareObj = new Date('2020-01-20');
    const dateCompareStr = '2020-01-20T00:00:00.000Z';
    const dateCompareNum = new Date('2020-01-20').getTime();
    expect(isBefore(dateObj, dateCompareObj)).toBe(true);
    expect(isBefore(dateObj, dateCompareStr)).toBe(true);
    expect(isBefore(dateObj, dateCompareNum)).toBe(true);
    expect(isBefore(dateCompareObj, dateObj)).toBe(false);
    expect(isBefore(dateCompareStr, dateObj)).toBe(false);
    expect(isBefore(dateCompareNum, dateObj)).toBe(false);

    expect(isBefore(dateStr, dateCompareObj)).toBe(true);
    expect(isBefore(dateStr, dateCompareStr)).toBe(true);
    expect(isBefore(dateStr, dateCompareNum)).toBe(true);
    expect(isBefore(dateCompareObj, dateStr)).toBe(false);
    expect(isBefore(dateCompareStr, dateStr)).toBe(false);
    expect(isBefore(dateCompareNum, dateStr)).toBe(false);

    expect(isBefore(dateNum, dateCompareObj)).toBe(true);
    expect(isBefore(dateNum, dateCompareStr)).toBe(true);
    expect(isBefore(dateNum, dateCompareNum)).toBe(true);
    expect(isBefore(dateCompareObj, dateNum)).toBe(false);
    expect(isBefore(dateCompareStr, dateNum)).toBe(false);
    expect(isBefore(dateCompareNum, dateNum)).toBe(false);
  });

  it('should get valid error', () => {
    expect(isValid('TEST')).toBe(false);
    expect(isValid(new Date('TEST'))).toBe(false);
    expect(toDate('TEST')).toBe('Invalid time value');
    expect(toDate(new Date('TEST'))).toBe('Invalid time value');
    expect(format('TEST', 'yyyy-MM-dd')).toBe('Invalid time value');
    expect(format(new Date('TEST'), 'yyyy-MM-dd')).toBe('Invalid time value');
  });
});
