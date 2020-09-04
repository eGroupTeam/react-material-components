import React, { FC } from 'react';

import { WrappedFieldProps } from 'redux-form';
import CheckboxInputGroup, {
  CheckboxInputGroupProps,
  Value
} from '@e-group/material/CheckboxInputGroup';

export interface CheckboxInputGroupFieldProps
  extends WrappedFieldProps,
    CheckboxInputGroupProps {}

// Code below is refer to https://github.com/erikras/redux-form/issues/1037
const CheckboxInputGroupField: FC<CheckboxInputGroupFieldProps> = ({
  input: { onChange, name, ...input },
  meta: { touched, invalid, error },
  error: errorProp,
  helperText,
  ...other
}) => {
  const isError = touched && invalid;

  const handleChange = (newValue: {} | Value) => {
    onChange({
      ...input.value,
      ...newValue
    });
  };

  return (
    <CheckboxInputGroup
      error={isError}
      helperText={isError ? error : helperText}
      onChange={handleChange}
      {...other}
    />
  );
};

export default CheckboxInputGroupField;
