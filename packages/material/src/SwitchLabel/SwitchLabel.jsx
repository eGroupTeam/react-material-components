import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const SwitchLabel = ({ control, MuiSwitchProps, ...other }) => (
  <FormControlLabel control={<Switch {...MuiSwitchProps} />} {...other} />
);

SwitchLabel.propTypes = {
  /**
   * Mui `Switch` Props
   */
  MuiSwitchProps: PropTypes.object
};

export default SwitchLabel;
