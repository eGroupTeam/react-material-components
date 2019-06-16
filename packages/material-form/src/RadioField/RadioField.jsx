import React from 'react';
import PropTypes from 'prop-types';

import Radio from '@e-group/material/Radio';

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

export default RadioField;
