import React, { FC } from 'react';
import {
  FormControlLabel,
  FormControlLabelProps,
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
} from '@material-ui/core';

export interface CheckboxProps extends Omit<FormControlLabelProps, 'control'> {
  /**
   * Mui `Checkbox` Props
   */
  MuiCheckboxProps?: MuiCheckboxProps;
}

const Checkbox: FC<CheckboxProps> = ({ MuiCheckboxProps, ...other }) => {
  return (
    <FormControlLabel
      control={<MuiCheckbox {...MuiCheckboxProps} />}
      {...other}
    />
  );
};

export default Checkbox;
