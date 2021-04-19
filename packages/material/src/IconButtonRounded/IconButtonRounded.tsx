import React, { FC } from 'react';
import {
  createStyles,
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
  Theme,
  withStyles,
} from '@material-ui/core';
import { WithStylesOptions } from '@material-ui/core/styles/withStyles';
import { Color } from '../types';

export interface IconButtonRoundedProps
  extends Omit<MuiIconButtonProps, 'color'> {
  color?: Color;
}

const IconButtonRounded: FC<IconButtonRoundedProps> = ({ color, ...other }) => (
  <MuiIconButton {...other} />
);

export default withStyles<
  string,
  WithStylesOptions<Theme>,
  IconButtonRoundedProps
>(
  (theme: Theme) =>
    createStyles({
      root: ({ color = 'default' }) => {
        const isDefault = color === 'default' || color === 'inherit';
        return {
          borderRadius: theme.shape.borderRadius,
          padding: theme.spacing(1),
          backgroundColor: isDefault ? undefined : theme.egPalette[color][1],
          color: isDefault ? theme.egPalette.text[2] : '#ffffff',
          '&:hover': {
            backgroundColor: isDefault ? undefined : theme.egPalette[color][0],
          },
          '&.Mui-disabled': {
            color: isDefault ? undefined : '#ffffff',
            backgroundColor: isDefault ? undefined : theme.egPalette[color][3],
          },
        };
      },
    }),
  { name: 'EgIconButtonRounded' }
)(IconButtonRounded);
