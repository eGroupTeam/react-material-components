import React, { FC } from 'react';
import {
  FormControlLabel,
  Radio as MuiRadio,
  CheckboxProps as MuiRadioProps,
  FormControlLabelProps,
} from '@material-ui/core';

export interface RadioProps extends Omit<FormControlLabelProps, 'control'> {
  /**
   * Mui `Radio` props
   */
  MuiRadioProps?: MuiRadioProps;
}

const Radio: FC<RadioProps> = ({ MuiRadioProps, ...other }) => (
  <FormControlLabel control={<MuiRadio {...MuiRadioProps} />} {...other} />
);

export default Radio;
