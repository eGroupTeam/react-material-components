import * as React from 'react';
import { ButtonProps as MUIButtonProps } from '@material-ui/core/Button';

export interface ButtonProps extends MUIButtonProps {
  loading: boolean; 
  success: boolean; 
  fullWidth: boolean; 
}

declare const Button: React.ComponentType<ButtonProps>;

export default Button;