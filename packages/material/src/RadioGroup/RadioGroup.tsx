import React, { FC } from 'react';
import warning from 'warning';

import {
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormHelperText,
  FormControlProps,
  FormLabelProps as MuiFormLabelProps,
  RadioGroupProps as MuiRadioGroupProps,
  FormHelperTextProps as MuiFormHelperTextProps,
} from '@material-ui/core';
import Radio from '../Radio';

export interface RadioGroupProps extends FormControlProps {
  /**
   * The content of the FormLabel.
   */
  label?: string;
  /**
   * Options to generate group items.
   */
  options: RadioProps[];
  /**
   * The content of the FormHelperText.
   */
  helperText?: string;
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
  MuiFormHelperTextProps?: MuiFormHelperTextProps;
}

const RadioGroup: FC<RadioGroupProps> = (props) => {
  const {
    label,
    options,
    helperText,
    MuiFormLabelProps,
    MuiRadioGroupProps,
    MuiFormHelperTextProps,
    children,
    ...other
  } = props;

  warning(
    children === undefined,
    'RadioGroup should not has children please use `options` only!'
  );

  return (
    <FormControl {...other}>
      <FormLabel {...MuiFormLabelProps}>{label}</FormLabel>
      <MuiRadioGroup {...MuiRadioGroupProps}>
        {options.map((option) => (
          <Radio {...option} />
        ))}
      </MuiRadioGroup>
      {helperText && (
        <FormHelperText {...MuiFormHelperTextProps}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default RadioGroup;
