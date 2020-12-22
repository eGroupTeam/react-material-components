import React, { FC, ReactNode } from 'react';
import {
  FormControlLabel,
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabelProps,
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

const Checkbox: FC<CheckboxProps> = ({
  label,
  labelPlacement,
  classes,
  className,
  style,
  MuiFormControlLabelProps,
  ...other
}) => {
  return (
    <FormControlLabel
      control={<MuiCheckbox {...other} />}
      classes={classes}
      className={className}
      style={style}
      label={label}
      labelPlacement={labelPlacement}
      {...MuiFormControlLabelProps}
    />
  );
};

export default Checkbox;
