import React, { FC, ReactNode } from 'react';

import warning from 'warning';

import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import FormLabel, { FormLabelProps } from '@material-ui/core/FormLabel';
import FormHelperText, {
  FormHelperTextProps,
} from '@material-ui/core/FormHelperText';
import FormGroup, { FormGroupProps } from '@material-ui/core/FormGroup';
import useControlled from '../utils/useControlled';
import RadioInput, { RadioInputProps } from '../RadioInput';
import RadioGroupContext, { RadioGroupContextProps } from './RadioGroupContext';

export interface RadioInputGroupProps
  extends Omit<FormControlProps, 'onChange'> {
  /**
   * The content of the FormLabel.
   */
  label?: string;
  /**
   * Options to generate group items.
   */
  options: RadioInputProps[];
  /**
   * The content of the FormHelperText.
   */
  helperText?: ReactNode;
  /**
   * Value of the selected radio button. The DOM API casts this to a string.
   */
  value?: string;
  /**
   * The name used to reference the value of the control.
   */
  name?: string;
  /**
   * Callback fired when a radio button is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: RadioGroupContextProps['onChange'];
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

const RadioInputGroup: FC<RadioInputGroupProps> = (props) => {
  const {
    label,
    options,
    helperText,
    value: valueProp,
    name,
    onChange,
    MuiFormLabelProps,
    MuiFormGroupProps,
    MuiFormHelperTextProps,
    children,
    ...other
  } = props;

  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: props.defaultValue,
    name: 'RadioInputGroup',
  });

  warning(
    children === undefined,
    'RadioInputGroup should not has children please use `options` only!'
  );

  const handleChange: RadioGroupContextProps['onChange'] = (event, checked) => {
    const newValue = (event.target as HTMLInputElement).value;
    setValue(newValue);

    if (onChange) {
      onChange(event, checked);
    }
  };

  return (
    <FormControl {...other}>
      <FormLabel {...MuiFormLabelProps}>{label}</FormLabel>
      <RadioGroupContext.Provider
        value={{ name, onChange: handleChange, value }}
      >
        <FormGroup {...MuiFormGroupProps}>
          {options.map((option, index) => (
            <RadioInput key={index} {...option} />
          ))}
        </FormGroup>
      </RadioGroupContext.Provider>
      {helperText && (
        <FormHelperText {...MuiFormHelperTextProps}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default RadioInputGroup;
