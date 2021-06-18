import React, { forwardRef } from 'react';
import {
  createStyles,
  Paper,
  PaperProps,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      boxShadow: (props: SegmentProps) => theme.egShadows[props.elevation ?? 1],
    },
  });

export type SegmentProps = PaperProps;

const Segment = forwardRef<unknown, SegmentProps & WithStyles<typeof styles>>(
  (props, ref) => {
    const { elevation, ...other } = props;
    return <Paper ref={ref} elevation={0} {...other} />;
  }
);

export default withStyles(styles)(Segment);
