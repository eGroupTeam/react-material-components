import React, { FC } from 'react';
import clsx from 'clsx';
import {
  createStyles,
  fade,
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
  Theme,
  withStyles,
} from '@material-ui/core';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { Color } from '../types';

export interface IconButtonProps extends Omit<MuiIconButtonProps, 'color'> {
  color?: Color;
  variant?: 'standard' | 'rounded';
}

const getStyles = (theme: Theme, color: Color) => ({
  color: theme.egPalette[color][1],
  '&:hover': {
    backgroundColor: fade(
      theme.egPalette[color][1],
      theme.palette.action.hoverOpacity
    ),
  },
  '&.Mui-disabled': {
    color: theme.egPalette[color][4],
  },
});

const getRoundedStyle = (theme: Theme, color: Color) => ({
  backgroundColor: theme.egPalette[color][1],
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.egPalette[color][0],
  },
  '&.Mui-disabled': {
    color: theme.palette.common.white,
    backgroundColor: theme.egPalette[color][4],
  },
});

const styles = (theme: Theme) =>
  createStyles({
    colorPrimary: getStyles(theme, 'primary'),
    colorSecondary: getStyles(theme, 'secondary'),
    colorText: getStyles(theme, 'text'),
    colorInfo: getStyles(theme, 'info'),
    colorWhite: {
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: fade(
          theme.palette.common.white,
          theme.palette.action.hoverOpacity
        ),
      },
      '&.Mui-disabled': {
        color: theme.palette.grey[600],
      },
    },
    colorSuccess: getStyles(theme, 'success'),
    colorWarning: getStyles(theme, 'warning'),
    colorError: getStyles(theme, 'error'),
    colorInherit: {
      color: 'inherit',
      '&:hover': {
        backgroundColor: fade(
          theme.palette.common.white,
          theme.palette.action.hoverOpacity
        ),
      },
      '&.Mui-disabled': {
        color: theme.egPalette.text[4],
      },
    },
    rounded: {
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1),
    },
    colorPrimaryRounded: getRoundedStyle(theme, 'primary'),
    colorSecondaryRounded: getRoundedStyle(theme, 'secondary'),
    colorTextRounded: getRoundedStyle(theme, 'text'),
    colorInfoRounded: getRoundedStyle(theme, 'info'),
    colorWhiteRounded: {
      backgroundColor: theme.palette.common.white,
      color: theme.egPalette.text[1],
      '&:hover': {
        backgroundColor: theme.palette.common.white,
      },
      '&.Mui-disabled': {
        backgroundColor: theme.egPalette.text[4],
      },
    },
    colorSuccessRounded: getRoundedStyle(theme, 'success'),
    colorWarningRounded: getRoundedStyle(theme, 'warning'),
    colorErrorRounded: getRoundedStyle(theme, 'error'),
    colorInheritRounded: {
      backgroundColor: theme.palette.common.white,
      color: 'inherit',
      '&:hover': {
        backgroundColor: theme.palette.common.white,
      },
      '&.Mui-disabled': {
        backgroundColor: theme.egPalette.text[4],
      },
    },
  });

const IconButton: FC<IconButtonProps & WithStyles<typeof styles>> = ({
  className,
  classes: {
    colorPrimary,
    colorSecondary,
    colorText,
    colorInfo,
    colorWhite,
    colorSuccess,
    colorWarning,
    colorError,
    colorInherit,
    rounded,
    colorPrimaryRounded,
    colorSecondaryRounded,
    colorTextRounded,
    colorInfoRounded,
    colorWhiteRounded,
    colorSuccessRounded,
    colorWarningRounded,
    colorErrorRounded,
    colorInheritRounded,
    ...classes
  },
  color = 'default',
  variant = 'standard',
  ...other
}) => {
  const isPrimary = color === 'primary';
  const isSecondary = color === 'secondary';
  const isText = color === 'text';
  const isWhite = color === 'white';
  const isInfo = color === 'info';
  const isSuccess = color === 'success';
  const isWarning = color === 'warning';
  const isError = color === 'error';
  const isInherit = color === 'inherit';
  const isRounded = variant === 'rounded';
  return (
    <MuiIconButton
      className={clsx(
        {
          [colorPrimary]: isPrimary,
          [colorSecondary]: isSecondary,
          [colorText]: isText,
          [colorInfo]: isInfo,
          [colorWhite]: isWhite,
          [colorSuccess]: isSuccess,
          [colorWarning]: isWarning,
          [colorError]: isError,
          [colorInherit]: isInherit,
          [rounded]: isRounded,
          [colorPrimaryRounded]: isRounded && isPrimary,
          [colorSecondaryRounded]: isRounded && isSecondary,
          [colorTextRounded]: isRounded && isText,
          [colorInfoRounded]: isRounded && isInfo,
          [colorWhiteRounded]: isRounded && isWhite,
          [colorSuccessRounded]: isRounded && isSuccess,
          [colorWarningRounded]: isRounded && isWarning,
          [colorErrorRounded]: isRounded && isError,
          [colorInheritRounded]: isRounded && isInherit,
        },
        className
      )}
      classes={classes}
      {...other}
    />
  );
};

export default withStyles(styles, { name: 'EgIconButton' })(IconButton);
