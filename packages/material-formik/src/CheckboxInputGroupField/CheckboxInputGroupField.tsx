import React, { FC } from 'react';

import CheckboxInputGroup, {
  CheckboxInputGroupProps,
  Value
} from '@e-group/material/CheckboxInputGroup';
import { FieldProps } from 'formik';
import useFieldStatus from '../utils/useFieldStatus';

export interface CheckboxInputGroupFieldProps
  extends FieldProps,
    CheckboxInputGroupProps {}
// Code below is refer to https://github.com/erikras/redux-form/issues/1037
const CheckboxInputGroupField: FC<CheckboxInputGroupFieldProps> = props => {
  const {
    field,
    form: { setFieldValue },
    error: errorProp,
    helperText,
    disabled: disabledProp,
    ...other
  } = props;
  const { fieldError, showError, disabled } = useFieldStatus(
    field,
    props.form,
    disabledProp
  );

  const handleChange = (value: {} | Value) => {
    setFieldValue(field.name, value);
  };

  return (
    <CheckboxInputGroup
      error={showError}
      disabled={disabled}
      helperText={showError ? fieldError : helperText}
      {...field}
      onChange={handleChange}
      {...other}
    />
  );
};

export default CheckboxInputGroupField;
