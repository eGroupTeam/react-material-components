import React from 'react';
import PropTypes from 'prop-types';
import { fromJS, isImmutable } from '@e-group/immutable';

import RadioInputGroup from '@e-group/material/RadioInputGroup';

// Code below is refer to https://github.com/erikras/redux-form/issues/1037
const RadioInputGroupField = ({
  input: { value, onChange },
  meta: { touched, invalid, error },
  options,
  error: errorProp,
  helperText,
  ...other
}) => {
  const valueIsImmutable = isImmutable(value);
  const isError = touched && invalid;

  const handleChange = (e) => {
    onChange(
      fromJS({
        value: e.target.value,
      })
    );
  };

  const handleInputChange = (e, name) => {
    if (valueIsImmutable) {
      onChange(value.set('text', e.target.value));
    } else {
      onChange(
        fromJS({
          text: e.target.value,
        })
      );
    }
  };

  const nextOptions = options.map(
    ({ value: radioValue, MuiInputProps, ...otherOption }) => ({
        value: radioValue,
        checked: valueIsImmutable ? radioValue === value.get('value') : false,
        MuiInputProps: {
          ...MuiInputProps,
          onChange: handleInputChange,
          value: valueIsImmutable ? value.get('text', '') : '',
        },
        ...otherOption,
      })
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

RadioInputGroupField.propTypes = {
  /**
   * redux from props
   */
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default RadioInputGroupField;
