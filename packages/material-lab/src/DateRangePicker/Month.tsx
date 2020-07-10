import React from 'react';
import {
  Grid,
  Typography,
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from '@material-ui/core';
import { getDate, isSameMonth, isToday, format } from 'date-fns';
import {
  chunks,
  getDaysInMonth,
  inDateRange,
  isSameDayValid,
  isWithinIntervalValid,
  isBeforeValid,
  isAfterValid
} from './utils';
import Header from './Header';
import Day from './Day';
import { NavigationAction, Touched, Focused } from './types';

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六'];

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-flex',
      width: 318
    },
    weekDaysContainer: {
      marginTop: 10,
      paddingLeft: 30,
      paddingRight: 30
    },
    monthContainer: {
      paddingLeft: 15,
      paddingRight: 15,
      marginTop: 15,
      marginBottom: 20
    },
    weekContainer: {
      margin: '2px 0'
    }
  });

export interface MonthProps extends WithStyles<typeof styles> {
  startDate?: Date;
  endDate?: Date;
  minDate: Date;
  maxDate: Date;
  hoverDay?: Date;
  value: Date;
  touched: Touched;
  focused?: Focused;
  marker?: symbol;
  navState: [boolean, boolean];
  setValue: (date: Date) => void;
  handleDayClick: (date: Date) => void;
  handleDayHover: (date: Date) => void;
  handleMonthNavigate: (action: NavigationAction, marker?: symbol) => void;
}

const Month: React.FunctionComponent<MonthProps> = props => {
  const {
    classes,
    value: date,
    marker,
    setValue: setDate,
    minDate,
    maxDate,
    touched,
    focused,
    hoverDay,
    startDate,
    endDate,
    handleDayClick,
    handleDayHover,
    handleMonthNavigate
  } = props;

  const inHoverRange = (day: Date) => {
    if (!hoverDay) return false;
    if (focused === 'start') {
      if (!startDate && endDate) {
        return isWithinIntervalValid(day, hoverDay, endDate);
      } else if (startDate && endDate) {
        return isWithinIntervalValid(day, hoverDay, startDate);
      }
    } else if (focused === 'end') {
      if (startDate && !endDate) {
        return isWithinIntervalValid(day, startDate, hoverDay);
      } else if (startDate && endDate) {
        return isWithinIntervalValid(day, endDate, hoverDay);
      }
    }
    return false;
  };

  const [back, forward] = props.navState;
  return (
    <div className={classes.root}>
      <Grid container>
        <Header
          date={date}
          setDate={setDate}
          nextDisabled={!forward}
          prevDisabled={!back}
          onClickPrevious={() =>
            handleMonthNavigate(NavigationAction.Previous, marker)
          }
          onClickNext={() => handleMonthNavigate(NavigationAction.Next, marker)}
        />

        <Grid
          item
          container
          justify="space-between"
          className={classes.weekDaysContainer}
        >
          {WEEK_DAYS.map(day => (
            <Typography variant="body2" color="textSecondary" key={day}>
              {day}
            </Typography>
          ))}
        </Grid>

        <Grid
          item
          container
          direction="column"
          className={classes.monthContainer}
        >
          {chunks(getDaysInMonth(date), 7).map((week, idx) => (
            <Grid
              key={idx}
              container
              justify="center"
              className={classes.weekContainer}
            >
              {week.map(day => {
                const isStart = isSameDayValid(day, startDate);
                const isEnd = isSameDayValid(day, endDate);
                const isRangeOneDay = isSameDayValid(startDate, endDate);
                const disable =
                  !isWithinIntervalValid(day, minDate, maxDate) ||
                  (touched.start && isBeforeValid(day, startDate)) ||
                  (touched.end && isAfterValid(day, endDate));
                const isHovered = isSameDayValid(day, hoverDay);
                const startOfHoveredRange =
                  isHovered &&
                  (isBeforeValid(hoverDay, startDate) ||
                    isBeforeValid(hoverDay, endDate));
                const endOfHoveredRange =
                  isHovered &&
                  (isAfterValid(hoverDay, startDate) ||
                    isAfterValid(hoverDay, endDate));
                return (
                  <Day
                    key={format(day, 'MM-dd-yyyy')}
                    filled={isStart || isEnd}
                    outlined={isToday(day)}
                    isInDateRange={
                      inDateRange(day, startDate, endDate) && !isRangeOneDay
                    }
                    isInHoveredRange={inHoverRange(day)}
                    startOfHoveredRange={startOfHoveredRange}
                    endOfHoveredRange={endOfHoveredRange}
                    disabled={disable}
                    invisible={!isSameMonth(date, day)}
                    startOfDateRange={isStart && !isRangeOneDay}
                    endOfDateRange={isEnd && !isRangeOneDay}
                    onClick={() => handleDayClick(day)}
                    onHover={() => handleDayHover(day)}
                    value={getDate(day)}
                  />
                );
              })}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Month);
