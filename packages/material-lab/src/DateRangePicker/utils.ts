import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  isBefore,
  isAfter,
  addDays,
  isSameDay,
  isWithinInterval,
  toDate,
  isValid,
  isSameMonth,
  max,
  min,
  addMonths,
} from 'date-fns';
import { Falsy } from './types';

export const identity = <T>(x: T) => x;

export const chunks = <T>(array: ReadonlyArray<T>, size: number): T[][] => Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
    array.slice(i * size, i * size + size)
  );

export const getDaysInMonth = (date: Date) => {
  const startWeek = startOfWeek(startOfMonth(date));
  const endWeek = endOfWeek(endOfMonth(date));
  const days: Date[] = [];
  for (let curr = startWeek; isBefore(curr, endWeek); ) {
    days.push(curr);
    curr = addDays(curr, 1);
  }
  return days;
};

// Date
export const getValidDate = (
  date: Date | string | Falsy,
  defaultValue: Date
) => {
  if (date) {
    const parsed = toDate(new Date(date));
    if (isValid(parsed)) return parsed;
  }
  return defaultValue;
};

export const getValidatedMonths = (
  minDate: Date,
  maxDate: Date,
  startDate: Date | Falsy,
  endDate: Date | Falsy
) => {
  if (startDate && endDate) {
    const newStart = max([startDate, minDate]);
    const newEnd = min([endDate, maxDate]);

    return [
      newStart,
      isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd,
    ];
  }
  return [startDate, endDate];
};

export const isWithinIntervalValid = (
  date: number | Date,
  startDate: Date | Falsy,
  endDate: Date | Falsy
) => {
  if (startDate && endDate && isBefore(startDate, endDate)) {
    return isWithinInterval(date, {
      start: startDate,
      end: endDate,
    });
  }
  return false;
};

export const isSameDayValid = (
  dateLeft: number | Date | Falsy,
  dateRight: number | Date | Falsy
) => {
  if (dateLeft && dateRight) {
    return isSameDay(dateLeft, dateRight);
  }
  return false;
};

export const isBeforeValid = (
  date: number | Date | Falsy,
  dateToCompare: number | Date | Falsy
) => {
  if (date && dateToCompare) {
    return isBefore(date, dateToCompare);
  }
  return false;
};

export const isAfterValid = (
  date: number | Date | Falsy,
  dateToCompare: number | Date | Falsy
) => {
  if (date && dateToCompare) {
    return isAfter(date, dateToCompare);
  }
  return false;
};

export const inDateRange = (
  day: Date,
  startDate: Date | Falsy,
  endDate: Date | Falsy
) => {
  if (startDate && endDate) {
    return (
      isWithinIntervalValid(day, startDate, endDate) ||
      isSameDayValid(day, startDate) ||
      isSameDayValid(day, endDate)
    );
  }
  return false;
};
