import React, { FC } from 'react';

import RadioInputGroup, {
  RadioInputGroupProps,
} from '@e-group/material/RadioInputGroup';
import { FieldProps } from 'formik';

export interface RadioInputGroupFieldProps
  extends FieldProps,
    RadioInputGroupProps {}

// Code below is refer to https://github.com/erikras/redux-form/issues/1037
const RadioInputGroupField: FC<RadioInputGroupFieldProps> = ({
  field: { name, value },
  form: { touched, errors, setFieldValue },
  options,
  error: errorProp,
  helperText,
  ...other
}) => {
  const error = errors[name];
  const isError = Boolean(touched && error);

  const handleChange = (e: any) => {
    setFieldValue(name, {
      value: e.target.value,
    });
  };

  const handleInputChange = (e: any) => {
    setFieldValue(name, {
      ...value,
      text: e.target.value,
    });
  };

  const hasValue = typeof value !== 'undefined';
  const hasRadioValue = hasValue && typeof value.value !== 'undefined';
  const hasText = hasValue && typeof value.text !== 'undefined';

  const nextOptions = options.map(
    ({ value: radioValue, MuiInputProps, ...otherOption }) => {
      return {
        value: radioValue,
        checked: hasRadioValue ? radioValue === value.value : false,
        MuiInputProps: {
          ...MuiInputProps,
          onChange: handleInputChange,
          value: hasText ? value.text : '',
        },
        ...otherOption,
      };
    }
  );

  return (
    <RadioInputGroup
      onChange={handleChange}
      options={nextOptions}
      error={isError}
      helperText={isError ? error : helperText}
      {...other}
    />
  );
};

export default RadioInputGroupField;
