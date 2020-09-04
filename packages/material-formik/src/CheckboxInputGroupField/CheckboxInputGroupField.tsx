import React, { FC } from 'react';

import CheckboxInputGroup, {
  CheckboxInputGroupProps,
  Value
} from '@e-group/material/CheckboxInputGroup';
import { FieldProps, getIn } from 'formik';

export interface CheckboxInputGroupFieldProps
  extends FieldProps,
    CheckboxInputGroupProps {}
// Code below is refer to https://github.com/erikras/redux-form/issues/1037
const CheckboxInputGroupField: FC<CheckboxInputGroupFieldProps> = props => {
  const {
    field,
    form: { touched, errors, setFieldValue, isSubmitting },
    error: errorProp,
    helperText,
    disabled,
    ...other
  } = props;
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  const handleChange = (value: {} | Value) => {
    setFieldValue(field.name, value);
  };

  return (
    <CheckboxInputGroup
      error={showError}
      disabled={disabled ?? isSubmitting}
      helperText={showError ? fieldError : helperText}
      {...field}
      onChange={handleChange}
      {...other}
    />
  );
};

export default CheckboxInputGroupField;
