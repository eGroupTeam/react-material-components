import React, { FC } from 'react';
import TextLoading, { TextLoadingProps } from '@e-group/material/TextLoading';
import { FieldProps, getIn } from 'formik';

export interface TextLoadingFieldProps extends FieldProps, TextLoadingProps {}

const TextLoadingField: FC<TextLoadingFieldProps> = props => {
  const {
    field,
    form: { isSubmitting, touched, errors },
    disabled,
    helperText,
    ...other
  } = props;
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  return (
    <TextLoading
      disabled={disabled ?? isSubmitting}
      helperText={showError ? fieldError : helperText}
      error={showError}
      {...field}
      {...other}
    />
  );
};

export default TextLoadingField;
