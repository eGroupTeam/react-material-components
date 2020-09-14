import React from 'react';

import { isSameDay, addYears, isAfter, isBefore, format } from 'date-fns';
import {
  WithStyles,
  ClickAwayListener,
  Fade,
  Popper,
  TextField,
  Paper,
  Hidden,
  IconButton,
  Theme,
  createStyles,
  withStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { getValidDate } from './utils';
import { Focused, Touched, DateRange } from './types';

import RangeMenu from './RangeMenu';
import Menu from './Menu';

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down('xs')]: {
        minWidth: '100vw',
        minHeight: '100vh',
        overflow: 'auto',
        transform: 'none !important',
      },
    },
    paper: {
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        minHeight: '100vh',
      },
    },
    close: {
      position: 'absolute',
      right: 5,
      top: 5,
    },
  });

export interface DateRangePickerProps extends WithStyles<typeof styles> {
  initialStartDate?: Date;
  initialEndDate?: Date;
  minDate?: Date | string;
  maxDate?: Date | string;
  onChange?: (dateRange: DateRange, type?: Focused) => void;
  onDayClick?: (date: Date) => void;
  onCloseClick?: () => void;
  showTime?: boolean;
}

const DateRangePicker: React.FunctionComponent<DateRangePickerProps> = (
  props
) => {
  const {
    classes,
    initialStartDate,
    initialEndDate,
    minDate: minDateProp,
    maxDate: maxDateProp,
    onChange,
    onDayClick: onDayClickProp,
    onCloseClick,
    showTime,
  } = props;

  const startEl = React.useRef<HTMLInputElement>(null);
  const endEl = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState(initialStartDate);
  const [startTime, setStartTime] = React.useState<string>();
  const [endDate, setEndDate] = React.useState(initialEndDate);
  const [endTime, setEndTime] = React.useState<string>();
  const [hoverDay, setHoverDay] = React.useState<Date>();
  const [focused, setFocused] = React.useState<Focused>();
  const [touched, setTouched] = React.useState<Touched>({
    start: false,
    end: false,
  });
  const minDate = getValidDate(minDateProp, addYears(new Date(), -10));
  const maxDate = getValidDate(maxDateProp, addYears(new Date(), 10));

  React.useEffect(() => {
    const getValidDateTime = (date?: Date, time = '00:00') => {
      if (!date) return undefined;
      return getValidDate(`${format(date, 'yyyy-MM-dd')} ${time}`, new Date());
    };
    if (onChange) {
      onChange(
        [
          getValidDateTime(startDate, startTime),
          getValidDateTime(endDate, endTime),
        ],
        focused
      );
    }
  }, [endDate, endTime, focused, onChange, startDate, startTime]);

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
      end: false,
    });
  };

  const focusStartDate = () => {
    setFocused('start');
    const { current } = startEl;
    if (current) {
      current.focus();
    }
  };

  const focusEndDate = () => {
    setFocused('end');
    const { current } = endEl;
    if (current) {
      current.focus();
    }
  };

  const handleStartClick = () => {
    focusStartDate();
    handlePopupOpen();
  };

  const handleEndClick = () => {
    focusEndDate();
    handlePopupOpen();
  };

  const handleSetStartDate = (day: Date): DateRange => {
    const nextStartDate = day;
    let nextEndDate = endDate;
    if (day && endDate && isAfter(day, endDate)) {
      nextEndDate = undefined;
    }
    setStartDate(nextStartDate);
    setEndDate(nextEndDate);
    return [nextStartDate, nextEndDate];
  };

  const handleSetEndDate = (day: Date): DateRange => {
    let nextStartDate = startDate;
    const nextEndDate = day;
    if (day && startDate && isBefore(day, startDate)) {
      nextStartDate = undefined;
    }
    setStartDate(nextStartDate);
    setEndDate(nextEndDate);
    return [nextStartDate, nextEndDate];
  };

  const handleSetStartTime = (time?: string) => {
    if (time) {
      setStartTime(time);
    }
  };

  const handleSetEndTime = (time?: string) => {
    if (time) {
      setEndTime(time);
    }
  };

  // This behavior refer from ant design range picker.
  const handleSetDateNextAction = (startDate?: Date, endDate?: Date) => {
    if (focused === 'start') {
      setTouched((val) => ({
        ...val,
        start: true,
      }));
      if (!endDate) {
        focusEndDate();
      } else {
        handlePopupClose();
      }
    }
    if (focused === 'end') {
      setTouched((val) => ({
        ...val,
        end: true,
      }));
      if (!startDate) {
        focusStartDate();
      } else {
        handlePopupClose();
      }
    }
  };

  const handleTimeClick = (time: string) => {
    if (focused === 'start') {
      handleSetStartTime(time);
    }
    if (focused === 'end') {
      handleSetEndTime(time);
    }
    if (focused === 'start' && startDate) {
      handleSetDateNextAction(startDate, endDate);
    }
    if (focused === 'end' && endDate) {
      handleSetDateNextAction(startDate, endDate);
    }
  };

  const handleMenuDayClick = (day: Date) => {
    if (onDayClickProp) {
      onDayClickProp(day);
    }
    if (focused === 'start') {
      const dateRange = handleSetStartDate(day);
      if (startTime) {
        handleSetDateNextAction(dateRange[0], dateRange[1]);
      }
    }
    if (focused === 'end') {
      const dateRange = handleSetEndDate(day);
      if (endTime) {
        handleSetDateNextAction(dateRange[0], dateRange[1]);
      }
    }
  };

  const handleRangeMenuDayClick = (day: Date) => {
    if (onDayClickProp) {
      onDayClickProp(day);
    }
    if (focused === 'start') {
      const dateRange = handleSetStartDate(day);
      handleSetDateNextAction(dateRange[0], dateRange[1]);
    }
    if (focused === 'end') {
      const dateRange = handleSetEndDate(day);
      handleSetDateNextAction(dateRange[0], dateRange[1]);
    }
  };

  const handleDayHover = (date: Date) => {
    if (showTime) {
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
