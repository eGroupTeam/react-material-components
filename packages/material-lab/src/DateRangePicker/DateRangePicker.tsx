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
import Menu from './Menu';

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
    initialStartDate,
    initialEndDate,
    minDate: minDateProp,
    maxDate: maxDateProp,
    onChange,
    onDayClick: onDayClickProp,
    onCloseClick
  } = props;

  const startEl = React.useRef();
  const endEl = React.useRef();
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date>(initialStartDate);
  const [endDate, setEndDate] = React.useState<Date>(initialEndDate);
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

  // This behavior refer from ant design range picker.
  const handleDayClick = (day: Date) => {
    if (onDayClickProp) {
      onDayClickProp(day);
    }
    if (onChange) {
      onChange(day, focused);
    }
    if (focused === 'start') {
      setTouched(val => ({
        ...val,
        start: true
      }));
      if (endDate && !startDate) {
        setStartDate(day);
        handlePopupClose();
      } else if (!startDate) {
        setStartDate(day);
        focusEndDate();
      } else if (endDate && isAfter(day, endDate)) {
        setEndDate(undefined);
        setStartDate(day);
        focusEndDate();
      } else {
        setStartDate(day);
        focusEndDate();
      }
    } else {
      setTouched(val => ({
        ...val,
        end: true
      }));
      if (!startDate && !endDate) {
        setEndDate(day);
        focusStartDate();
      } else if (startDate && !endDate) {
        setEndDate(day);
        handlePopupClose();
      } else if (startDate && isBefore(day, startDate)) {
        setStartDate(undefined);
        setEndDate(day);
        focusStartDate();
      } else {
        setEndDate(day);
        handlePopupClose();
      }
    }
    setHoverDay(day);
  };

  const handleDayHover = (date: Date) => {
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
                  <IconButton
                    className={classes.close}
                    onClick={handlePopupClose}
                  >
                    <CloseIcon />
                  </IconButton>
                </Hidden>
                <Menu
                  initialStartDate={initialStartDate}
                  initialEndDate={initialEndDate}
                  startDate={startDate}
                  endDate={endDate}
                  minDate={minDate}
                  maxDate={maxDate}
                  hoverDay={hoverDay}
                  touched={touched}
                  handleDayClick={handleDayClick}
                  handleDayHover={handleDayHover}
                />
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default withStyles(styles)(DateRangePicker);
