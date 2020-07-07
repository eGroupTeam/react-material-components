import React from 'react';

import { MenuProps, NavigationAction, Marker } from './DateRangePicker.d';
import {
  differenceInCalendarMonths,
  addMonths,
  isAfter,
  isBefore,
  format,
  isSameMonth,
  max,
  min
} from 'date-fns';

import {
  Fade,
  Popper,
  TextField,
  ClickAwayListener,
  Paper,
  Hidden,
  IconButton,
  Theme,
  createStyles,
  withStyles
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
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

const Menu: React.FunctionComponent<MenuProps> = props => {
  const today = new Date();

  const {
    startEl,
    endEl,
    classes,
    open,
    initialStartDate,
    initialEndDate,
    startDate,
    endDate,
    hoverDay,
    minDate,
    maxDate,
    onCloseClick,
    handleDayClick,
    handleDayHover,
    handleStartClick,
    handleEndClick,
    closePopup,
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
    <ClickAwayListener onClickAway={closePopup}>
      <div>
        <TextField
          inputRef={startEl}
          label="startDate"
          value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
          onClick={handleStartClick}
        />
        <TextField
          inputRef={endEl}
          label="endDate"
          value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
          onClick={handleEndClick}
        />
        <Popper
          open={open}
          transition
          anchorEl={startEl.current}
          className={classes.paper}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className={classes.root} elevation={6}>
                <Hidden smUp>
                  <IconButton className={classes.close} onClick={onCloseClick}>
                    <CloseIcon />
                  </IconButton>
                </Hidden>
                <Month
                  startDate={startDate}
                  endDate={endDate}
                  minDate={minDate}
                  maxDate={maxDate}
                  touched={touched}
                  value={firstMonth}
                  setValue={setFirstMonthValidated}
                  navState={[true, canNavigateCloser]}
                  marker={MARKERS.FIRST_MONTH}
                  handleDayClick={handleDayClick}
                  handleDayHover={handleDayHover}
                  handleMonthNavigate={handleMonthNavigate}
                  hoverDay={hoverDay}
                />
                <Month
                  startDate={startDate}
                  endDate={endDate}
                  minDate={minDate}
                  maxDate={maxDate}
                  touched={touched}
                  value={secondMonth}
                  setValue={setSecondMonthValidated}
                  navState={[canNavigateCloser, true]}
                  marker={MARKERS.SECOND_MONTH}
                  handleDayClick={handleDayClick}
                  handleDayHover={handleDayHover}
                  handleMonthNavigate={handleMonthNavigate}
                  hoverDay={hoverDay}
                />
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default withStyles(styles)(Menu);
