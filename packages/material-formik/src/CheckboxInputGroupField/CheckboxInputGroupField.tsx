import React, { FC } from 'react';

import CheckboxInputGroup, {
  CheckboxInputGroupProps
} from '@e-group/material/CheckboxInputGroup';
import { FieldProps } from 'formik';
import { CheckboxInputProps } from '@e-group/material/CheckboxInput';

export interface CheckboxInputGroupFieldProps
  extends FieldProps,
    CheckboxInputGroupProps {}
// Code below is refer to https://github.com/erikras/redux-form/issues/1037
const CheckboxInputGroupField: FC<CheckboxInputGroupFieldProps> = props => {
  const {
    field: { value = {}, name: fieldName },
    form: { touched, errors, setFieldValue },
    options,
    error: errorProp,
    helperText,
    ...other
  } = props;
  const error = errors[fieldName];
  const isError = Boolean(touched && error);

  const handleChange = (checked: boolean, name: string) => {
    setFieldValue(fieldName, {
      ...value,
      [name]: {
        ...value[name],
        checked
      }
    });
  };

  const handleInputChange = (text: string, name: string) => {
    setFieldValue(fieldName, {
      ...value,
      [name]: {
        ...value[name],
        text
      }
    });
  };

  const hasValue = typeof value !== 'undefined';

  const nextOptions = options.map(
    ({ onChange, checked, MuiInputProps, name = '', ...otherOption }) => {
      const hasOptionValue = hasValue && value[name];
      const hasChecked =
        hasOptionValue && typeof value[name].checked !== 'undefined';
      const hasText = hasOptionValue && typeof value[name].text !== 'undefined';
      return {
        name,
        onChange: (e, checked) => handleChange(checked, name),
        checked: hasChecked ? value[name].checked : false,
        MuiInputProps: {
          ...MuiInputProps,
          onChange: e => handleInputChange(e.target.value, name),
          value: hasText ? value[name].text : ''
        },
        ...otherOption
      } as CheckboxInputProps;
    }
  );

  return (
    <CheckboxInputGroup
      options={nextOptions}
      error={isError}
      helperText={isError ? error : helperText}
      {...other}
    />
  );
};

export default CheckboxInputGroupField;
