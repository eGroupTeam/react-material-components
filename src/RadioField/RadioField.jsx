import React from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';

import Radio from '../Radio';

const RadioField = ({
  radioValue,
  input: { value, ...otherInput },
  meta,
  MuiRadioProps,
  ...other
}) => {
  return (
    <Radio
      MuiRadioProps={MuiRadioProps}
      value={radioValue}
      checked={radioValue === value}
      {...otherInput}
      {...other}
    />
  );
};

RadioField.propTypes = {
  // redux form props
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  // customize props
  MuiRadioProps: PropTypes.object
};

export default RadioField;
