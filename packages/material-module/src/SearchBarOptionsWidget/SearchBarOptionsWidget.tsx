import React, { Children, FC } from 'react';
import {
  withStyles,
  createStyles,
  Paper,
  Theme,
  WithStyles,
  PaperProps,
} from '@material-ui/core';
import clsx from 'clsx';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: 300,
      [theme.breakpoints.down(500)]: {
        width: 200,
      },
    },
    main: {
      padding: theme.spacing(3),
    },
    footer: {
      padding: theme.spacing(0, 3, 3, 3),
      textAlign: 'right',
    },
  });

const SearchBarOptionsWidget: FC<PaperProps & WithStyles<typeof styles>> = ({
  className,
  classes,
  children,
  ...other
}) => {
  const [main, footer] = Children.toArray(children);

  return (
    <Paper className={clsx(className, classes.root)} {...other}>
      <div className={classes.main}>{main}</div>
      <div className={classes.footer}>{footer}</div>
    </Paper>
  );
};

export default withStyles(styles)(SearchBarOptionsWidget);
