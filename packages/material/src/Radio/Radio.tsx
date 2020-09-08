import React, { FC, ReactNode } from 'react';
import {
  FormControlLabel,
  Radio as MuiRadio,
  RadioProps as MuiRadioProps,
  FormControlLabelProps
} from '@material-ui/core';

export interface RadioProps extends MuiRadioProps {
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

const Radio: FC<RadioProps> = ({
  label,
  classes,
  className,
  style,
  ...other
}) => (
  <FormControlLabel
    control={<MuiRadio {...other} />}
    classes={classes}
    className={className}
    style={style}
    label={label}
  />
);

export default Radio;
