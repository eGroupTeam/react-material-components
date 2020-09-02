import React, { FC } from 'react';
import FormControlLabel, {
  FormControlLabelProps,
} from '@material-ui/core/FormControlLabel';
import {
  Radio as MuiRadio,
  RadioProps as MuiRadioProps,
} from '@material-ui/core';

export interface RadioProps extends FormControlLabelProps {
  /**
   * Mui `Radio` Props
   */
  MuiRadioProps?: MuiRadioProps;
}

const Radio: FC<RadioProps> = ({ control, MuiRadioProps, ...other }) => (
  <FormControlLabel control={<MuiRadio {...MuiRadioProps} />} {...other} />
);

export default Radio;
