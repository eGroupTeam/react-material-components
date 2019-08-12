import * as React from 'react';
import { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import { CircularProgressProps } from '@material-ui/core/CircularProgress';

export interface ButtonProps {
  /**
   * The button's loading status
   */
  loading?: boolean;
  /**
   * The button's success status
   */
  success?: boolean;
  /**
   * Mui Button Props
   */
  MuiButtonProps?: MuiButtonProps;
  /**
   * Circular Progress Props
   */
  MuiCircularProgressProps?: CircularProgressProps;
}

declare const Button: React.ComponentType<ButtonProps>;

export default Button;
