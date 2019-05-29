import * as React from 'react';
import { CheckboxInputProps } from '../CheckboxInput'
import { FormControlProps } from '@material-ui/core/FormControl'
import { FormLabelProps } from '@material-ui/core/FormLabel'
import { FormGroupProps } from '@material-ui/core/FormGroup'
import { FormHelperTextProps } from '@material-ui/core/FormHelperText'

export interface CheckboxInputGroupProps extends FormControlProps {
  /**
   * The content of the FormLabel.
   */
  label: string;
  /**
   * Options to generate group items.
   */
  options: Array<CheckboxInputProps>;
  /**
   * The content of the FormHelperText.
   */
  helperText: string;
  /**
   * Mui `FormLabel` Props
   */
  MuiFormLabelProps: FormLabelProps;
  /**
   * Mui `FormGroup` Props
   */
  MuiFormGroupProps: FormGroupProps;
  /**
   * Mui `FormHelperText` Props
   */
  MuiFormHelperTextProps: FormHelperTextProps;
}

declare const CheckboxInputGroup: React.ComponentType<CheckboxInputGroupProps>;

export default CheckboxInputGroup;