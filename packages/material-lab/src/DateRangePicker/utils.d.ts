import { Falsy } from './types';
export declare const identity: <T>(x: T) => T;
export declare const chunks: <T>(array: readonly T[], size: number) => T[][];
export declare const getDaysInMonth: (date: Date) => any[];
export declare const getValidDate: (
  date: Date | string | Falsy,
  defaultValue: Date
) => Date;
export declare const getValidatedMonths: (
  minDate: Date,
  maxDate: Date,
  startDate: Date | Falsy,
  endDate: Date | Falsy
) => (false | '' | 0 | Date)[];
export declare const isWithinIntervalValid: (
  date: number | Date,
  startDate: Date | Falsy,
  endDate: Date | Falsy
) => boolean;
export declare const isSameDayValid: (
  dateLeft: number | Date | Falsy,
  dateRight: number | Date | Falsy
) => boolean;
export declare const isBeforeValid: (
  date: number | Date | Falsy,
  dateToCompare: number | Date | Falsy
) => boolean;
export declare const isAfterValid: (
  date: number | Date | Falsy,
  dateToCompare: number | Date | Falsy
) => boolean;
export declare const inDateRange: (
  day: Date,
  startDate: Date | Falsy,
  endDate: Date | Falsy
) => boolean;
