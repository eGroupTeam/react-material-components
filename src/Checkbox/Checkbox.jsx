import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MUICheckbox from '@material-ui/core/Checkbox';

const Checkbox = ({ control, MUICheckboxProps, ...other }) => {
  return (
    <FormControlLabel
      control={<MUICheckbox {...MUICheckboxProps} />}
      {...other}
    />
  );
};

Checkbox.propTypes = {
  /**
   * MUI Checkbox Props
   */
  MUICheckboxProps: PropTypes.object
};

export default Checkbox;
