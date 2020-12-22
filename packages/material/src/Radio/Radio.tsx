import React, { FC, ReactNode } from 'react';
import {
  FormControlLabel,
  Radio as MuiRadio,
  RadioProps as MuiRadioProps,
  FormControlLabelProps,
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
  /**
   * Mui `FormControlLabel` props
   */
  MuiFormControlLabelProps?: Omit<
    FormControlLabelProps,
    'control' | 'classes' | 'className' | 'style' | 'label' | 'labelPlacement'
  >;
}

const Radio: FC<RadioProps> = ({
  label,
  labelPlacement,
  classes,
  className,
  style,
  MuiFormControlLabelProps,
  ...other
}) => (
  <FormControlLabel
    control={<MuiRadio {...other} />}
    classes={classes}
    className={className}
    style={style}
    label={label}
    labelPlacement={labelPlacement}
    {...MuiFormControlLabelProps}
  />
);

export default Radio;
