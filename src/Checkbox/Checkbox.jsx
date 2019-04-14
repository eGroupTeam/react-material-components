import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiCheckbox from '@material-ui/core/Checkbox';

const Checkbox = ({ control, MuiCheckboxProps, ...other }) => {
  return (
    <FormControlLabel
      control={<MuiCheckbox {...MuiCheckboxProps} />}
      {...other}
    />
  );
};

Checkbox.propTypes = {
  /**
   * Mui Checkbox Props
   */
  MuiCheckboxProps: PropTypes.object
};

export default Checkbox;
