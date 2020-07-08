import React from 'react';

import {
  Grid,
  createStyles,
  Theme,
  withStyles,
  Typography
} from '@material-ui/core';
import { TimeProps } from './DateRangePicker.d';

const getTimes = () => {
  const hours = Array.from(Array(24).keys()).map(el =>
    el < 10 ? `0${el}` : `${el}`
  );
  const times = [];
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
      display: 'inline-flex'
    },
    header: {
      height: 53,
      width: '100%',
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    container: {
      height: 285
    },
    column: {
      overflow: 'auto',
      maxHeight: 255,
      width: 80,
      marginTop: 7
    },
    item: {
      marginBottom: theme.spacing(0.5),
      width: '100%',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
      padding: '4px 0',

      '&:hover': {
        backgroundColor: theme.palette.action.hover
      }
    }
  });

const Time: React.FunctionComponent<TimeProps> = props => {
  const { classes, onTimeClick } = props;

  return (
    <div className={classes.root}>
      <Grid container direction="column">
        <div className={classes.header} />
        <Grid item container className={classes.container}>
          <Grid item className={classes.column}>
            <Grid container direction="column">
              {getTimes().map(el => (
                <Grid
                  item
                  key={el}
                  className={classes.item}
                  onClick={() => onTimeClick(el)}
                >
                  <Typography variant="body2">{el}</Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Time);
