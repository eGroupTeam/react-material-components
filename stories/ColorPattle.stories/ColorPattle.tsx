import React, { FC, HTMLAttributes } from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core';
import clsx from 'clsx';
import { Color } from '@e-group/material/types';

export interface ColorPattleProps extends HTMLAttributes<HTMLDivElement> {
  color?: Color;
  shape?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: ({ color = 'text', shape = 1 }: ColorPattleProps) =>
        theme.egPalette[color][shape],
      borderRadius: theme.shape.borderRadius,
      border: ({ color = 'text', shape = 1 }) =>
        `2px solid ${
          shape === 6 && color !== 'text'
            ? theme.egPalette[color][1]
            : 'transparent'
        }`,
    },
  });

const ColorPattle: FC<ColorPattleProps & WithStyles<typeof styles>> = ({
  className,
  classes,
  ...other
}) => {
  return <div className={clsx(className, classes.root)} {...other} />;
};

export default withStyles(styles)(ColorPattle);
