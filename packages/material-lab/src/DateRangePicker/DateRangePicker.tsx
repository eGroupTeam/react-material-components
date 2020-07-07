import * as React from 'react';
import {
  addMonths,
  isSameDay,
  isAfter,
  isBefore,
  isSameMonth,
  addYears,
  max,
  min,
  format
} from 'date-fns';
import { parseOptionalDate } from './utils';
import DateRangePickerProps, {
  DateRange,
  NavigationAction,
  Marker,
  Focused,
  Touched
} from './DateRangePicker.d';

import {
  Fade,
  Popper,
  withStyles,
  createStyles,
  Theme,
  TextField,
  ClickAwayListener
} from '@material-ui/core';
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
    }
  });

const DateRangePicker: React.FunctionComponent<DateRangePickerProps> = props => {
  const today = new Date();

  const {
    classes,
    initialStartDate,
    initialEndDate,
    minDate,
    maxDate,
    onChange,
    onDayClick: onDayClickProp,
    onCloseClick,
    showTime
  } = props;

  const minDateValid = parseOptionalDate(minDate, addYears(today, -10));
  const maxDateValid = parseOptionalDate(maxDate, addYears(today, 10));
  const [intialFirstMonth, initialSecondMonth] = getValidatedMonths(
    {
      startDate: initialStartDate,
      endDate: initialEndDate
    },
    minDateValid,
    maxDateValid
  );
  const startEl = React.useRef();
  const endEl = React.useRef();
  const [startDate, setStartDate] = React.useState<Date>(initialStartDate);
  const [endDate, setEndDate] = React.useState<Date>(initialEndDate);
  const [open, setOpen] = React.useState(false);
  const [focused, setFocused] = React.useState<Focused>();
  const [touched, setTouched] = React.useState<Touched>({
    start: false,
    end: false
  });
  const [hoverDay, setHoverDay] = React.useState<Date>();
  const [firstMonth, setFirstMonth] = React.useState<Date>(
    intialFirstMonth || today
  );
  const [secondMonth, setSecondMonth] = React.useState<Date>(
    initialSecondMonth || addMonths(firstMonth, 1)
  );

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

  const handlePopupOpen = () => {
    setOpen(true);
  };

  const handlePopupClose = () => {
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

  const handleStartClick = event => {
    focusStartDate();
    handlePopupOpen();
  };

  const handleEndClick = event => {
    focusEndDate();
    handlePopupOpen();
  };

  // This behavior refer from ant design range picker.
  const onDayClick = (day: Date) => {
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

  const handlers = {
    onDayClick,
    onDayHover,
    onMonthNavigate
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
          className={classes.root}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Menu
                dateRange={{
                  startDate,
                  endDate
                }}
                minDate={minDateValid}
                maxDate={maxDateValid}
                firstMonth={firstMonth}
                secondMonth={secondMonth}
                setFirstMonth={setFirstMonthValidated}
                setSecondMonth={setSecondMonthValidated}
                handlers={handlers}
                touched={touched}
                hoverDay={hoverDay}
                onCloseClick={onCloseClick}
              />
            </Fade>
          )}
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default withStyles(styles)(DateRangePicker);
