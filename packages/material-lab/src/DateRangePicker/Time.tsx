import React from 'react';

import { Grid, createStyles, Theme, withStyles } from '@material-ui/core';
import { TimeProps } from './DateRangePicker.d';

const getTimeNumbers = (size: number) =>
  Array.from(Array(size).keys()).map(el => (el < 10 ? `0${el}` : `${el}`));

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-flex'
    },
    header: {
      height: 54,
      width: '100%'
    },
    column: {
      overflow: 'hidden',
      maxHeight: 199,
      width: 56,

      '&:hover': {
        overflow: 'auto'
      }
    },
    item: {
      padding: theme.spacing(0.5, 0),
      width: '100%',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',

      '&:hover': {
        backgroundColor: theme.palette.action.hover
      }
    }
  });

const Time: React.FunctionComponent<TimeProps> = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container>
        <div className={classes.header} />
        <Grid item container>
          <Grid item className={classes.column}>
            <Grid container direction="column">
              {getTimeNumbers(24).map(el => (
                <Grid item key={el} className={classes.item}>
                  {el}
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item className={classes.column}>
            <Grid container direction="column">
              {getTimeNumbers(60).map(el => (
                <Grid item key={el} className={classes.item}>
                  {el}
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item className={classes.column}>
            <Grid container direction="column">
              {getTimeNumbers(60).map(el => (
                <Grid item key={el} className={classes.item}>
                  {el}
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
