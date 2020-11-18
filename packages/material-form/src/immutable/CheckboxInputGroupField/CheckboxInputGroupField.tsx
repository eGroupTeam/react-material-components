import React, { FC, ChangeEvent } from 'react';
import { fromJS, isImmutable } from '@e-group/immutable';

import CheckboxInputGroup, {
  CheckboxInputGroupProps,
} from '@e-group/material/CheckboxInputGroup';
import { WrappedFieldProps } from 'redux-form';

export interface CheckboxInputGroupFieldProps
  extends WrappedFieldProps,
    CheckboxInputGroupProps {}

// Code below is refer to https://github.com/erikras/redux-form/issues/1037
const CheckboxInputGroupField: FC<CheckboxInputGroupFieldProps> = ({
  input,
  meta: { touched, invalid, error },
  options,
  error: errorProp,
  helperText,
  ...other
}) => {
  const valueIsImmutable = isImmutable(input.value);
  const isError = touched && invalid;

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    if (valueIsImmutable) {
      input.onChange(input.value.setIn([name, 'checked'], e.target.checked));
    } else {
      input.onChange(
        fromJS({
          [name]: {
            checked: e.target.checked,
          },
        })
      );
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    if (valueIsImmutable) {
      input.onChange(input.value.setIn([name, 'text'], e.target.value));
    } else {
      input.onChange(
        fromJS({
          [name]: {
            text: e.target.value,
          },
        })
      );
    }
  };

  const nextOptions = options.map(
    ({ onChange, checked, MuiInputProps, name = '', ...otherOption }) => {
      return {
        name,
        onChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e, name),
        checked: valueIsImmutable
          ? input.value.getIn([name, 'checked'], false)
          : false,
        MuiInputProps: {
          ...MuiInputProps,
          onChange: (e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e, name),
          value: valueIsImmutable ? input.value.getIn([name, 'text'], '') : '',
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
