import React, { FC } from 'react';

import CheckboxInputGroup, {
  CheckboxInputGroupProps,
} from '@e-group/material/CheckboxInputGroup';
import { FieldProps } from 'formik';

export interface CheckboxInputGroupFieldProps
  extends FieldProps,
    CheckboxInputGroupProps {}
// Code below is refer to https://github.com/erikras/redux-form/issues/1037
const CheckboxInputGroupField: FC<CheckboxInputGroupFieldProps> = (props) => {
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

  const handleChange = (e: any, name: string) => {
    setFieldValue(fieldName, {
      ...value,
      [name]: {
        ...value[name],
        checked: e.target.checked,
      },
    });
  };

  const handleInputChange = (e: any, name: string) => {
    setFieldValue(fieldName, {
      ...value,
      [name]: {
        ...value[name],
        text: e.target.value,
      },
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
        onChange: (e: any) => handleChange(e, name),
        checked: hasChecked ? value[name].checked : false,
        MuiInputProps: {
          ...MuiInputProps,
          onChange: (e: any) => handleInputChange(e, name),
          value: hasText ? value[name].text : '',
        },
        ...otherOption,
      };
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
