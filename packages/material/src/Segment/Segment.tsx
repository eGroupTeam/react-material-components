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
      boxShadow: (props: SegmentProps) => theme.egShadows[props.elevation || 0],
    },
  });

export type SegmentProps = PaperProps;

const Segment: FC<SegmentProps & WithStyles<typeof styles>> = (props) => {
  return <Paper variant="outlined" {...props} />;
};

export default withStyles(styles)(Segment);
