import React from 'react';
import PropTypes from 'prop-types';

import Radio from '@e-group/material/Radio';

const RadioField = ({
  radioValue,
  input: { value, ...otherInput },
  meta,
  ...other
}) => (
    <Radio
      value={radioValue}
      checked={radioValue === value}
      {...otherInput}
      {...other}
    />
  );

RadioField.propTypes = {
  /**
   * redux from props
   */
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default RadioField;
