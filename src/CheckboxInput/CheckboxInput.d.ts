import * as React from 'react';
import { InputProps as MuiInputProps } from '@material-ui/core/Input'
import { CheckboxProps } from '../Checkbox'

export interface CheckboxInputProps extends CheckboxProps {
  MuiInputProps: MuiInputProps,
  toggleInput: boolean
}

declare const CheckboxInput: React.ComponentType<CheckboxInputProps>;

export default CheckboxInput;