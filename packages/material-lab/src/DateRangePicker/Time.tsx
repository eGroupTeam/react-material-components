import React, { FC, useEffect, useRef } from 'react';

import {
  Grid,
  createStyles,
  Theme,
  withStyles,
  Typography,
  WithStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import useControlled from '@e-group/hooks/useControlled';
import scrollTo from '@e-group/utils/scrollTo'

const hours = Array.from(Array(24).keys()).map((el) =>
  el < 10 ? `0${el}` : `${el}`
)

const minutes = Array.from(Array(60).keys()).map((el) =>
  el < 10 ? `0${el}` : `${el}`
);

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-flex',
    },
    header: {
      height: 53,
      width: '100%',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    container: {
      height: 285,
    },
    columnContainer: {
      overflow: 'auto',
      maxHeight: 285,
      padding: '4px 0',
      width: 80,
    },
    column: {
      paddingBottom: 250
    },
    item: {
      width: '100%',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
      padding: '6px 0',

      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    itemActive: {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',

      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  });

export interface TimeProps extends WithStyles<typeof styles> {
  onTimeClick?: (time: string) => void;
  value?: string;
}

const Time: FC<TimeProps> = (props) => {
  const { classes, onTimeClick, value: valueProp } = props;
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: '',
  });
  const hoursColumnEl = useRef<HTMLDivElement>(null);
  const hoursActiveEl = useRef<HTMLDivElement>(null);
  const minutesColumnEl = useRef<HTMLDivElement>(null);
  const minutesActiveEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current: hoursColumn } = hoursColumnEl;
    const { current: hoursActive } = hoursActiveEl;
    const { current: minsColumn } = minutesColumnEl;
    const { current: minsActive } = minutesActiveEl;
    if (hoursColumn && hoursActive) {
      scrollTo(hoursColumn, hoursActive.offsetTop - 60, 300)
    }
    if (minsColumn && minsActive) {
      scrollTo(minsColumn, minsActive.offsetTop - 60, 300)
    }
  }, [value]);

  return (
    <div className={classes.root}>
      <Grid container direction="column">
        <div className={classes.header} />
        <Grid item container className={classes.container}>
          <Grid ref={hoursColumnEl} item className={classes.columnContainer}>
            <Grid container direction="column" className={classes.column}>
              {hours.map((hour: string) => {
                const valueHour = value?.split(':')[0]
                const valueMinute = value?.split(':')[1]
                const isActive = valueHour === hour;
                return (
                  <Grid
                    ref={isActive ? hoursActiveEl : undefined}
                    item
                    key={hour}
                    className={clsx(
                      classes.item,
                      isActive && classes.itemActive
                    )}
                    onClick={() => {
                      if (onTimeClick) {
                        setValue(`${hour}:${valueMinute}`)
                        onTimeClick(`${hour}:${valueMinute}`);
                      }
                    }}
                  >
                    <Typography variant="body2">{hour}</Typography>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid ref={minutesColumnEl} item className={classes.columnContainer}>
            <Grid container direction="column" className={classes.column}>
              {minutes.map((minute: string) => {
                const valueHour = value?.split(':')[0]
                const valueMinute = value?.split(':')[1]
                const isActive = valueMinute === minute;
                return (
                  <Grid
                    ref={isActive ? minutesActiveEl : undefined}
                    item
                    key={minute}
                    className={clsx(
                      classes.item,
                      isActive && classes.itemActive
                    )}
                    onClick={() => {
                      if (onTimeClick) {
                        setValue(`${valueHour}:${minute}`)
                        onTimeClick(`${valueHour}:${minute}`);
                      }
                    }}
                  >
                    <Typography variant="body2">{minute}</Typography>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Time);
