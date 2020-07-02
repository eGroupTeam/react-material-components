import React from 'react';
import {
  Grid,
  createStyles,
  WithStyles,
  Theme,
  withStyles
} from '@material-ui/core';
import { differenceInCalendarMonths } from 'date-fns';
import Month from './Month';
import DefinedRanges from './DefinedRanges';
import { DateRange, DefinedRange, Setter, NavigationAction } from './types';
import { MARKERS } from './DateRangePicker';

const styles = (theme: Theme) =>
  createStyles({
    header: {
      padding: '20px 70px'
    },
    headerItem: {
      flex: 1,
      textAlign: 'center'
    },
    divider: {
      borderLeft: `1px solid ${theme.palette.action.hover}`,
      marginBottom: 20
    }
  });

interface MenuProps extends WithStyles<typeof styles> {
  dateRange: DateRange;
  ranges?: DefinedRange[];
  minDate: Date;
  maxDate: Date;
  firstMonth: Date;
  secondMonth: Date;
  setFirstMonth: Setter<Date>;
  setSecondMonth: Setter<Date>;
  setDateRange: Setter<DateRange>;
  helpers: {
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    onDayClick: (day: Date) => void;
    onDayHover: (day: Date) => void;
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
}

const Menu: React.FunctionComponent<MenuProps> = props => {
  const {
    classes,
    ranges,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    setDateRange,
    helpers,
    handlers
  } = props;
  const canNavigateCloser =
    differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = { dateRange, minDate, maxDate, helpers, handlers };
  return (
    <Grid container direction="row" wrap="nowrap">
      <Grid>
        <Grid container direction="row" justify="center" wrap="nowrap">
          <Month
            {...commonProps}
            value={firstMonth}
            setValue={setFirstMonth}
            navState={[true, canNavigateCloser]}
            marker={MARKERS.FIRST_MONTH}
          />
          <div className={classes.divider} />
          <Month
            {...commonProps}
            value={secondMonth}
            setValue={setSecondMonth}
            navState={[canNavigateCloser, true]}
            marker={MARKERS.SECOND_MONTH}
          />
        </Grid>
      </Grid>
      <div className={classes.divider} />
      {ranges && (
        <Grid>
          <DefinedRanges
            selectedRange={dateRange}
            ranges={ranges}
            setRange={setDateRange}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default withStyles(styles)(Menu);
