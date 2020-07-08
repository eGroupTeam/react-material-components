import React from 'react';

import { isSameDay, addYears, isAfter, isBefore, format } from 'date-fns';
import { parseOptionalDate } from './utils';
import DateRangePickerProps, { Focused, Touched } from './DateRangePicker.d';

import {
  ClickAwayListener,
  Fade,
  Popper,
  TextField,
  Paper,
  Hidden,
  IconButton,
  Theme,
  createStyles,
  withStyles
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import RangeMenu from './RangeMenu';
import Menu from './Menu';

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down('xs')]: {
        minWidth: '100vw',
        minHeight: '100vh',
        overflow: 'auto',
        transform: 'none !important'
      }
    },
    paper: {
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        minHeight: '100vh'
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
    initialStartDate,
    initialEndDate,
    minDate: minDateProp,
    maxDate: maxDateProp,
    onChange,
    onDayClick: onDayClickProp,
    onCloseClick,
    showTime
  } = props;

  const startEl = React.useRef();
  const endEl = React.useRef();
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date>(initialStartDate);
  const [startTime, setStartTime] = React.useState();
  const [endDate, setEndDate] = React.useState<Date>(initialEndDate);
  const [endTime, setEndTime] = React.useState();
  const [hoverDay, setHoverDay] = React.useState<Date>();
  const [focused, setFocused] = React.useState<Focused>();
  const [touched, setTouched] = React.useState<Touched>({
    start: false,
    end: false
  });
  const minDate = parseOptionalDate(minDateProp, addYears(today, -10));
  const maxDate = parseOptionalDate(maxDateProp, addYears(today, 10));

  const handlePopupOpen = () => {
    setOpen(true);
  };

  const handlePopupClose = () => {
    if (onCloseClick) {
      onCloseClick();
    }
    setOpen(false);
    setTouched({
      start: false,
      end: false
    });
  };

  const focusStartDate = () => {
    setFocused('start');
    const {
      current = {
        focus: () => {}
      }
    } = startEl;
    current.focus();
  };

  const focusEndDate = () => {
    setFocused('end');
    const {
      current = {
        focus: () => {}
      }
    } = endEl;
    current.focus();
  };

  const handleStartClick = () => {
    focusStartDate();
    handlePopupOpen();
  };

  const handleEndClick = () => {
    focusEndDate();
    handlePopupOpen();
  };

  const handleTimeClick = time => {
    if (focused === 'start' && startDate) {
      setStartTime(time);
      handleDayClick(
        parseOptionalDate(
          `${format(startDate, 'yyyy-MM-dd')} ${time}`,
          startDate
        ),
        true
      );
    }
    if (focused === 'end' && endDate) {
      setEndTime(time);
      handleDayClick(
        parseOptionalDate(`${format(endDate, 'yyyy-MM-dd')} ${time}`, endDate),
        true
      );
    }
  };

  // This behavior refer from ant design range picker.
  const handleDayClick = (day: Date, shouldNext: boolean) => {
    if (onDayClickProp) {
      onDayClickProp(day);
    }
    if (onChange) {
      onChange(day, focused);
    }
    if (focused === 'start') {
      if (shouldNext) {
        setTouched(val => ({
          ...val,
          start: true
        }));
      }
      if (endDate && !startDate) {
        setStartDate(day);
        if (shouldNext) {
          handlePopupClose();
        }
      } else if (!startDate) {
        setStartDate(day);
        if (shouldNext) {
          focusEndDate();
        }
      } else if (endDate && isAfter(day, endDate)) {
        setEndDate(undefined);
        setStartDate(day);
        if (shouldNext) {
          focusEndDate();
        }
      } else {
        setStartDate(day);
        if (shouldNext) {
          focusEndDate();
        }
      }
    } else {
      if (shouldNext) {
        setTouched(val => ({
          ...val,
          end: true
        }));
      }
      if (!startDate && !endDate) {
        setEndDate(day);
        if (shouldNext) {
          focusStartDate();
        }
      } else if (startDate && !endDate) {
        setEndDate(day);
        if (shouldNext) {
          handlePopupClose();
        }
      } else if (startDate && isBefore(day, startDate)) {
        setStartDate(undefined);
        setEndDate(day);
        if (shouldNext) {
          focusStartDate();
        }
      } else {
        setEndDate(day);
        if (shouldNext) {
          handlePopupClose();
        }
      }
    }
  };

  const handleDayHover = (date: Date) => {
    if (showTime) {
      if (!startDate) {
        return;
      }
      if (startDate && !startTime) {
        return;
      }
      if (endDate && !endTime) {
        return;
      }
    }
    if (!hoverDay || !isSameDay(date, hoverDay)) {
      setHoverDay(date);
    }
  };

  const formater = showTime ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd';

  return (
    <ClickAwayListener onClickAway={handlePopupClose}>
      <div>
        <TextField
          inputRef={startEl}
          label="startDate"
          value={startDate ? format(startDate, formater) : ''}
          onClick={handleStartClick}
        />
        <TextField
          inputRef={endEl}
          label="endDate"
          value={endDate ? format(endDate, formater) : ''}
          onClick={handleEndClick}
        />
        <Popper
          open={open}
          transition
          anchorEl={startEl.current}
          className={classes.root}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className={classes.paper} elevation={6}>
                <Hidden smUp>
                  <IconButton
                    className={classes.close}
                    onClick={handlePopupClose}
                  >
                    <CloseIcon />
                  </IconButton>
                </Hidden>
                {showTime ? (
                  <Menu
                    initialStartDate={initialStartDate}
                    startDate={startDate}
                    endDate={endDate}
                    minDate={minDate}
                    maxDate={maxDate}
                    hoverDay={hoverDay}
                    touched={touched}
                    focused={focused}
                    handleDayClick={day => handleDayClick(day, false)}
                    handleDayHover={handleDayHover}
                    handleTimeClick={handleTimeClick}
                    startTime={startTime}
                    endTime={endTime}
                  />
                ) : (
                  <RangeMenu
                    initialStartDate={initialStartDate}
                    initialEndDate={initialEndDate}
                    startDate={startDate}
                    endDate={endDate}
                    minDate={minDate}
                    maxDate={maxDate}
                    hoverDay={hoverDay}
                    touched={touched}
                    focused={focused}
                    handleDayClick={day => handleDayClick(day, true)}
                    handleDayHover={handleDayHover}
                  />
                )}
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default withStyles(styles)(DateRangePicker);
