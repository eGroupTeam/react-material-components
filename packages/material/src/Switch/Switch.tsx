import React, { forwardRef, ReactNode } from 'react';
import { FormControlLabel, FormControlLabelProps } from '@material-ui/core';
import StandardSwitch from './StandardSwitch';
import SquareSwitch from './SquareSwitch';
import { SwitchBaseProps } from './SwitchBase';
import { Color } from '../types';

const variantComponent = {
  standard: StandardSwitch,
  square: SquareSwitch,
};
export interface SwitchProps extends Omit<SwitchBaseProps, 'color'> {
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
   * The variant to use.
   */
  variant?: 'standard' | 'square';
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color?: Exclude<Color, 'inherit'>;
}

const Switch = forwardRef<unknown, SwitchProps>((props, ref) => {
  const {
    label,
    classes,
    className,
    style,
    variant = 'standard',
    labelPlacement,
    ...other
  } = props;

  const SwitchComponent = variantComponent[variant];
  return (
    <FormControlLabel
      ref={ref}
      control={<SwitchComponent {...other} />}
      classes={classes}
      className={className}
      style={style}
      label={label}
      labelPlacement={labelPlacement}
    />
  );
});

export default Switch;
