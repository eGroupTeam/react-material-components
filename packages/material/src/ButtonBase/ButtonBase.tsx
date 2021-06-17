import React, { forwardRef } from 'react';
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

const getStyles = (theme: Theme, color: Color) => ({
  color: theme.egPalette[color][1],

  '&.Mui-disabled': {
    color: theme.egPalette[color][4],
  },
  '&.MuiButton-outlined': {
    borderColor: 'currentColor',
  },
  '&.MuiButton-outlined.Mui-disabled': {
    borderColor: 'currentColor',
  },
  '&.MuiButton-contained': {
    color: theme.palette.common.white,
    backgroundColor: theme.egPalette[color][1],
  },
  '&.MuiButton-contained.Mui-disabled': {
    backgroundColor: theme.egPalette[color][4],
  },
});

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0.8, 2.5),
    },
    rounded: {
      borderRadius: 25,
    },
    colorPrimary: getStyles(theme, 'primary'),
    colorSecondary: getStyles(theme, 'secondary'),
    colorText: getStyles(theme, 'text'),
    colorWhite: {
      color: theme.palette.common.white,
      '&.Mui-disabled': {
        color: theme.palette.grey[600],
      },
      '&.MuiButton-outlined': {
        borderColor: 'currentColor',
      },
      '&.MuiButton-outlined.Mui-disabled': {
        borderColor: theme.palette.grey[600],
      },
      '&.MuiButton-contained': {
        color: theme.egPalette.text[1],
        backgroundColor: theme.palette.common.white,
      },
      '&.MuiButton-contained.Mui-disabled': {
        color: theme.egPalette.text[1],
        backgroundColor: theme.palette.grey[600],
      },
    },
    colorInfo: getStyles(theme, 'info'),
    colorSuccess: getStyles(theme, 'success'),
    colorWarning: getStyles(theme, 'warning'),
    colorError: getStyles(theme, 'error'),
    colorInherit: {
      color: 'inherit',

      '&.Mui-disabled': {
        color: theme.palette.grey[600],
      },
      '&.MuiButton-outlined': {
        borderColor: 'currentColor',
      },
      '&.MuiButton-outlined.Mui-disabled': {
        borderColor: 'currentColor',
      },
      '&.MuiButton-contained': {
        backgroundColor: theme.palette.common.white,
      },
      '&.MuiButton-contained.Mui-disabled': {
        color: theme.palette.grey[600],
        backgroundColor: theme.palette.common.white,
      },
    },
  });

const ButtonBase = forwardRef<
  HTMLButtonElement,
  ButtonBaseProps & WithStyles<typeof styles>
>((props, ref) => {
  const { className, classes, color = 'default', rounded, ...other } = props;

  return (
    <MuiButton
      className={clsx(
        classes.root,
        {
          [classes.rounded]: rounded,
          [classes.colorPrimary]: color === 'primary',
          [classes.colorSecondary]: color === 'secondary',
          [classes.colorText]: color === 'text',
          [classes.colorWhite]: color === 'white',
          [classes.colorInfo]: color === 'info',
          [classes.colorSuccess]: color === 'success',
          [classes.colorWarning]: color === 'warning',
          [classes.colorError]: color === 'error',
          [classes.colorInherit]: color === 'inherit',
        },
        className
      )}
      ref={ref}
      {...other}
    />
  );
});

export default withStyles(styles, { name: 'EgButtonBase' })(ButtonBase);
