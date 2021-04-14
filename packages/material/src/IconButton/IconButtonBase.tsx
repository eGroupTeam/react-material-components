import React, { FC } from 'react';
import {
  createStyles,
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
  Theme,
  withStyles,
} from '@material-ui/core';
import { WithStylesOptions } from '@material-ui/core/styles/withStyles';

export type Color = 'success' | 'warning' | 'info' | 'error';

export interface IconButtonProps extends Omit<MuiIconButtonProps, 'color'> {
  color: Color;
}

const IconButtonBase: FC<IconButtonProps> = ({ color, ...other }) => (
  <MuiIconButton {...other} />
);

export default withStyles<string, WithStylesOptions<Theme>, IconButtonProps>(
  (theme: Theme) =>
    createStyles({
      root: {
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1),
        backgroundColor: (props) => theme.egPalette[props.color][1],
        '& .MuiSvgIcon-root': {
          color: 'white',
        },
        '&:hover': {
          backgroundColor: (props) => theme.egPalette[props.color][3],
        },
        '&.Mui-disabled': {
          backgroundColor: (props) => theme.egPalette[props.color][4],
        },
      },
    })
)(IconButtonBase);
