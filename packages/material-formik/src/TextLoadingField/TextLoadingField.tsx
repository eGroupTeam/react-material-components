import React, { FC } from 'react';
import TextLoading, { TextLoadingProps } from '@e-group/material/TextLoading';
import { FieldProps } from 'formik';
import useField from '../utils/useField';

export interface TextLoadingFieldProps extends FieldProps, TextLoadingProps {}

const TextLoadingField: FC<TextLoadingFieldProps> = props => {
  const { field, form, disabled: disabledProp, helperText, ...other } = props;
  const { fieldError, showError, disabled } = useField(
    field,
    form,
    disabledProp
  );

  return (
    <TextLoading
      disabled={disabled}
      helperText={showError ? fieldError : helperText}
      error={showError}
      {...field}
      {...other}
    />
  );
};

export default TextLoadingField;
