import {
  isValid,
  toDate,
  format,
  isAfter,
  isBefore,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInYears,
} from './dateUtils';

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

  it('should know if the date isAfter another.', () => {
    const dateObj = new Date('2020-01-20');
    const dateStr = '2020-01-20T00:00:00.000Z';
    const dateNum = new Date('2020-01-20').getTime();
    const dateCompareObj = new Date('1994-01-20');
    const dateCompareStr = '1994-01-20T00:00:00.000Z';
    const dateCompareNum = new Date('1994-01-20').getTime();
    expect(isAfter(dateObj, dateCompareObj)).toBe(true);
    expect(isAfter(dateObj, dateCompareStr)).toBe(true);
    expect(isAfter(dateObj, dateCompareNum)).toBe(true);
    expect(isAfter(dateCompareObj, dateObj)).toBe(false);
    expect(isAfter(dateCompareStr, dateObj)).toBe(false);
    expect(isAfter(dateCompareNum, dateObj)).toBe(false);

    expect(isAfter(dateStr, dateCompareObj)).toBe(true);
    expect(isAfter(dateStr, dateCompareStr)).toBe(true);
    expect(isAfter(dateStr, dateCompareNum)).toBe(true);
    expect(isAfter(dateCompareObj, dateStr)).toBe(false);
    expect(isAfter(dateCompareStr, dateStr)).toBe(false);
    expect(isAfter(dateCompareNum, dateStr)).toBe(false);

    expect(isAfter(dateNum, dateCompareObj)).toBe(true);
    expect(isAfter(dateNum, dateCompareStr)).toBe(true);
    expect(isAfter(dateNum, dateCompareNum)).toBe(true);
    expect(isAfter(dateCompareObj, dateNum)).toBe(false);
    expect(isAfter(dateCompareStr, dateNum)).toBe(false);
    expect(isAfter(dateCompareNum, dateNum)).toBe(false);
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

  it('should get difference in hours', () => {
    const dateLeftObj = new Date('1994-01-20T00:00:00Z');
    const dateLeftStr = '1994-01-20T00:00:00.000Z';
    const dateLeftNum = new Date('1994-01-20').getTime();
    const dateRightObj = new Date('1994-01-20T12:00:00Z');
    const dateRightStr = '1994-01-20T12:00:00Z';
    const dateRightNum = new Date('1994-01-20T12:00:00Z').getTime();

    expect(differenceInHours(dateLeftObj, dateRightObj)).toBe(-12);
    expect(differenceInHours(dateLeftObj, dateRightStr)).toBe(-12);
    expect(differenceInHours(dateLeftObj, dateRightNum)).toBe(-12);
    expect(differenceInHours(dateRightObj, dateLeftObj)).toBe(12);
    expect(differenceInHours(dateRightStr, dateLeftObj)).toBe(12);
    expect(differenceInHours(dateRightNum, dateLeftObj)).toBe(12);

    expect(differenceInHours(dateLeftStr, dateRightObj)).toBe(-12);
    expect(differenceInHours(dateLeftStr, dateRightStr)).toBe(-12);
    expect(differenceInHours(dateLeftStr, dateRightNum)).toBe(-12);
    expect(differenceInHours(dateRightObj, dateLeftStr)).toBe(12);
    expect(differenceInHours(dateRightStr, dateLeftStr)).toBe(12);
    expect(differenceInHours(dateRightNum, dateLeftStr)).toBe(12);

    expect(differenceInHours(dateLeftNum, dateRightObj)).toBe(-12);
    expect(differenceInHours(dateLeftNum, dateRightStr)).toBe(-12);
    expect(differenceInHours(dateLeftNum, dateRightNum)).toBe(-12);
    expect(differenceInHours(dateRightObj, dateLeftNum)).toBe(12);
    expect(differenceInHours(dateRightStr, dateLeftNum)).toBe(12);
    expect(differenceInHours(dateRightNum, dateLeftNum)).toBe(12);
  });

  it('should get difference in days', () => {
    const dateLeftObj = new Date('1994-01-20T00:00:00Z');
    const dateLeftStr = '1994-01-20T00:00:00.000Z';
    const dateLeftNum = new Date('1994-01-20').getTime();
    const dateRightObj = new Date('1994-01-21T12:00:00Z');
    const dateRightStr = '1994-01-21T12:00:00Z';
    const dateRightNum = new Date('1994-01-21T12:00:00Z').getTime();

    expect(differenceInDays(dateLeftObj, dateRightObj)).toBe(-1);
    expect(differenceInDays(dateLeftObj, dateRightStr)).toBe(-1);
    expect(differenceInDays(dateLeftObj, dateRightNum)).toBe(-1);
    expect(differenceInDays(dateRightObj, dateLeftObj)).toBe(1);
    expect(differenceInDays(dateRightStr, dateLeftObj)).toBe(1);
    expect(differenceInDays(dateRightNum, dateLeftObj)).toBe(1);

    expect(differenceInDays(dateLeftStr, dateRightObj)).toBe(-1);
    expect(differenceInDays(dateLeftStr, dateRightStr)).toBe(-1);
    expect(differenceInDays(dateLeftStr, dateRightNum)).toBe(-1);
    expect(differenceInDays(dateRightObj, dateLeftStr)).toBe(1);
    expect(differenceInDays(dateRightStr, dateLeftStr)).toBe(1);
    expect(differenceInDays(dateRightNum, dateLeftStr)).toBe(1);

    expect(differenceInDays(dateLeftNum, dateRightObj)).toBe(-1);
    expect(differenceInDays(dateLeftNum, dateRightStr)).toBe(-1);
    expect(differenceInDays(dateLeftNum, dateRightNum)).toBe(-1);
    expect(differenceInDays(dateRightObj, dateLeftNum)).toBe(1);
    expect(differenceInDays(dateRightStr, dateLeftNum)).toBe(1);
    expect(differenceInDays(dateRightNum, dateLeftNum)).toBe(1);
  });

  it('should get difference in weeks', () => {
    const dateLeftObj = new Date('1994-01-20T00:00:00Z');
    const dateLeftStr = '1994-01-20T00:00:00.000Z';
    const dateLeftNum = new Date('1994-01-20').getTime();
    const dateRightObj = new Date('1994-01-28T12:00:00Z');
    const dateRightStr = '1994-01-28T12:00:00Z';
    const dateRightNum = new Date('1994-01-28T12:00:00Z').getTime();

    expect(differenceInWeeks(dateLeftObj, dateRightObj)).toBe(-1);
    expect(differenceInWeeks(dateLeftObj, dateRightStr)).toBe(-1);
    expect(differenceInWeeks(dateLeftObj, dateRightNum)).toBe(-1);
    expect(differenceInWeeks(dateRightObj, dateLeftObj)).toBe(1);
    expect(differenceInWeeks(dateRightStr, dateLeftObj)).toBe(1);
    expect(differenceInWeeks(dateRightNum, dateLeftObj)).toBe(1);

    expect(differenceInWeeks(dateLeftStr, dateRightObj)).toBe(-1);
    expect(differenceInWeeks(dateLeftStr, dateRightStr)).toBe(-1);
    expect(differenceInWeeks(dateLeftStr, dateRightNum)).toBe(-1);
    expect(differenceInWeeks(dateRightObj, dateLeftStr)).toBe(1);
    expect(differenceInWeeks(dateRightStr, dateLeftStr)).toBe(1);
    expect(differenceInWeeks(dateRightNum, dateLeftStr)).toBe(1);

    expect(differenceInWeeks(dateLeftNum, dateRightObj)).toBe(-1);
    expect(differenceInWeeks(dateLeftNum, dateRightStr)).toBe(-1);
    expect(differenceInWeeks(dateLeftNum, dateRightNum)).toBe(-1);
    expect(differenceInWeeks(dateRightObj, dateLeftNum)).toBe(1);
    expect(differenceInWeeks(dateRightStr, dateLeftNum)).toBe(1);
    expect(differenceInWeeks(dateRightNum, dateLeftNum)).toBe(1);
  });

  it('should get difference in years', () => {
    const dateLeftObj = new Date('1994-01-20T00:00:00Z');
    const dateLeftStr = '1994-01-20T00:00:00.000Z';
    const dateLeftNum = new Date('1994-01-20').getTime();
    const dateRightObj = new Date('2021-01-20T12:00:00Z');
    const dateRightStr = '2021-01-20T12:00:00Z';
    const dateRightNum = new Date('2021-01-20T12:00:00Z').getTime();

    expect(differenceInYears(dateLeftObj, dateRightObj)).toBe(-27);
    expect(differenceInYears(dateLeftObj, dateRightStr)).toBe(-27);
    expect(differenceInYears(dateLeftObj, dateRightNum)).toBe(-27);
    expect(differenceInYears(dateRightObj, dateLeftObj)).toBe(27);
    expect(differenceInYears(dateRightStr, dateLeftObj)).toBe(27);
    expect(differenceInYears(dateRightNum, dateLeftObj)).toBe(27);

    expect(differenceInYears(dateLeftStr, dateRightObj)).toBe(-27);
    expect(differenceInYears(dateLeftStr, dateRightStr)).toBe(-27);
    expect(differenceInYears(dateLeftStr, dateRightNum)).toBe(-27);
    expect(differenceInYears(dateRightObj, dateLeftStr)).toBe(27);
    expect(differenceInYears(dateRightStr, dateLeftStr)).toBe(27);
    expect(differenceInYears(dateRightNum, dateLeftStr)).toBe(27);

    expect(differenceInYears(dateLeftNum, dateRightObj)).toBe(-27);
    expect(differenceInYears(dateLeftNum, dateRightStr)).toBe(-27);
    expect(differenceInYears(dateLeftNum, dateRightNum)).toBe(-27);
    expect(differenceInYears(dateRightObj, dateLeftNum)).toBe(27);
    expect(differenceInYears(dateRightStr, dateLeftNum)).toBe(27);
    expect(differenceInYears(dateRightNum, dateLeftNum)).toBe(27);
  });

  it('should get valid error', () => {
    // isValid
    expect(isValid('TEST')).toBe(false);
    expect(isValid(new Date('TEST'))).toBe(false);
    // toDate
    expect(() => {
      toDate('TEST');
    }).toThrow(new TypeError('Invalid time value'));
    expect(() => {
      toDate(new Date('TEST'));
    }).toThrow(new TypeError('Invalid time value'));
    // format
    expect(() => {
      format('TEST', 'yyyy-MM-dd');
    }).toThrow(new TypeError('Invalid time value'));
    expect(() => {
      format(new Date('TEST'), 'yyyy-MM-dd');
    }).toThrow(new TypeError('Invalid time value'));
    // isAfter
    expect(() => {
      isAfter('TEST', 'yyyy-MM-dd');
    }).toThrow(new TypeError('Invalid time value'));
    expect(() => {
      isAfter(new Date('TEST'), 'yyyy-MM-dd');
    }).toThrow(new TypeError('Invalid time value'));
    // isBefore
    expect(() => {
      isBefore('TEST', 'yyyy-MM-dd');
    }).toThrow(new TypeError('Invalid time value'));
    expect(() => {
      isBefore(new Date('TEST'), 'yyyy-MM-dd');
    }).toThrow(new TypeError('Invalid time value'));
    // differenceInHours
    expect(() => {
      differenceInHours('TEST', 'yyyy-MM-dd');
    }).toThrow(new TypeError('Invalid time value'));
    expect(() => {
      differenceInHours(new Date('TEST'), 'yyyy-MM-dd');
    }).toThrow(new TypeError('Invalid time value'));
    // differenceInDays
    expect(() => {
      differenceInDays('TEST', 'yyyy-MM-dd');
    }).toThrow(new TypeError('Invalid time value'));
    expect(() => {
      differenceInDays(new Date('TEST'), 'yyyy-MM-dd');
    }).toThrow(new TypeError('Invalid time value'));
    // differenceInWeeks
    expect(() => {
      differenceInWeeks('TEST', 'yyyy-MM-dd');
    }).toThrow(new TypeError('Invalid time value'));
    expect(() => {
      differenceInWeeks(new Date('TEST'), 'yyyy-MM-dd');
    }).toThrow(new TypeError('Invalid time value'));
    // differenceInYears
    expect(() => {
      differenceInYears('TEST', 'yyyy-MM-dd');
    }).toThrow(new TypeError('Invalid time value'));
    expect(() => {
      differenceInYears(new Date('TEST'), 'yyyy-MM-dd');
    }).toThrow(new TypeError('Invalid time value'));
  });
});
