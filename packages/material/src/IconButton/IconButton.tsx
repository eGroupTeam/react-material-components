import React, { FC } from 'react';
import { IconButtonProps as MuiIconButtonProps } from '@material-ui/core';
import IconButtonRounded from '../IconButtonRounded';
import IconButtonBase from '../IconButtonBase';
import { Color } from '../types';

const variantComponent = {
  standard: IconButtonBase,
  rounded: IconButtonRounded,
};

export interface IconButtonProps extends Omit<MuiIconButtonProps, 'color'> {
  variant?: 'standard' | 'rounded';
  color?: Color;
}

const IconButton: FC<IconButtonProps> = ({
  variant = 'standard',
  ...others
}) => {
  const IconButtonComponent = variantComponent[variant];
  return <IconButtonComponent {...others} />;
};

export default IconButton;
