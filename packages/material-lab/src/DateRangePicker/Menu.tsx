import React from 'react';

import { differenceInCalendarMonths } from 'date-fns';
import { MenuProps } from './DateRangePicker.d';
import { MARKERS } from './DateRangePicker';

import Month from './Month';

const Menu: React.FunctionComponent<MenuProps> = props => {
  const {
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    helpers,
    handlers,
    touched
  } = props;
  const canNavigateCloser =
    differenceInCalendarMonths(secondMonth, firstMonth) >= 2;

  return (
    <>
      <Month
        dateRange={dateRange}
        minDate={minDate}
        maxDate={maxDate}
        helpers={helpers}
        handlers={handlers}
        touched={touched}
        value={firstMonth}
        setValue={setFirstMonth}
        navState={[true, canNavigateCloser]}
        marker={MARKERS.FIRST_MONTH}
      />
      <Month
        dateRange={dateRange}
        minDate={minDate}
        maxDate={maxDate}
        helpers={helpers}
        handlers={handlers}
        touched={touched}
        value={secondMonth}
        setValue={setSecondMonth}
        navState={[canNavigateCloser, true]}
        marker={MARKERS.SECOND_MONTH}
      />
    </>
  );
};

export default Menu;
