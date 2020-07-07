import React from 'react';

import { differenceInCalendarMonths } from 'date-fns';
import { MenuProps } from './DateRangePicker.d';
import { MARKERS } from './DateRangePicker';

import {
  Paper,
  Hidden,
  IconButton,
  Theme,
  createStyles,
  withStyles
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Month from './Month';

export const styles = (theme: Theme) =>
  createStyles({
    root: {
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
  const {
    classes,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    handlers,
    touched,
    hoverDay,
    onCloseClick
  } = props;
  const canNavigateCloser =
    differenceInCalendarMonths(secondMonth, firstMonth) >= 2;

  return (
    <Paper className={classes.root} elevation={6}>
      <Hidden smUp>
        <IconButton className={classes.close} onClick={onCloseClick}>
          <CloseIcon />
        </IconButton>
      </Hidden>
      <Month
        dateRange={dateRange}
        minDate={minDate}
        maxDate={maxDate}
        hoverDay={hoverDay}
        handlers={handlers}
        touched={touched}
        value={firstMonth}
        setValue={setFirstMonth}
        navState={[true, canNavigateCloser]}
        marker={MARKERS.FIRST_MONTH}
      />
      <Month
        dateRange={dateRange}
        minDate={minDate}
        maxDate={maxDate}
        hoverDay={hoverDay}
        handlers={handlers}
        touched={touched}
        value={secondMonth}
        setValue={setSecondMonth}
        navState={[canNavigateCloser, true]}
        marker={MARKERS.SECOND_MONTH}
      />
    </Paper>
  );
};

export default withStyles(styles)(Menu);
