import React, { FC } from 'react';
import clsx from 'clsx';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Box,
  BoxProps,
} from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 3),
      borderBottom: 'solid 1px #dbdde3',
    },
  });

export type SegmentHeaderProps = BoxProps;

const SegmentHeader: FC<SegmentHeaderProps & WithStyles<typeof styles>> = ({
  className,
  classes,
  ...other
}) => {
  return <Box className={clsx(className, classes.root)} {...other} />;
};

export default withStyles(styles)(SegmentHeader);
