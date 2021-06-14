import React, { FC } from 'react';
import clsx from 'clsx';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  BoxProps,
  Box,
} from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 3),

      '& ul': {
        listStyle: 'none',
      },
      '& ul li::before': {
        content: "'\\2022'",
        color: theme.egPalette.primary[1],
        fontWeight: 'bold',
        display: 'inline-block',
        width: '1em',
        marginLeft: '-1em',
      },
    },
  });

export type SegmentContentProps = BoxProps;

const SegmentContent: FC<SegmentContentProps & WithStyles<typeof styles>> = ({
  className,
  classes,
  ...other
}) => {
  return <Box className={clsx(className, classes.root)} {...other} />;
};

export default withStyles(styles)(SegmentContent);
