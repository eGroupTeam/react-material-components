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

export type DateVariant = Date | string | number | null;

export function isValid(date?: DateVariant) {
  let validDate = date;
  if (typeof validDate === 'string') {
    validDate = parseISO(validDate);
  }
  return dIsValid(validDate);
}

export function toDate(date?: DateVariant) {
  if (!date || !isValid(date)) {
    return undefined;
  }
  if (typeof date === 'string') {
    return parseISO(date);
  }
  return dToDate(date);
}

export function format(date?: DateVariant, format = 'PP') {
  const validDate = toDate(date);
  if (!validDate) {
    return undefined;
  }
  return dFormat(validDate, format, {
    locale,
  });
}

export function isAfter(date?: DateVariant, dateToCompare?: DateVariant) {
  const validDate = toDate(date);
  const validCompareDate = toDate(dateToCompare);
  if (!validDate || !validCompareDate) {
    return undefined;
  }
  return dIsAfter(validDate, validCompareDate);
}

export function isBefore(date?: DateVariant, dateToCompare?: DateVariant) {
  const validDate = toDate(date);
  const validCompareDate = toDate(dateToCompare);
  if (!validDate || !validCompareDate) {
    return undefined;
  }
  return dIsBefore(validDate, validCompareDate);
}

export function differenceInHours(
  dateLeft?: DateVariant,
  dateRight?: DateVariant
) {
  const validDateLeft = toDate(dateLeft);
  const validDateRight = toDate(dateRight);
  if (!validDateLeft || !validDateRight) {
    return undefined;
  }
  return dDifferenceInHours(validDateLeft, validDateRight);
}

export function differenceInDays(
  dateLeft?: DateVariant,
  dateRight?: DateVariant
) {
  const validDateLeft = toDate(dateLeft);
  const validDateRight = toDate(dateRight);
  if (!validDateLeft || !validDateRight) {
    return undefined;
  }
  return dDifferenceInDays(validDateLeft, validDateRight);
}

export function differenceInWeeks(
  dateLeft?: DateVariant,
  dateRight?: DateVariant
) {
  const validDateLeft = toDate(dateLeft);
  const validDateRight = toDate(dateRight);
  if (!validDateLeft || !validDateRight) {
    return undefined;
  }
  return dDifferenceInWeeks(validDateLeft, validDateRight);
}

export function differenceInYears(
  dateLeft?: DateVariant,
  dateRight?: DateVariant
) {
  const validDateLeft = toDate(dateLeft);
  const validDateRight = toDate(dateRight);
  if (!validDateLeft || !validDateRight) {
    return undefined;
  }
  return dDifferenceInYears(validDateLeft, validDateRight);
}
