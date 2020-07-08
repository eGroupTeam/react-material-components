import React from 'react';

import {
  Grid,
  createStyles,
  Theme,
  withStyles,
  Typography
} from '@material-ui/core';
import { TimeProps } from './DateRangePicker.d';

const getTimeNumbers = (size: number) =>
  Array.from(Array(size).keys()).map(el => (el < 10 ? `0${el}` : `${el}`));

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
      flex: 1
    },
    column: {
      overflow: 'hidden',
      maxHeight: 215,
      width: 56,
      marginTop: 7,

      '&:hover': {
        overflow: 'auto'
      }
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
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container direction="column">
        <div className={classes.header} />
        <Grid item container className={classes.container}>
          <Grid item className={classes.column}>
            <Grid container direction="column">
              {getTimeNumbers(24).map(el => (
                <Grid item key={el} className={classes.item}>
                  <Typography variant="body2">{el}</Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item className={classes.column}>
            <Grid container direction="column">
              {getTimeNumbers(60).map(el => (
                <Grid item key={el} className={classes.item}>
                  <Typography variant="body2">{el}</Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item className={classes.column}>
            <Grid container direction="column">
              {getTimeNumbers(60).map(el => (
                <Grid item key={el} className={classes.item}>
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
