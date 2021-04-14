import React, { FC } from 'react';
import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from '@material-ui/core';
import IconButtonBase, { Color } from './IconButtonBase';

export interface IconButtonProps extends Omit<MuiIconButtonProps, 'color'> {
  color: Color | MuiIconButtonProps['color'];
}

const IconButton: FC<IconButtonProps> = ({ color, ...others }) => {
  if (
    color === 'success' ||
    color === 'warning' ||
    color === 'info' ||
    color === 'error'
  ) {
    return <IconButtonBase color={color} {...others} />;
  }
  return <MuiIconButton color={color} {...others} />;
};

export default IconButton;
