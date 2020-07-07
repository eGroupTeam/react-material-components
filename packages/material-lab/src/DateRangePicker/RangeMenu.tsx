import React from 'react';

import { RangeMenuProps, NavigationAction, Marker } from './DateRangePicker.d';
import {
  differenceInCalendarMonths,
  addMonths,
  isAfter,
  isBefore,
  isSameMonth,
  max,
  min
} from 'date-fns';

import Month from './Month';

const getValidatedMonths = (
  startDate,
  endDate,
  minDate: Date,
  maxDate: Date
) => {
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

export const MARKERS: { [key: string]: Marker } = {
  FIRST_MONTH: Symbol('firstMonth'),
  SECOND_MONTH: Symbol('secondMonth')
};

const RangeMenu: React.FunctionComponent<RangeMenuProps> = props => {
  const today = new Date();

  const {
    initialStartDate,
    initialEndDate,
    startDate,
    endDate,
    hoverDay,
    minDate,
    maxDate,
    handleDayClick,
    handleDayHover,
    touched
  } = props;

  const [intialFirstMonth, initialSecondMonth] = getValidatedMonths(
    initialStartDate,
    initialEndDate,
    minDate,
    maxDate
  );

  const [firstMonth, setFirstMonth] = React.useState<Date>(
    intialFirstMonth || today
  );
  const [secondMonth, setSecondMonth] = React.useState<Date>(
    initialSecondMonth || addMonths(firstMonth, 1)
  );

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

  const handleMonthNavigate = (marker: Marker, action: NavigationAction) => {
    if (marker === MARKERS.FIRST_MONTH) {
      const firstNew = addMonths(firstMonth, action);
      if (isBefore(firstNew, secondMonth)) setFirstMonth(firstNew);
    } else {
      const secondNew = addMonths(secondMonth, action);
      if (isBefore(firstMonth, secondNew)) setSecondMonth(secondNew);
    }
  };

  const canNavigateCloser =
    differenceInCalendarMonths(secondMonth, firstMonth) >= 2;

  return (
    <>
      <Month
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        maxDate={maxDate}
        hoverDay={hoverDay}
        value={firstMonth}
        touched={touched}
        marker={MARKERS.FIRST_MONTH}
        navState={[true, canNavigateCloser]}
        setValue={setFirstMonthValidated}
        handleDayClick={handleDayClick}
        handleDayHover={handleDayHover}
        handleMonthNavigate={handleMonthNavigate}
      />
      <Month
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        maxDate={maxDate}
        hoverDay={hoverDay}
        value={secondMonth}
        touched={touched}
        marker={MARKERS.SECOND_MONTH}
        navState={[canNavigateCloser, true]}
        setValue={setSecondMonthValidated}
        handleDayClick={handleDayClick}
        handleDayHover={handleDayHover}
        handleMonthNavigate={handleMonthNavigate}
      />
    </>
  );
};

export default RangeMenu;
