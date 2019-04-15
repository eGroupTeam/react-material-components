import * as React from 'react';
import { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import { CircularProgressProps } from '@material-ui/core/CircularProgress';

export interface ButtonProps {
  loading: boolean;
  success: boolean;
  MuiButtonProps: MuiButtonProps;
  CircularProgressProps: CircularProgressProps;
}

declare const Button: React.ComponentType<ButtonProps>;

export default Button;