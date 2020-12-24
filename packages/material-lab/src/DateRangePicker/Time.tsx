import React from 'react';

import {
  Grid,
  createStyles,
  Theme,
  withStyles,
  Typography,
  WithStyles,
} from '@material-ui/core';
import clsx from 'clsx';

const getTimes = () => {
  const hours = Array.from(Array(24).keys()).map((el) =>
    el < 10 ? `0${el}` : `${el}`
  );
  const times: string[] = [];
  for (let i = 0; i < hours.length; i++) {
    const h = hours[i];
    times.push(`${h}:00`);
    times.push(`${h}:30`);
  }
  return times;
};

export const styles = (theme: Theme) =>
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
    column: {
      overflow: 'auto',
      maxHeight: 285,
      padding: '4px 0',
      width: 80,
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

const Time: React.FunctionComponent<TimeProps> = (props) => {
  const columnEl = React.useRef<HTMLDivElement>(null);
  const activeEl = React.useRef<HTMLDivElement>(null);
  const { classes, onTimeClick, value } = props;

  React.useEffect(() => {
    const { current: column } = columnEl;
    const { current: active } = activeEl;
    if (column && active) {
      column.scrollTop = active.offsetTop - 60;
    }
  }, [value]);

  return (
    <div className={classes.root}>
      <Grid container direction="column">
        <div className={classes.header} />
        <Grid item container className={classes.container}>
          <Grid ref={columnEl} item className={classes.column}>
            <Grid container direction="column">
              {getTimes().map((time: string) => {
                const isActive = value === time;
                return (
                  <Grid
                    ref={isActive ? activeEl : undefined}
                    item
                    key={time}
                    className={clsx(
                      classes.item,
                      isActive && classes.itemActive
                    )}
                    onClick={() => {
                      if (onTimeClick) {
                        onTimeClick(time);
                      }
                    }}
                  >
                    <Typography variant="body2">{time}</Typography>
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
