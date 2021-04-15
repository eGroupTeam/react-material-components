import React, { FC } from 'react';
import {
  createStyles,
  fade,
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
  Theme,
  withStyles,
} from '@material-ui/core';
import { WithStylesOptions } from '@material-ui/core/styles/withStyles';
import { Color } from '../types';

export interface IconButtonBaseProps extends Omit<MuiIconButtonProps, 'color'> {
  color?: Color;
}

const IconButtonBase: FC<IconButtonBaseProps> = ({ color, ...other }) => (
  <MuiIconButton {...other} />
);

export default withStyles<
  string,
  WithStylesOptions<Theme>,
  IconButtonBaseProps
>(
  (theme: Theme) =>
    createStyles({
      root: ({ color = 'default' }) => {
        const isDefault = color === 'default' || color === 'inherit';
        return {
          color: isDefault ? undefined : theme.egPalette[color][1],
          '&:hover': {
            backgroundColor: isDefault
              ? undefined
              : fade(
                  theme.egPalette[color][1],
                  theme.palette.action.hoverOpacity
                ),
          },
          '&.Mui-disabled': {
            color: isDefault ? undefined : theme.egPalette[color][3],
          },
        };
      },
    }),
  { name: 'EgIconButtonBase' }
)(IconButtonBase);
