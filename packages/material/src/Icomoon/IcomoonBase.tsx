import React, { FC, HTMLAttributes } from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core';
import clsx from 'clsx';
import { Color } from '../types';

export type FontSize = 'default' | 'large' | 'small' | 'inherit' | number;
export interface IcomoonBaseProps extends HTMLAttributes<HTMLDivElement> {
  color?: Color;
  type?: string;
  fontSize?: FontSize;
}

const getFontSize = (fontSize: FontSize) => {
  switch (fontSize) {
    case 'default':
      return 32;
    case 'large':
      return 40;
    case 'small':
      return 25;
    case 'inherit':
      return 'inherit';
    default:
      return fontSize;
  }
};

const styles = (theme: Theme) =>
  createStyles({
    root: ({ color = 'default', fontSize = 'default' }: IcomoonBaseProps) => {
      const isDefault = color === 'default' || color === 'inherit';
      return {
        color: isDefault ? undefined : theme.egPalette[color][1],
        fontSize: getFontSize(fontSize),
      };
    },
  });

const IcomoonBase: FC<IcomoonBaseProps & WithStyles<typeof styles>> = ({
  className,
  classes,
  type,
  ...other
}) => {
  return (
    <span
      className={clsx(className, classes.root, type && `icon-${type}`)}
      {...other}
    />
  );
};

export default withStyles(styles, { name: 'EgIcomoonBase' })(IcomoonBase);
