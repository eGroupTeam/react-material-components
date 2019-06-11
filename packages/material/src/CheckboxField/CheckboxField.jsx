import React from 'react';
import PropTypes from 'prop-types';

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
  /**
   * redux from props
   */
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  /**
   * Mui `Checkbox` props
   */
  MuiCheckboxProps: PropTypes.object
};

export default CheckboxField;
