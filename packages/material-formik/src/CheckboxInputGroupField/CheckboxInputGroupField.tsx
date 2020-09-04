import React, { FC } from 'react';

import CheckboxInputGroup, {
  CheckboxInputGroupProps
} from '@e-group/material/CheckboxInputGroup';
import { CheckboxInputProps } from '@e-group/material/CheckboxInput';
import { FieldProps, getIn } from 'formik';

export interface CheckboxInputGroupFieldProps
  extends FieldProps,
    CheckboxInputGroupProps {}
// Code below is refer to https://github.com/erikras/redux-form/issues/1037
const CheckboxInputGroupField: FC<CheckboxInputGroupFieldProps> = props => {
  const {
    field: { value = {}, ...field },
    form: { touched, errors, setFieldValue, isSubmitting },
    options,
    error: errorProp,
    helperText,
    disabled,
    ...other
  } = props;
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  const handleChange = (checked: boolean, name: string) => {
    setFieldValue(field.name, {
      ...value,
      [name]: {
        ...value[name],
        checked
      }
    });
  };

  const handleInputChange = (text: string, name: string) => {
    setFieldValue(field.name, {
      ...value,
      [name]: {
        ...value[name],
        text
      }
    });
  };

  const nextOptions = options.map(
    ({ onChange, checked, MuiInputProps, name = '', ...otherOption }) => {
      return {
        name,
        checked: value[name]?.checked,
        MuiInputProps: {
          ...MuiInputProps,
          onChange: e => handleInputChange(e.target.value, name),
          value: value[name]?.text
        },
        onChange: (e, checked) => handleChange(checked, name),
        ...otherOption
      } as CheckboxInputProps;
    }
  );

  return (
    <CheckboxInputGroup
      options={nextOptions}
      error={showError}
      disabled={disabled ?? isSubmitting}
      helperText={showError ? fieldError : helperText}
      {...other}
    />
  );
};

export default CheckboxInputGroupField;
