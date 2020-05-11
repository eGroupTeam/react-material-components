import { DefinedRange } from './types';

import {
  addDays,
  startOfWeek,
  endOfWeek,
  addWeeks,
  startOfMonth,
  endOfMonth,
  addMonths
} from 'date-fns';

const getDefaultRanges = (date: Date): DefinedRange[] => [
  {
    label: '今天',
    startDate: date,
    endDate: date
  },
  {
    label: '昨天',
    startDate: addDays(date, -1),
    endDate: addDays(date, -1)
  },
  {
    label: '本週',
    startDate: startOfWeek(date),
    endDate: endOfWeek(date)
  },
  {
    label: '上一週',
    startDate: startOfWeek(addWeeks(date, -1)),
    endDate: endOfWeek(addWeeks(date, -1))
  },
  {
    label: '過去７天',
    startDate: addWeeks(date, -1),
    endDate: date
  },
  {
    label: '這個月',
    startDate: startOfMonth(date),
    endDate: endOfMonth(date)
  },
  {
    label: '上個月',
    startDate: startOfMonth(addMonths(date, -1)),
    endDate: endOfMonth(addMonths(date, -1))
  }
];

export const defaultRanges = getDefaultRanges(new Date());
