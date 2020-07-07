import React from 'react';
import {
  Grid,
  Typography,
  createStyles,
  Theme,
  withStyles
} from '@material-ui/core';
import {
  getDate,
  isSameMonth,
  isToday,
  format,
  isWithinInterval,
  isBefore,
  isAfter
} from 'date-fns';
import {
  chunks,
  getDaysInMonth,
  isStartOfRange,
  isEndOfRange,
  inDateRange,
  isRangeSameDay
} from './utils';
import Header from './Header';
import Day from './Day';
import { NavigationAction, MonthProps } from './DateRangePicker.d';

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六'];

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-flex',
      width: 290
    },
    weekDaysContainer: {
      marginTop: 10,
      paddingLeft: 30,
      paddingRight: 30
    },
    daysContainer: {
      paddingLeft: 15,
      paddingRight: 15,
      marginTop: 15,
      marginBottom: 20
    }
  });

const Month: React.FunctionComponent<MonthProps> = props => {
  const {
    classes,
    value: date,
    marker,
    setValue: setDate,
    minDate,
    maxDate,
    touched,
    hoverDay,
    startDate,
    endDate,
    handleDayClick,
    handleDayHover,
    handleMonthNavigate
  } = props;

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
            handleMonthNavigate(marker, NavigationAction.Previous)
          }
          onClickNext={() => handleMonthNavigate(marker, NavigationAction.Next)}
        />

        <Grid
          item
          container
          direction="row"
          justify="space-between"
          className={classes.weekDaysContainer}
        >
          {WEEK_DAYS.map(day => (
            <Typography color="textSecondary" key={day} variant="caption">
              {day}
            </Typography>
          ))}
        </Grid>

        <Grid
          item
          container
          direction="column"
          justify="space-between"
          className={classes.daysContainer}
        >
          {chunks(getDaysInMonth(date), 7).map((week, idx) => (
            <Grid key={idx} container direction="row" justify="center">
              {week.map(day => {
                const isStart = isStartOfRange(startDate, day);
                const isEnd = isEndOfRange(endDate, day);
                const isRangeOneDay = isRangeSameDay(startDate, endDate);
                const highlighted =
                  inDateRange(startDate, endDate, day) || inHoverRange(day);
                const disable =
                  !isWithinInterval(day, {
                    start: minDate,
                    end: maxDate
                  }) ||
                  (touched.start && isBefore(day, startDate)) ||
                  (touched.end && isAfter(day, endDate));

                return (
                  <Day
                    key={format(day, 'MM-dd-yyyy')}
                    filled={isStart || isEnd}
                    outlined={isToday(day)}
                    highlighted={highlighted && !isRangeOneDay}
                    disabled={disable}
                    invisible={!isSameMonth(date, day)}
                    startOfRange={isStart && !isRangeOneDay}
                    endOfRange={isEnd && !isRangeOneDay}
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
