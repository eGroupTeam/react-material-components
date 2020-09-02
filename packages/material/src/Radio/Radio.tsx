import React, { FC } from 'react';
import FormControlLabel, {
  FormControlLabelProps,
} from '@material-ui/core/FormControlLabel';
import {
  Radio as MuiRadio,
  RadioProps as MuiRadioProps,
} from '@material-ui/core';

export interface RadioProps extends Omit<FormControlLabelProps, 'control'> {
  /**
   * Mui `Radio` Props
   */
  MuiRadioProps?: MuiRadioProps;
}

const Radio: FC<RadioProps> = ({ MuiRadioProps, ...other }) => (
  <FormControlLabel control={<MuiRadio {...MuiRadioProps} />} {...other} />
);

export default Radio;
