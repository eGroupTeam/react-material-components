import React, { FC } from 'react';
import TextLoading, { TextLoadingProps } from '@e-group/material/TextLoading';
import { FieldProps } from 'formik';

export interface TextLoadingFieldProps extends FieldProps, TextLoadingProps {}

const TextLoadingField: FC<TextLoadingFieldProps> = props => {
  const {
    field,
    form: { touched, errors, isValid },
    helperText,
    ...other
  } = props;
  const error = errors[field.name];
  const isError = touched && !isValid;

  return (
    <TextLoading
      {...other}
      {...field}
      helperText={isError ? error : helperText}
      error={isError}
    />
  );
};

export default TextLoadingField;
