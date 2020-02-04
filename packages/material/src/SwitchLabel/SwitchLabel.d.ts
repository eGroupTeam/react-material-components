import * as React from 'react';
import { SwitchProps } from '@material-ui/core/Switch';
import { FormControlLabelProps } from '@material-ui/core/FormControlLabel';

export interface SwitchLabelProps extends FormControlLabelProps {
  /**
   * Mui `Switch` Props
   */
  MuiSwitchProps?: SwitchProps;
}

declare const SwitchLabel: React.ComponentType<SwitchLabelProps>;

export default SwitchLabel;
