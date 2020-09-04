import React, { FC, ReactNode } from 'react';
import {
  FormControlLabel,
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps
} from '@material-ui/core';

export interface CheckboxProps extends MuiCheckboxProps {
  /**
   * The text to be used in an enclosing label element.
   */
  label?: ReactNode;
  /**
   * The position of the label.
   */
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

const Checkbox: FC<CheckboxProps> = ({ label, ...other }) => {
  return (
    <FormControlLabel control={<MuiCheckbox {...other} />} label={label} />
  );
};

export default Checkbox;
