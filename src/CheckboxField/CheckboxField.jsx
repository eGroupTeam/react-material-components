import React from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';

import Checkbox from '../Checkbox';

const CheckboxField = ({ input, meta, MUICheckboxProps, ...other }) => (
  <Checkbox MUICheckboxProps={MUICheckboxProps} {...input} {...other} />
);

CheckboxField.propTypes = {
  // redux form props
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  // customize props
  MUICheckboxProps: PropTypes.object
};

export default CheckboxField;
