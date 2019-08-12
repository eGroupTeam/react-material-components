import * as React from 'react';
import { CheckboxProps as MuiCheckboxProps } from '@material-ui/core/Checkbox';
import { FormControlLabelProps } from '@material-ui/core/FormControlLabel';

export interface CheckboxProps extends FormControlLabelProps {
  /**
   * Mui `Checkbox` Props
   */
  MuiCheckboxProps?: MuiCheckboxProps;
}

declare const Checkbox: React.ComponentType<CheckboxProps>;

export default Checkbox;
