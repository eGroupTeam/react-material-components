import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiRadio from '@material-ui/core/Radio';

const Radio = ({ control, MuiRadioProps, ...other }) => (
  <FormControlLabel control={<MuiRadio {...MuiRadioProps} />} {...other} />
);

Radio.propTypes = {
  /**
   * Mui `Radio` Props
   */
  MuiRadioProps: PropTypes.object
};

export default Radio;
