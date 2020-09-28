import React, { FC, HTMLAttributes } from 'react';
import { withStyles, Theme, WithStyles } from '@material-ui/core';
import clsx from 'clsx';

const styles = (theme: Theme) => ({
  root: {
    ...theme.mixins.toolbar,
  },
  dense: {
    minHeight: theme.spacing(6),
  },
});

export interface NavbarBrickProps extends HTMLAttributes<HTMLDivElement> {
  dense?: boolean;
}

const NavbarBrick: FC<NavbarBrickProps & WithStyles<typeof styles>> = (
  props
) => {
  const { classes, className, dense, ...other } = props;

  return (
    <div
      className={clsx(classes.root, dense && classes.dense, className)}
      {...other}
    />
  );
};

export default withStyles(styles)(NavbarBrick);
