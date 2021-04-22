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

const getFontSize = (fontSize: FontSize) => {
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
    root: ({
      color: colorProp = 'default',
      fontSize = 'default',
    }: IcomoonProps) => {
      const isDefault = colorProp === 'default';
      let color: any;
      if (!isDefault) {
        switch (colorProp) {
          case 'inherit':
            color = 'inherit';
            break;
          case 'white':
            color = theme.palette.common.white;
            break;
          default:
            // eslint-disable-next-line prefer-destructuring
            color = theme.egPalette[colorProp][1];
            break;
        }
      }
      return {
        color,
        fontSize: getFontSize(fontSize),
      };
    },
  });

const Icomoon: FC<IcomoonProps & WithStyles<typeof styles>> = ({
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

export default withStyles(styles, { name: 'EgIcomoon' })(Icomoon);
