import React, { FC, ReactNode } from 'react';
import warning from 'warning';
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import FormLabel, { FormLabelProps } from '@material-ui/core/FormLabel';
import FormGroup, { FormGroupProps } from '@material-ui/core/FormGroup';
import FormHelperText, {
  FormHelperTextProps,
} from '@material-ui/core/FormHelperText';
import CheckboxInput, { CheckboxInputProps } from '../CheckboxInput';

export interface CheckboxInputGroupProps extends FormControlProps {
  /**
   * The content of the FormLabel.
   */
  label?: string;
  /**
   * Options to generate group items.
   */
  options: CheckboxInputProps[];
  /**
   * The content of the FormHelperText.
   */
  helperText?: ReactNode;
  /**
   * Mui `FormLabel` Props
   */
  MuiFormLabelProps?: FormLabelProps;
  /**
   * Mui `FormGroup` Props
   */
  MuiFormGroupProps?: FormGroupProps;
  /**
   * Mui `FormHelperText` Props
   */
  MuiFormHelperTextProps?: FormHelperTextProps;
}

const CheckboxInputGroup: FC<CheckboxInputGroupProps> = (props) => {
  const {
    label,
    options,
    helperText,
    MuiFormLabelProps,
    MuiFormGroupProps,
    MuiFormHelperTextProps,
    children,
    ...other
  } = props;

  warning(
    children === undefined,
    'CheckboxInputGroup should not has children please use `options` only!'
  );

  return (
    <FormControl {...other}>
      <FormLabel {...MuiFormLabelProps}>{label}</FormLabel>
      <FormGroup {...MuiFormGroupProps}>
        {options.map((option, index) => (
          <CheckboxInput key={index} {...option} />
        ))}
      </FormGroup>
      {helperText && (
        <FormHelperText {...MuiFormHelperTextProps}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CheckboxInputGroup;
