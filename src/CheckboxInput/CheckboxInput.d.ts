import * as React from 'react';
import { InputProps as MUIInputProps } from '@material-ui/core/Input'
import { CheckboxProps } from '../Checkbox'

export interface CheckboxInputProps extends CheckboxProps {
  MUIInputProps: MUIInputProps,
  toggleInput: boolean
}

declare const CheckboxInput: React.ComponentType<CheckboxInputProps>;

export default CheckboxInput;