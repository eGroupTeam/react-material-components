import React, { FC, MouseEventHandler, useEffect, useState } from 'react';

import { addMonths } from 'date-fns';

import {
  Divider,
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Button,
} from '@material-ui/core';
import { NavigationAction, Marker, Touched, Focused } from './types';
import Month from './Month';
import Time from './Time';
import MenuActions from './MenuActions'

export const MARKERS: { [key: string]: Marker } = {
  FIRST_MONTH: Symbol('firstMonth'),
  SECOND_MONTH: Symbol('secondMonth'),
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column'
    },
    item: {
      display: 'flex',
    },
    monthContainer: {
      marginBottom: 0
    }
  });

export interface MenuProps extends WithStyles<typeof styles> {
  startDate?: Date;
  endDate?: Date;
  minDate: Date;
  maxDate: Date;
  hoverDay?: Date;
  touched: Touched;
  focused?: Focused;
  startTime?: string;
  endTime?: string;
  onDayClick?: (date: Date) => void;
  onDayHover?: (date: Date) => void;
  onTimeClick?: (time: string) => void;
  onConfirmClick?: MouseEventHandler<HTMLButtonElement>
}

const Menu: FC<MenuProps> = (props) => {
  const {
    classes,
    startDate,
    endDate,
    hoverDay,
    minDate,
    maxDate,
    onDayClick,
    onDayHover,
    onTimeClick,
    onConfirmClick,
    touched,
    focused,
    startTime,
    endTime,
  } = props;

  const [month, setMonth] = useState<Date>(new Date());

  useEffect(() => {
    if (focused === 'start' && startDate) {
      setMonth(startDate);
    }
    if (focused === 'end' && endDate) {
      setMonth(endDate);
    }
  }, [endDate, focused, startDate]);

  const handleMonthNavigate = (action: NavigationAction) => {
    setMonth(addMonths(month, action));
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.item}>
          <Month
            startDate={startDate}
            endDate={endDate}
            minDate={minDate}
            maxDate={maxDate}
            hoverDay={hoverDay}
            value={month}
            touched={touched}
            focused={focused}
            navState={[true, true]}
            setValue={setMonth}
            onDayClick={onDayClick}
            onDayHover={onDayHover}
            onMonthNavigate={handleMonthNavigate}
            classes={{
              monthContainer: classes.monthContainer
            }}
          />
          <Divider orientation="vertical" flexItem />
          <Time
            onTimeClick={onTimeClick}
            value={focused === 'start' ? startTime : endTime}
          />
        </div>
        <div className={classes.item}>
          <MenuActions>
            <Button disabled={focused === 'start' ? !startDate : !endDate} onClick={onConfirmClick} disableElevation color="primary">確認</Button>
          </MenuActions>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Menu);
