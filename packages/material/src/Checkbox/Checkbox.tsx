import React, { forwardRef } from 'react';
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

const Checkbox = forwardRef<unknown, CheckboxProps>((props, ref) => {
  const { MuiCheckboxProps, ...other } = props;
  return (
    <FormControlLabel
      ref={ref}
      control={<MuiCheckbox {...MuiCheckboxProps} />}
      {...other}
    />
  );
});

export default Checkbox;
