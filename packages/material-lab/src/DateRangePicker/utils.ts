import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  isBefore,
  addDays,
  isSameDay,
  isWithinInterval,
  toDate,
  isValid
} from 'date-fns';
import { Falsy } from './DateRangePicker.d';

export const identity = <T>(x: T) => x;

export const chunks = <T>(array: ReadonlyArray<T>, size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
    array.slice(i * size, i * size + size)
  );
};

// Date
export const getDaysInMonth = (date: Date) => {
  const startWeek = startOfWeek(startOfMonth(date));
  const endWeek = endOfWeek(endOfMonth(date));
  const days = [];
  for (let curr = startWeek; isBefore(curr, endWeek); ) {
    days.push(curr);
    curr = addDays(curr, 1);
  }
  return days;
};

export const isStartOfRange = (startDate: Date, day: Date) =>
  (startDate && isSameDay(day, startDate)) as boolean;

export const isEndOfRange = (endDate: Date, day: Date) =>
  (endDate && isSameDay(day, endDate)) as boolean;

export const inDateRange = (startDate: Date, endDate: Date, day: Date) =>
  (startDate &&
    endDate &&
    (isWithinInterval(day, {
      start: startDate,
      end: endDate
    }) ||
      isSameDay(day, startDate) ||
      isSameDay(day, endDate))) as boolean;

export const isRangeSameDay = (startDate: Date, endDate: Date) => {
  if (startDate && endDate) {
    return isSameDay(startDate, endDate);
  }
  return false;
};

export const parseOptionalDate = (
  date: Date | string | Falsy,
  defaultValue: Date
) => {
  if (date) {
    const parsed = toDate(new Date(date));
    if (isValid(parsed)) return parsed;
  }
  return defaultValue;
};
