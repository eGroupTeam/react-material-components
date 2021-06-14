import React, { FC } from 'react';
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

const Segment: FC<SegmentProps & WithStyles<typeof styles>> = ({
  elevation,
  ...other
}) => {
  return <Paper elevation={0} {...other} />;
};

export default withStyles(styles)(Segment);
