import {
  format as dFormat,
  isValid as dIsValid,
  isBefore as dIsBefore,
  isAfter as dIsAfter,
  toDate as dToDate,
  parseISO,
  differenceInHours as dDifferenceInHours,
  differenceInDays as dDifferenceInDays,
  differenceInWeeks as dDifferenceInWeeks,
  differenceInYears as dDifferenceInYears,
} from 'date-fns';
import getDateFnsLocale from './getDateFnsLocale';
import getNavigatorLanguage from '../getNavigatorLanguage';

const locale = getDateFnsLocale(getNavigatorLanguage());

export type DateVariant = Date | string | number;

export function isValid(date?: DateVariant) {
  let validDate = date;
  if (typeof validDate === 'string') {
    validDate = parseISO(validDate);
  }
  return dIsValid(validDate);
}

export function toDate(date?: DateVariant) {
  if (!isValid(date)) {
    return undefined;
  }
  if (typeof date === 'string') {
    return parseISO(date);
  }
  return dToDate(date as Date);
}

export function format(date?: DateVariant, format = 'PP') {
  if (!isValid(date)) {
    return undefined;
  }
  const validDate = toDate(date) as Date;
  return dFormat(validDate, format, {
    locale,
  });
}

export function isAfter(date?: DateVariant, dateToCompare?: DateVariant) {
  if (!isValid(date) || !isValid(dateToCompare)) {
    return undefined;
  }
  const validDate = toDate(date) as Date;
  const validCompareDate = toDate(dateToCompare) as Date;
  return dIsAfter(validDate, validCompareDate);
}

export function isBefore(date?: DateVariant, dateToCompare?: DateVariant) {
  if (!isValid(date) || !isValid(dateToCompare)) {
    return undefined;
  }
  const validDate = toDate(date) as Date;
  const validCompareDate = toDate(dateToCompare) as Date;
  return dIsBefore(validDate, validCompareDate);
}

export function differenceInHours(
  dateLeft?: DateVariant,
  dateRight?: DateVariant
) {
  if (!isValid(dateLeft) || !isValid(dateRight)) {
    return undefined;
  }
  const validDateLeft = toDate(dateLeft) as Date;
  const validDateRight = toDate(dateRight) as Date;
  return dDifferenceInHours(validDateLeft, validDateRight);
}

export function differenceInDays(
  dateLeft?: DateVariant,
  dateRight?: DateVariant
) {
  if (!isValid(dateLeft) || !isValid(dateRight)) {
    return undefined;
  }
  const validDateLeft = toDate(dateLeft) as Date;
  const validDateRight = toDate(dateRight) as Date;
  return dDifferenceInDays(validDateLeft, validDateRight);
}

export function differenceInWeeks(
  dateLeft?: DateVariant,
  dateRight?: DateVariant
) {
  if (!isValid(dateLeft) || !isValid(dateRight)) {
    return undefined;
  }
  const validDateLeft = toDate(dateLeft) as Date;
  const validDateRight = toDate(dateRight) as Date;
  return dDifferenceInWeeks(validDateLeft, validDateRight);
}

export function differenceInYears(
  dateLeft?: DateVariant,
  dateRight?: DateVariant
) {
  if (!isValid(dateLeft) || !isValid(dateRight)) {
    return undefined;
  }
  const validDateLeft = toDate(dateLeft) as Date;
  const validDateRight = toDate(dateRight) as Date;
  return dDifferenceInYears(validDateLeft, validDateRight);
}
