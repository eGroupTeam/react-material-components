import React, { FC } from 'react';
import {
  withStyles,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import { Color } from '../types';

export interface ButtonBaseProps extends Omit<MuiButtonProps, 'color'> {
  rounded?: boolean;
  color?: Color;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0.8, 2.5),
    },
    rounded: {
      borderRadius: 25,
    },
    color: ({ color }: ButtonBaseProps) => {
      if (!color || color === 'default' || color === 'inherit') return {};
      return {
        color: theme.egPalette[color][1],

        '&.Mui-disabled': {
          color: theme.egPalette[color][4],
        },

        '&.MuiButton-outlined': {
          borderColor: theme.egPalette[color][1],
        },
        '&.MuiButton-outlined.Mui-disabled': {
          color: theme.egPalette[color][4],
          borderColor: theme.egPalette[color][4],
        },

        '&.MuiButton-contained': {
          color: theme.palette.common.white,
          backgroundColor: theme.egPalette[color][1],
        },
        '&.MuiButton-contained.Mui-disabled': {
          color: theme.palette.common.white,
          backgroundColor: theme.egPalette[color][4],
        },
      };
    },
  });

const ButtonBase: FC<ButtonBaseProps & WithStyles<typeof styles>> = ({
  className,
  classes,
  color,
  rounded,
  ...other
}) => (
  <MuiButton
    className={clsx(
      classes.root,
      {
        [classes.color]: color !== 'default' && color !== 'inherit',
        [classes.rounded]: rounded,
      },
      className
    )}
    {...other}
  />
);

export default withStyles(styles, { name: 'EgButtonBase' })(ButtonBase);
