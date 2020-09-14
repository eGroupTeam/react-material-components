import React, { FC, ReactNode, useState } from 'react';
import warning from 'warning';
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import FormLabel, { FormLabelProps } from '@material-ui/core/FormLabel';
import FormGroup, { FormGroupProps } from '@material-ui/core/FormGroup';
import FormHelperText, {
  FormHelperTextProps,
} from '@material-ui/core/FormHelperText';
import CheckboxInput, { CheckboxInputProps } from '../CheckboxInput';

export interface Value extends Record<string, any> {
  checked: boolean;
  text?: string;
}

export interface CheckboxInputGroupProps
  extends Omit<FormControlProps, 'onChange'> {
  /**
   * The value of this group.
   */
  value?: Value;
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
   * Callback fired when the state is changed.
   */
  onChange?: (value: Value | any, name: string) => void;
  /**
   * Callback fired when the checkbox state is changed.
   */
  onCheckboxChange?: (
    value: Value | any,
    name: string,
    checked: boolean
  ) => void;
  /**
   * Callback fired when the input state is changed.
   */
  onInputChange?: (value: Value | any, name: string, text: string) => void;
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
    value: valueProp,
    onChange,
    onCheckboxChange,
    onInputChange,
    ...other
  } = props;
  const [value, setValue] = useState(valueProp ?? {});

  warning(
    children === undefined,
    'CheckboxInputGroup should not has children please use `options` only!'
  );

  const handleChange = (nextValue: any | Value, name: string) => {
    if (onChange) {
      onChange(nextValue, name);
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    const newValue = {
      ...value,
      [name]: {
        ...value[name],
        checked,
      },
    } as Value;
    setValue(newValue);
    if (onCheckboxChange) {
      onCheckboxChange(newValue, name, checked);
    }
    handleChange(newValue, name);
  };

  const handleInputChange = (name: string, text: string) => {
    const newValue = {
      ...value,
      [name]: {
        ...value[name],
        text,
      },
    } as Value;
    setValue(newValue);
    if (onInputChange) {
      onInputChange(newValue, name, text);
    }
    handleChange(newValue, name);
  };

  return (
    <FormControl {...other}>
      <FormLabel {...MuiFormLabelProps}>{label}</FormLabel>
      <FormGroup {...MuiFormGroupProps}>
        {options.map((option) => {
          const { name = '' } = option;
          return (
            <CheckboxInput
              key={option.name}
              name={name}
              checked={value[name]?.checked}
              MuiInputProps={{
                onChange: (e) => handleInputChange(name, e.target.value),
                value: value[name]?.text,
              }}
              onChange={(e, checked) => handleCheckboxChange(name, checked)}
              {...option}
            />
          );
        })}
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
