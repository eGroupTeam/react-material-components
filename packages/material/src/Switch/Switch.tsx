import React, { FC, ReactNode } from 'react';
import { FormControlLabel, FormControlLabelProps } from '@material-ui/core';
import StandardSwitch from './StandardSwitch';
import SquareSwitch from './SquareSwitch';
import RoundedSwitch from './RoundedSwitch';
import { SwitchBaseProps } from './SwitchBase';

const variantComponent = {
  standard: StandardSwitch,
  square: SquareSwitch,
  rounded: RoundedSwitch,
};
export interface SwitchProps extends SwitchBaseProps {
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
  variant?: 'standard' | 'rounded' | 'square';
}

const Switch: FC<SwitchProps> = ({
  label,
  classes,
  className,
  style,
  variant = 'standard',
  labelPlacement,
  uncheckedTrack,
  checkedTrack,
  ...other
}) => {
  const SwitchComponent = variantComponent[variant];
  const isStandard = variant === 'standard';
  return (
    <FormControlLabel
      control={
        <SwitchComponent
          checkedTrack={!isStandard ? checkedTrack : undefined}
          uncheckedTrack={!isStandard ? uncheckedTrack : undefined}
          {...other}
        />
      }
      classes={classes}
      className={className}
      style={style}
      label={label}
      labelPlacement={labelPlacement}
    />
  );
};

export default Switch;
