import React, { FC } from 'react';
import { WrappedFieldProps } from 'redux-form';
import TextLoading, { TextLoadingProps } from '@e-group/material/TextLoading';
import { fromJS } from '@e-group/immutable';

const TextLoadingField: FC<TextLoadingProps & WrappedFieldProps> = (props) => {
  const {
    meta: { touched, error, invalid, asyncValidating },
    error: errorProp,
    helperText,
    InputProps,
    ...other
  } = props;
  const isError = touched && invalid;

  const handleMultipleSelectOnChange = (e) => {
    props.input.onChange(fromJS(e.target.value));
  };

  const getInput = () => {
    const { input, select, SelectProps } = props;
    if (select && SelectProps && SelectProps.multiple) {
      return {
        value: input.value ? input.value.toJS() : [],
        onChange: handleMultipleSelectOnChange,
      };
    }
    return input;
  };

  return (
    <TextLoading
      error={isError}
      loading={asyncValidating}
      helperText={isError ? error : helperText}
      InputProps={InputProps}
      {...getInput()}
      {...other}
    />
  );
};

export default TextLoadingField;
