import React from 'react';

import { MenuProps, NavigationAction, Marker } from './DateRangePicker.d';
import { addMonths } from 'date-fns';

import { Divider, Theme, createStyles, withStyles } from '@material-ui/core';
import Month from './Month';
import Time from './Time';

export const MARKERS: { [key: string]: Marker } = {
  FIRST_MONTH: Symbol('firstMonth'),
  SECOND_MONTH: Symbol('secondMonth')
};

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    container: {
      display: 'flex'
    }
  });

const Menu: React.FunctionComponent<MenuProps> = props => {
  const today = new Date();

  const {
    classes,
    initialStartDate,
    startDate,
    endDate,
    hoverDay,
    minDate,
    maxDate,
    handleDayClick,
    handleDayHover,
    handleTimeClick,
    touched,
    focused,
    startTime,
    endTime
  } = props;

  const [month, setMonth] = React.useState<Date>(initialStartDate || today);

  const handleMonthNavigate = (action: NavigationAction) => {
    setMonth(addMonths(month, action));
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Month
          startDate={startDate}
          endDate={endDate}
          minDate={minDate}
          maxDate={maxDate}
          hoverDay={hoverDay}
          value={month}
          touched={touched}
          focused={focused}
          navState={[true, true]}
          setValue={setMonth}
          handleDayClick={handleDayClick}
          handleDayHover={handleDayHover}
          handleMonthNavigate={handleMonthNavigate}
        />
        <Divider orientation="vertical" flexItem />
        <Time
          onTimeClick={handleTimeClick}
          value={focused === 'start' ? startTime : endTime}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(Menu);
