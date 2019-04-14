import React from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';

import Checkbox from '../Checkbox';

const CheckboxField = ({
  input: { value, ...otherInput },
  meta,
  MuiCheckboxProps,
  ...other
}) => {
  return (
    <Checkbox
      MuiCheckboxProps={MuiCheckboxProps}
      checked={value}
      {...otherInput}
      {...other}
    />
  );
};

CheckboxField.propTypes = {
  // redux form props
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  // customize props
  MuiCheckboxProps: PropTypes.object
};

export default CheckboxField;
