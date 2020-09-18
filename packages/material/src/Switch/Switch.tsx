import React, { FC, ReactNode } from 'react';
import {
  FormControlLabel,
  Switch as MuiSwitch,
  FormControlLabelProps,
  SwitchProps as MuiSwitchProps,
} from '@material-ui/core';

export interface SwitchProps extends MuiSwitchProps {
  /**
   * The text to be used in an enclosing label element.
   */
  label?: ReactNode;
  /**
   * The position of the label.
   */
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: FormControlLabelProps['classes'];
}

const Switch: FC<SwitchProps> = ({
  label,
  classes,
  className,
  style,
  ...other
}) => (
  <FormControlLabel
    control={<MuiSwitch {...other} />}
    classes={classes}
    className={className}
    style={style}
    label={label}
  />
);

export default Switch;
