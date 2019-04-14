import * as React from 'react';
import { CheckboxInputProps } from '../CheckboxInput'
import { FormControlProps } from '@material-ui/core/FormControl'
import { FormLabelProps } from '@material-ui/core/FormLabel'
import { FormGroupProps } from '@material-ui/core/FormGroup'
import { FormHelperTextProps } from '@material-ui/core/FormHelperText'

export interface CheckboxInputGroupProps extends FormControlProps {
  label: string;
  options: Array<CheckboxInputProps>;
  helperText: string;
  showHelperText: boolean;
  MuiFormLabelProps: FormLabelProps;
  MuiFormGroupProps: FormGroupProps;
  MuiFormHelperTextProps: FormHelperTextProps;
}

declare const CheckboxInputGroup: React.ComponentType<CheckboxInputGroupProps>;

export default CheckboxInputGroup;