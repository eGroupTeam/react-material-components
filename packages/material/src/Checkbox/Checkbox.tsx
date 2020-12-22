import React, { FC } from 'react';
import {
  FormControlLabel,
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabelProps,
} from '@material-ui/core';

export interface CheckboxProps extends Omit<FormControlLabelProps, 'control'> {
  /**
   * Mui `Checkbox` props
   */
  MuiCheckboxProps?: MuiCheckboxProps;
}

const Checkbox: FC<CheckboxProps> = ({ MuiCheckboxProps, ...other }) => (
  <FormControlLabel
    control={<MuiCheckbox {...MuiCheckboxProps} />}
    {...other}
  />
);

export default Checkbox;
