import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@e-group/material/Checkbox';

const CheckboxField = ({ input: { value, ...otherInput }, meta, ...other }) => <Checkbox checked={Boolean(value)} {...otherInput} {...other} />;

CheckboxField.propTypes = {
  /**
   * redux from props
   */
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default CheckboxField;
