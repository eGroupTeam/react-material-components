import React from 'react';
import PropTypes from 'prop-types';
import { fromJS, isImmutable } from 'immutable';

import CheckboxInput from '@e-group/material/CheckboxInput';

/**
 * A component with Input Field when it checked
 */
const CheckboxInputField = ({
  input: { value, onChange },
  meta,
  onChange: onChangeProp,
  checked: checkedProp,
  MuiInputProps,
  ...other
}) => {
  const valueIsImmutable = isImmutable(value);
  const { onChange: inputOnChange, value: inputValue, ...otherMuiInputProps } =
    MuiInputProps || {};

  const handleChange = e => {
    if (valueIsImmutable) {
      onChange(value.set('checked', e.target.checked));
    } else {
      onChange(
        fromJS({
          checked: e.target.checked
        })
      );
    }
  };

  const handleInputChange = e => {
    if (valueIsImmutable) {
      onChange(value.set('text', e.target.value));
    } else {
      onChange(
        fromJS({
          text: e.target.value
        })
      );
    }
  };

  return (
    <CheckboxInput
      onChange={handleChange}
      checked={valueIsImmutable ? value.get('checked', false) : false}
      MuiInputProps={{
        onChange: handleInputChange,
        value: valueIsImmutable ? value.get('text', '') : '',
        ...otherMuiInputProps
      }}
      {...other}
    />
  );
};

CheckboxInputField.propTypes = {
  /**
   * redux from props
   */
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  /**
   * Mui `Input` props
   */
  MuiInputProps: PropTypes.object
};

export default CheckboxInputField;
