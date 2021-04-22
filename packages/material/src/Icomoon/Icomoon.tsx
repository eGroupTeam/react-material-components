import React, { FC, HTMLAttributes } from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core';
import clsx from 'clsx';
import { Color } from '../types';

export type FontSize = 'default' | 'large' | 'small' | 'inherit' | number;
export interface IcomoonProps extends HTMLAttributes<HTMLDivElement> {
  color?: Color;
  type?: string;
  fontSize?: FontSize;
}

const getFontSize = (fontSize: FontSize = 'default') => {
  switch (fontSize) {
    case 'default':
      return 24;
    case 'large':
      return 35;
    case 'small':
      return 20;
    case 'inherit':
      return 'inherit';
    default:
      return fontSize;
  }
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      fontSize: ({ fontSize }: IcomoonProps) => getFontSize(fontSize),
    },
    colorPrimary: {
      color: theme.egPalette.primary[1],
    },
    colorSecondary: {
      color: theme.egPalette.secondary[1],
    },
    colorText: {
      color: theme.egPalette.text[1],
    },
    colorWhite: {
      color: theme.palette.common.white,
    },
    colorInfo: {
      color: theme.egPalette.info[1],
    },
    colorSuccess: {
      color: theme.egPalette.success[1],
    },
    colorWarning: {
      color: theme.egPalette.warning[1],
    },
    colorError: {
      color: theme.egPalette.error[1],
    },
    colorInherit: {
      color: 'inherit',
    },
  });

const Icomoon: FC<IcomoonProps & WithStyles<typeof styles>> = ({
  className,
  classes,
  type,
  color = 'default',
  ...other
}) => {
  return (
    <span
      className={clsx(className, classes.root, {
        [`icon-${type}`]: !!type,
        [classes.colorPrimary]: color === 'primary',
        [classes.colorSecondary]: color === 'secondary',
        [classes.colorText]: color === 'text',
        [classes.colorWhite]: color === 'white',
        [classes.colorInfo]: color === 'info',
        [classes.colorSuccess]: color === 'success',
        [classes.colorWarning]: color === 'warning',
        [classes.colorError]: color === 'error',
        [classes.colorInherit]: color === 'inherit',
      })}
      {...other}
    />
  );
};

export default withStyles(styles, { name: 'EgIcomoon' })(Icomoon);
