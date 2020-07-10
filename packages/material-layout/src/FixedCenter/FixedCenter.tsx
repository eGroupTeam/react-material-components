import React from 'react';

import clsx from 'clsx';

import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      display: 'flex',
      position: 'fixed',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      zIndex: theme.zIndex.modal
    }
  });

export interface FixedCenterProps extends WithStyles<typeof styles> {
  className?: string;
}

const FixedCenter: React.FunctionComponent<FixedCenterProps> = ({
  classes,
  className,
  ...other
}) => {
  return <div className={clsx(classes.root, className)} {...other} />;
};

export default withStyles(styles)(FixedCenter);
