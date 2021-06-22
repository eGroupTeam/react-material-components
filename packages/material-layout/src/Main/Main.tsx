import React from 'react';
import clsx from 'clsx';
import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(25),
      [theme.breakpoints.down('sm')]: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(20),
      },
    },
  });

export interface MainProps extends WithStyles<typeof styles> {
  className?: string;
}

const Main: React.FC<MainProps> = ({ classes, className, ...other }) => <main className={clsx(classes.root, className)} {...other} />;

export default withStyles(styles)(Main);
