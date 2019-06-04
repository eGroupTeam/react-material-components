import * as React from 'react';
import { FormControlProps } from '@material-ui/core/FormControl';
import { FormLabelProps as MuiFormLabelProps } from '@material-ui/core/FormLabel';
import { RadioGroupProps as MuiRadioGroupProps } from '@material-ui/core/RadioGroup';
import { FormHelperTextProps as MuiFormHelperTextProps } from '@material-ui/core/FormHelperText';

export interface RadioGroupProps extends FormControlProps {
  /**
   * The content of the FormLabel.
   */
  label: string;
  /**
   * Options to generate group items.
   */
  options: array
  /**
   * The content of the FormHelperText.
   */
  helperText: string
  /**
   * Mui `FormLabel` Props
   */
  MuiFormLabelProps?: MuiFormLabelProps;
  /**
   * Mui `RadioGroup` Props
   */
  MuiRadioGroupProps?: MuiRadioGroupProps;
  /**
   * Mui `FormHelperText` Props
   */
  MuiFormHelperTextProps: MuiFormHelperTextProps

}

declare const RadioGroup: React.ComponentType<RadioGroupProps>;

export default RadioGroup;