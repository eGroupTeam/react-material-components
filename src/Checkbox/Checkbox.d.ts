import * as React from 'react';
import { CheckboxProps as MUICheckboxProps } from '@material-ui/core/Checkbox';
import { FormControlLabelProps } from '@material-ui/core/FormControlLabel';

export interface CheckboxProps extends FormControlLabelProps {
  MUICheckboxProps: MUICheckboxProps
}

declare const Checkbox: React.ComponentType<CheckboxProps>;

export default Checkbox;