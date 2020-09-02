import React, { FC } from 'react';
import {
  FormControlLabel,
  FormControlLabelProps,
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
} from '@material-ui/core';

export interface CheckboxProps extends FormControlLabelProps {
  /**
   * Mui `Checkbox` Props
   */
  MuiCheckboxProps?: MuiCheckboxProps;
}

const Checkbox: FC<CheckboxProps> = ({
  control,
  MuiCheckboxProps,
  ...other
}) => {
  return (
    <FormControlLabel
      control={<MuiCheckbox {...MuiCheckboxProps} />}
      {...other}
    />
  );
};

export default Checkbox;
