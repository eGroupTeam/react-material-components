import React, { FC } from 'react';

import RadioInputGroup, {
  RadioInputGroupProps
} from '@e-group/material/RadioInputGroup';
import { RadioInputProps } from '@e-group/material/RadioInput';
import { FieldProps, getIn } from 'formik';

export interface RadioInputGroupFieldProps
  extends FieldProps,
    RadioInputGroupProps {}

// Code below is refer to https://github.com/erikras/redux-form/issues/1037
const RadioInputGroupField: FC<RadioInputGroupFieldProps> = ({
  field: { name, value },
  form: { touched, errors, setFieldValue, isSubmitting },
  options,
  error: errorProp,
  helperText,
  disabled,
  ...other
}) => {
  const fieldError = getIn(errors, name);
  const showError = getIn(touched, name) && !!fieldError;

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
          value: hasText ? value.text : ''
        },
        ...otherOption
      } as RadioInputProps;
    }
  );

  return (
    <RadioInputGroup
      onChange={handleChange}
      options={nextOptions}
      error={showError}
      disabled={disabled ?? isSubmitting}
      helperText={showError ? fieldError : helperText}
      {...other}
    />
  );
};

export default RadioInputGroupField;
