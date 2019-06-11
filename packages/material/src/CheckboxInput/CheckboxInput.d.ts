import * as React from 'react';
import { InputProps as MuiInputProps } from '@material-ui/core/Input'
import { CheckboxProps } from '../Checkbox'

export interface CheckboxInputProps extends CheckboxProps {
  /**
   * Mui `Input` Props
   */
  MuiInputProps: MuiInputProps;
  /**
   * Enable show/hide input if checked/unchecked.
   */
  toggleInput: boolean;
}

declare const CheckboxInput: React.ComponentType<CheckboxInputProps>;

export default CheckboxInput;