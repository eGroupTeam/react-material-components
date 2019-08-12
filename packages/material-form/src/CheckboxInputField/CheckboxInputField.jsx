import React from 'react';
import PropTypes from 'prop-types';
import { fromJS, isImmutable } from 'immutable';

import CheckboxInput from '@e-group/material/CheckboxInput';

/**
 * A component with Input Field when it checked
 */
const CheckboxInputField = ({
  input,
  meta,
  onChange: onChangeProp,
  checked: checkedProp,
  MuiInputProps,
  ...other
}) => {
  const valueIsImmutable = isImmutable(input.value);
  const { onChange, value, ...otherMuiInputProps } = MuiInputProps || {};

  const handleChange = e => {
    if (valueIsImmutable) {
      input.onChange(input.value.set('checked', e.target.checked));
    } else {
      input.onChange(
        fromJS({
          checked: e.target.checked
        })
      );
    }
  };

  const handleInputChange = e => {
    if (valueIsImmutable) {
      input.onChange(input.value.set('text', e.target.value));
    } else {
      input.onChange(
        fromJS({
          text: e.target.value
        })
      );
    }
  };

  return (
    <CheckboxInput
      onChange={handleChange}
      checked={valueIsImmutable ? input.value.get('checked', false) : false}
      MuiInputProps={{
        onChange: handleInputChange,
        value: valueIsImmutable ? input.value.get('text', '') : '',
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
