import React from 'react';

import { isSameDay, addYears, isAfter, isBefore, format } from 'date-fns';
import { getValidDate } from './utils';
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
  const [startTime, setStartTime] = React.useState<string>();
  const [endDate, setEndDate] = React.useState<Date>(initialEndDate);
  const [endTime, setEndTime] = React.useState<string>();
  const [hoverDay, setHoverDay] = React.useState<Date>();
  const [focused, setFocused] = React.useState<Focused>();
  const [touched, setTouched] = React.useState<Touched>({
    start: false,
    end: false
  });
  const minDate = getValidDate(minDateProp, addYears(today, -10));
  const maxDate = getValidDate(maxDateProp, addYears(today, 10));

  const getValidDateTime = (date: Date, time: string = '00:00') => {
    if (!date) return undefined;
    return getValidDate(`${format(date, 'yyyy-MM-dd')} ${time}`, today);
  };

  const getStartDateTimeValue = () => {
    if (!startDate) return '';
    if (showTime) {
      return `${format(startDate, 'yyyy-MM-dd')} ${startTime || '00:00'}`;
    }
    return format(startDate, 'yyyy-MM-dd');
  };

  const getEndDateTimeValue = () => {
    if (!endDate) return '';
    if (showTime) {
      return `${format(endDate, 'yyyy-MM-dd')} ${endTime || '00:00'}`;
    }
    return format(endDate, 'yyyy-MM-dd');
  };

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

  const handleSetStartDate = (day: Date) => {
    if (focused === 'end') return;
    if (day && endDate && isAfter(day, endDate)) {
      setEndDate(undefined);
    }
    setStartDate(day);
    if (onChange) {
      onChange(
        [getValidDateTime(day, startTime), getValidDateTime(endDate, endTime)],
        focused
      );
    }
  };

  const handleSetEndDate = (day: Date) => {
    if (focused === 'start') return;
    if (day && startDate && isBefore(day, startDate)) {
      setStartDate(undefined);
    }
    setEndDate(day);
    if (onChange) {
      onChange(
        [
          getValidDateTime(startDate, startTime),
          getValidDateTime(day, endTime)
        ],
        focused
      );
    }
  };

  const handleSetStartTime = (time?: string) => {
    if (focused === 'start' && time) {
      setStartTime(time);
      if (onChange) {
        onChange(
          [
            getValidDateTime(startDate, time),
            getValidDateTime(endDate, endTime)
          ],
          focused
        );
      }
    }
  };

  const handleSetEndTime = (time?: string) => {
    if (focused === 'end' && time) {
      setEndTime(time);
      if (onChange) {
        onChange(
          [
            getValidDateTime(startDate, startTime),
            getValidDateTime(endDate, time)
          ],
          focused
        );
      }
    }
  };

  // This behavior refer from ant design range picker.
  const handleSetDateNextAction = () => {
    if (focused === 'start') {
      setTouched(val => ({
        ...val,
        start: true
      }));
      focusEndDate();
    }
    if (focused === 'end') {
      setTouched(val => ({
        ...val,
        end: true
      }));
      if (!startDate) {
        focusStartDate();
      } else {
        handlePopupClose();
      }
    }
  };

  const handleTimeClick = time => {
    handleSetStartTime(time);
    handleSetEndTime(time);
    handleSetDateNextAction();
  };

  const handleMenuDayClick = (day: Date) => {
    if (onDayClickProp) {
      onDayClickProp(day);
    }
    handleSetStartDate(day);
    handleSetEndDate(day);
  };

  const handleRangeMenuDayClick = (day: Date) => {
    if (onDayClickProp) {
      onDayClickProp(day);
    }
    handleSetStartDate(day);
    handleSetEndDate(day);
    handleSetDateNextAction();
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

  return (
    <ClickAwayListener onClickAway={handlePopupClose}>
      <div>
        <TextField
          inputRef={startEl}
          label="startDate"
          value={getStartDateTimeValue()}
          onClick={handleStartClick}
        />
        <TextField
          inputRef={endEl}
          label="endDate"
          value={getEndDateTimeValue()}
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
                    handleDayClick={handleMenuDayClick}
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
                    handleDayClick={handleRangeMenuDayClick}
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
