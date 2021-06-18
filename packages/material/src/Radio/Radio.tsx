import React, { forwardRef, Key } from 'react';
import {
  FormControlLabel,
  Radio as MuiRadio,
  CheckboxProps as MuiRadioProps,
  FormControlLabelProps,
} from '@material-ui/core';

export interface RadioProps
  extends Omit<FormControlLabelProps, 'control' | 'onChange'> {
  key?: Key;
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: MuiRadioProps['onChange'];
  /**
   * The size of the checkbox.
   * `small` is equivalent to the dense checkbox styling.
   */
  size?: MuiRadioProps['size'];
  /**
   * Mui `Radio` props
   */
  MuiRadioProps?: MuiRadioProps;
}

const Radio = forwardRef<unknown, RadioProps>((props, ref) => {
  const { MuiRadioProps, onChange, ...other } = props;

  return (
    <FormControlLabel
      ref={ref}
      control={<MuiRadio {...MuiRadioProps} onChange={onChange} />}
      {...other}
    />
  );
});

export default Radio;
