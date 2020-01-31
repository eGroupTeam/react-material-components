import * as React from 'react';
import { InputProps as MuiInputProps } from '@material-ui/core/Input';
import { RadioProps } from '../Radio';

export interface RadioInputProps extends RadioProps {
  /**
   * Mui `Input` Props
   */
  MuiInputProps?: MuiInputProps;
  /**
   * Enable show/hide input if checked/unchecked.
   */
  toggleInput?: boolean;
}

declare const RadioInput: React.ComponentType<RadioInputProps>;

export default RadioInput;
