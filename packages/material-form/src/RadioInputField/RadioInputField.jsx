import React from 'react';
import PropTypes from 'prop-types';

import RadioInput from '@e-group/material/RadioInput';

const RadioInputField = ({
  radioValue,
  input: { value, onChange },
  meta,
  MuiInputProps,
  ...other
}) => {
  const { onChange: inputOnChange, value: inputValue, ...otherMuiInputProps } =
    MuiInputProps || {};

  const handleChange = e => {
    onChange({
      ...value,
      value: e.target.value
    });
  };

  const handleInputChange = e => {
    onChange({
      ...value,
      text: e.target.value
    });
  };

  const hasValue = typeof value !== 'undefined';
  const hasRadioValue = hasValue && typeof value.value !== 'undefined';
  const hasText = hasValue && typeof value.text !== 'undefined';

  return (
    <RadioInput
      onChange={handleChange}
      value={radioValue}
      checked={hasRadioValue ? radioValue === value.value : false}
      MuiInputProps={{
        onChange: handleInputChange,
        value: hasText ? value.text : '',
        ...otherMuiInputProps
      }}
      {...other}
    />
  );
};

RadioInputField.propTypes = {
  /**
   * redux from props
   */
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  /**
   * Mui `Radio` props
   */
  MuiRadioProps: PropTypes.object
};

export default RadioInputField;
