import React, { FC } from 'react';

import RadioInputGroup, {
  RadioInputGroupProps
} from '@e-group/material/RadioInputGroup';
import { RadioInputProps } from '@e-group/material/RadioInput';
import { FieldProps } from 'formik';
import useFieldStatus from '../utils/useFieldStatus';

export interface RadioInputGroupFieldProps
  extends FieldProps,
    RadioInputGroupProps {}

// Code below is refer to https://github.com/erikras/redux-form/issues/1037
const RadioInputGroupField: FC<RadioInputGroupFieldProps> = props => {
  const {
    field: { name, value },
    form: { setFieldValue },
    options,
    error: errorProp,
    helperText,
    disabled: disabledProp,
    ...other
  } = props;
  const { fieldError, showError, disabled } = useFieldStatus(
    props.field,
    props.form,
    disabledProp
  );

  const handleChange: RadioInputGroupProps['onChange'] = e => {
    setFieldValue(name, {
      value: e.target.value
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFieldValue(name, {
      ...value,
      text: e.target.value
    });
  };

  const nextOptions = options.map(
    ({ value: radioValue, MuiInputProps, ...otherOption }) => ({
        value: radioValue,
        checked: radioValue === value?.value ?? false,
        MuiInputProps: {
          ...MuiInputProps,
          onChange: handleInputChange,
          value: value?.text ?? ''
        },
        ...otherOption
      } as RadioInputProps)
  );

  return (
    <RadioInputGroup
      onChange={handleChange}
      options={nextOptions}
      error={showError}
      disabled={disabled}
      helperText={showError ? fieldError : helperText}
      {...other}
    />
  );
};

export default RadioInputGroupField;
