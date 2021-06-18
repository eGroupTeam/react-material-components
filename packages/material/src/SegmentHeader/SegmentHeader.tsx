import React, { forwardRef } from 'react';
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

const SegmentHeader = forwardRef<
  HTMLDivElement,
  SegmentHeaderProps & WithStyles<typeof styles>
>((props, ref) => {
  const { className, classes, ...other } = props;
  // igonre type error due to this issue
  // https://github.com/mui-org/material-ui/issues/17010
  // @ts-ignore
  return <Box ref={ref} className={clsx(className, classes.root)} {...other} />;
});

export default withStyles(styles)(SegmentHeader);
