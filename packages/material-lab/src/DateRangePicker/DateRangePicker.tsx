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

import {
  Paper,
  Fade,
  Popper,
  withStyles,
  createStyles,
  Theme,
  Hidden,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
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

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down('xs')]: {
        top: '0 !important',
        right: '0 !important',
        left: '0 !important',
        bottom: '0 !important',
        transform: 'none !important'
      }
    },
    paper: {
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }
    },
    close: {
      position: 'absolute',
      right: 5,
      top: 5
    }
  });

const DateRangePicker: React.FunctionComponent<DateRangePickerProps> = props => {
  const today = new Date();

  const {
    classes,
    variant = 'popup',
    open,
    anchorEl,
    onChange,
    onDayClick: onDayClickProp,
    initialDateRange,
    minDate,
    maxDate,
    setDateRange: controlledSetDateRange,
    dateRange: controlledDateRange,
    onCloseClick
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
    if (!hoverDay || !isSameDay(date, hoverDay)) {
      setHoverDay(date);
    }
  };

  // helpers
  const inHoverRange = (day: Date) => {
    if (!hoverDay) return false;
    if (startDate && !endDate) {
      return (
        isAfter(hoverDay, startDate) &&
        isWithinInterval(day, {
          start: startDate,
          end: hoverDay
        })
      );
    } else if (!startDate && endDate) {
      return (
        isBefore(hoverDay, endDate) &&
        isWithinInterval(day, {
          start: hoverDay,
          end: endDate
        })
      );
    }
    return false;
  };

  const helpers = {
    inHoverRange
  };

  const handlers = {
    onDayClick,
    onDayHover,
    onMonthNavigate
  };

  if (variant === 'popup') {
    return (
      <Popper
        open={open}
        transition
        anchorEl={anchorEl}
        className={classes.root}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className={classes.paper} elevation={6}>
              <Hidden smUp>
                <IconButton className={classes.close} onClick={onCloseClick}>
                  <CloseIcon />
                </IconButton>
              </Hidden>
              <Menu
                dateRange={dateRange}
                minDate={minDateValid}
                maxDate={maxDateValid}
                firstMonth={firstMonth}
                secondMonth={secondMonth}
                setFirstMonth={setFirstMonthValidated}
                setSecondMonth={setSecondMonthValidated}
                setDateRange={setDateRangeValidated}
                helpers={helpers}
                handlers={handlers}
              />
            </Paper>
          </Fade>
        )}
      </Popper>
    );
  }

  return (
    <Menu
      dateRange={dateRange}
      minDate={minDateValid}
      maxDate={maxDateValid}
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

export default withStyles(styles)(DateRangePicker);
