import {
  format as dFormat,
  isValid as dIsValid,
  isBefore as dIsBefore,
  toDate as dToDate,
  parseISO,
} from 'date-fns';
import getDateFnsLocale from './getDateFnsLocale';
import getNavigatorLanguage from './getNavigatorLanguage';

const locale = getDateFnsLocale(getNavigatorLanguage());

export type DateObj = Date | string | number;

export function isValid(date: DateObj) {
  let validDate = date;
  if (typeof validDate === 'string') {
    validDate = parseISO(validDate);
  }
  return dIsValid(validDate);
}

export function toDate(date: DateObj) {
  if (!isValid(date)) return 'Invalid time value';
  if (typeof date === 'string') {
    return parseISO(date);
  }
  return dToDate(date);
}

export function format(date: DateObj, format = 'PP') {
  if (!isValid(date)) return 'Invalid time value';
  const validDate = toDate(date) as Date;
  return dFormat(validDate, format, {
    locale,
  });
}

export function isBefore(date: DateObj, dateToCompare: DateObj) {
  if (!isValid(date) || !isValid(dateToCompare)) return 'Invalid time value';
  const validDate = toDate(date) as Date;
  const validCompareDate = toDate(dateToCompare) as Date;
  return dIsBefore(validDate, validCompareDate);
}
