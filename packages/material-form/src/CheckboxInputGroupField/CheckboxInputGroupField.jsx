import React from 'react';
import PropTypes from 'prop-types';

import CheckboxInputGroup from '@e-group/material/CheckboxInputGroup';

// Code below is refer to https://github.com/erikras/redux-form/issues/1037
const CheckboxInputGroupField = ({
  input: { value, onChange },
  meta: { touched, invalid, error },
  options,
  error: errorProp,
  helperText,
  ...other
}) => {
  const isError = touched && invalid;

  const handleChange = (e, name) => {
    onChange({
      ...value,
      [name]: {
        ...value[name],
        checked: e.target.checked
      }
    });
  };

  const handleInputChange = (e, name) => {
    onChange({
      ...value,
      [name]: {
        ...value[name],
        text: e.target.value
      }
    });
  };

  const hasValue = typeof value !== 'undefined';

  const nextOptions = options.map(
    ({ onChange, checked, MuiInputProps, name, ...otherOption }) => {
      const hasOptionValue = hasValue && value[name];
      const hasChecked =
        hasOptionValue && typeof value[name].checked !== 'undefined';
      const hasText = hasOptionValue && typeof value[name].text !== 'undefined';
      return {
        name,
        onChange: e => handleChange(e, name),
        checked: hasChecked ? value[name].checked : false,
        MuiInputProps: {
          ...MuiInputProps,
          onChange: e => handleInputChange(e, name),
          value: hasText ? value[name].text : ''
        },
        ...otherOption
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

CheckboxInputGroupField.propTypes = {
  /**
   * redux from props
   */
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default CheckboxInputGroupField;
