import React from 'react';
import PropTypes from 'prop-types';

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
  const isError = touched && invalid;

  const handleChange = e => {
    onChange({
      value: e.target.value
    });
  };

  const handleInputChange = (e, name) => {
    onChange({
      ...value,
      text: e.target.value
    });
  };

  const hasValue = typeof value !== 'undefined';
  const hasRadioValue = hasValue && typeof value.value !== 'undefined';
  const hasText = hasValue && typeof value.text !== 'undefined';

  const nextOptions = options.map(
    ({ value: radioValue, MuiInputProps, ...otherOption }) => ({
        value: radioValue,
        checked: hasRadioValue ? radioValue === value.value : false,
        MuiInputProps: {
          ...MuiInputProps,
          onChange: handleInputChange,
          value: hasText ? value.text : ''
        },
        ...otherOption
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
  meta: PropTypes.object.isRequired
};

export default RadioInputGroupField;
