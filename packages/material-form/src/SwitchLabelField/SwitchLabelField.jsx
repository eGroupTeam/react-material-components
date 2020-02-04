import React from 'react';
import PropTypes from 'prop-types';

import SwitchLabel from '@e-group/material/SwitchLabel';

const SwitchLabelField = props => {
  const {
    switchValue,
    meta,
    input: { onChange, value },
    ...other
  } = props;

  const handleChange = event => {
    if (event.target.checked) {
      onChange(event.target.value);
    } else {
      onChange(null);
    }
  };

  return (
    <SwitchLabel
      value={switchValue}
      checked={Boolean(value)}
      onChange={handleChange}
      {...other}
    />
  );
};

SwitchLabelField.propTypes = {
  /**
   * redux from props
   */
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default SwitchLabelField;
