import React, { FC } from 'react';
import TextLoading, { TextLoadingProps } from '@e-group/material/TextLoading';
import { FieldProps } from 'formik';

export interface TextLoadingFieldProps extends FieldProps, TextLoadingProps {}

const TextLoadingField: FC<TextLoadingFieldProps> = props => {
  const {
    field: { name },
    form: { touched, errors, isValid, setFieldValue },
    helperText,
    ...other
  } = props;
  const error = errors[name];
  const isError = touched && !isValid;

  const handleMultipleSelectOnChange = (e: any) => {
    setFieldValue(name, e.target.value);
  };

  const getField = () => {
    const { field, select, SelectProps } = props;
    if (select && SelectProps && SelectProps.multiple) {
      return {
        ...field,
        value: field.value,
        onChange: handleMultipleSelectOnChange
      };
    }
    return field;
  };

  return (
    <TextLoading
      {...other}
      {...getField()}
      helperText={isError ? error : helperText}
      error={isError}
    />
  );
};

export default TextLoadingField;
