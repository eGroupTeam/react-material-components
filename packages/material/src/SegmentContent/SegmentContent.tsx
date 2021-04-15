import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 3),
    },
  });

export type SegmentContentProps = HTMLAttributes<HTMLDivElement>;

const SegmentContent: FC<SegmentContentProps & WithStyles<typeof styles>> = ({
  className,
  classes,
  ...other
}) => {
  return <div className={clsx(className, classes.root)} {...other} />;
};

export default withStyles(styles)(SegmentContent);
