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
  isAfter,
  isSameDay
} from 'date-fns';
import { chunks, getDaysInMonth, inDateRange, isRangeSameDay } from './utils';
import Header from './Header';
import Day from './Day';
import { NavigationAction, MonthProps } from './DateRangePicker.d';

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
    } else if (startDate && endDate && focused === 'start') {
      return (
        isBefore(hoverDay, startDate) &&
        isWithinInterval(day, {
          start: hoverDay,
          end: startDate
        })
      );
    } else if (startDate && endDate && focused === 'end') {
      return (
        isAfter(hoverDay, endDate) &&
        isWithinInterval(day, {
          start: endDate,
          end: hoverDay
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
                const isStart = startDate && isSameDay(day, startDate);
                const isEnd = endDate && isSameDay(day, endDate);
                const isRangeOneDay = isRangeSameDay(startDate, endDate);
                const disable =
                  !isWithinInterval(day, {
                    start: minDate,
                    end: maxDate
                  }) ||
                  (touched.start && isBefore(day, startDate)) ||
                  (touched.end && isAfter(day, endDate));
                const isHovered = hoverDay && isSameDay(day, hoverDay);

                return (
                  <Day
                    key={format(day, 'MM-dd-yyyy')}
                    filled={isStart || isEnd}
                    outlined={isToday(day)}
                    inDateRange={
                      inDateRange(startDate, endDate, day) && !isRangeOneDay
                    }
                    inHoveredRange={inHoverRange(day)}
                    startOfHoveredRange={
                      isHovered &&
                      (isBefore(hoverDay, startDate) ||
                        isBefore(hoverDay, endDate))
                    }
                    endOfHoveredRange={
                      isHovered &&
                      (isAfter(hoverDay, startDate) ||
                        isAfter(hoverDay, endDate))
                    }
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
