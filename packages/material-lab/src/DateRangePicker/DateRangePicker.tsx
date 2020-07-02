import * as React from 'react';
import {
  addMonths,
  isSameDay,
  isWithinInterval,
  isAfter,
  isBefore,
  isSameMonth,
  addYears,
  max,
  min
} from 'date-fns';
import { parseOptionalDate } from './utils';
import DateRangePickerProps, {
  DateRange,
  NavigationAction,
  Marker
} from './DateRangePicker.d';

import Menu from './Menu';

export const MARKERS: { [key: string]: Marker } = {
  FIRST_MONTH: Symbol('firstMonth'),
  SECOND_MONTH: Symbol('secondMonth')
};

const getValidatedMonths = (range: DateRange, minDate: Date, maxDate: Date) => {
  let { startDate, endDate } = range;
  if (startDate && endDate) {
    const newStart = max([startDate, minDate]);
    const newEnd = min([endDate, maxDate]);

    return [
      newStart,
      isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd
    ];
  } else {
    return [startDate, endDate];
  }
};

const DateRangePickerImpl: React.FunctionComponent<DateRangePickerProps> = props => {
  const today = new Date();

  const {
    onChange,
    onDayClick: onDayClickProp,
    initialDateRange,
    minDate,
    maxDate,
    definedRanges,
    setDateRange: controlledSetDateRange,
    dateRange: controlledDateRange
  } = props;

  const minDateValid = parseOptionalDate(minDate, addYears(today, -10));
  const maxDateValid = parseOptionalDate(maxDate, addYears(today, 10));
  const [intialFirstMonth, initialSecondMonth] = getValidatedMonths(
    initialDateRange || {},
    minDateValid,
    maxDateValid
  );

  const [selfDateRange, selfSetDateRange] = React.useState<DateRange>({
    ...initialDateRange
  });
  const [hoverDay, setHoverDay] = React.useState<Date>();
  const [firstMonth, setFirstMonth] = React.useState<Date>(
    intialFirstMonth || today
  );
  const [secondMonth, setSecondMonth] = React.useState<Date>(
    initialSecondMonth || addMonths(firstMonth, 1)
  );

  let dateRange = selfDateRange;
  let setDateRange = selfSetDateRange;
  if (controlledDateRange && controlledSetDateRange) {
    dateRange = controlledDateRange;
    setDateRange = controlledSetDateRange;
  }
  const { startDate, endDate } = dateRange;

  // handlers
  const setFirstMonthValidated = (date: Date) => {
    if (isBefore(date, secondMonth)) {
      setFirstMonth(date);
    }
  };

  const setSecondMonthValidated = (date: Date) => {
    if (isAfter(date, firstMonth)) {
      setSecondMonth(date);
    }
  };

  const setDateRangeValidated = (range: DateRange) => {
    let { startDate, endDate, ...other } = range;
    if (startDate && endDate) {
      const newStart = max([startDate, minDateValid]);
      const newEnd = min([endDate, maxDateValid]);
      const newRange = {
        ...other,
        startDate: newStart,
        endDate: newEnd
      };
      setDateRange(newRange);
      if (onChange) {
        onChange(newRange);
      }
      setFirstMonth(newStart);
      setSecondMonth(
        isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd
      );
    }
  };

  const onDayClick = (day: Date) => {
    if (onDayClickProp) {
      onDayClickProp(day);
    } else {
      if (startDate && !endDate && !isBefore(day, startDate)) {
        const newRange = { startDate, endDate: day };
        if (onChange) {
          onChange(newRange);
        }
        setDateRange(newRange);
      } else {
        setDateRange({ startDate: day, endDate: undefined });
      }
    }
    setHoverDay(day);
  };

  const onMonthNavigate = (marker: Marker, action: NavigationAction) => {
    if (marker === MARKERS.FIRST_MONTH) {
      const firstNew = addMonths(firstMonth, action);
      if (isBefore(firstNew, secondMonth)) setFirstMonth(firstNew);
    } else {
      const secondNew = addMonths(secondMonth, action);
      if (isBefore(firstMonth, secondNew)) setSecondMonth(secondNew);
    }
  };

  const onDayHover = (date: Date) => {
    if (startDate && !endDate) {
      if (!hoverDay || !isSameDay(date, hoverDay)) {
        setHoverDay(date);
      }
    }
  };

  // helpers
  const inHoverRange = (day: Date) => {
    return (startDate &&
      !endDate &&
      hoverDay &&
      isAfter(hoverDay, startDate) &&
      isWithinInterval(day, {
        start: startDate,
        end: hoverDay
      })) as boolean;
  };

  const helpers = {
    inHoverRange
  };

  const handlers = {
    onDayClick,
    onDayHover,
    onMonthNavigate
  };

  return (
    <Menu
      dateRange={dateRange}
      minDate={minDateValid}
      maxDate={maxDateValid}
      ranges={definedRanges}
      firstMonth={firstMonth}
      secondMonth={secondMonth}
      setFirstMonth={setFirstMonthValidated}
      setSecondMonth={setSecondMonthValidated}
      setDateRange={setDateRangeValidated}
      helpers={helpers}
      handlers={handlers}
    />
  );
};

const DateRangePicker = DateRangePickerImpl;
export default DateRangePicker;
