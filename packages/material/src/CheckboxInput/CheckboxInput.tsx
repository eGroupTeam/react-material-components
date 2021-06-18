import React, { forwardRef } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import Input, { InputProps } from '@material-ui/core/Input';
import useControlled from '@e-group/hooks/useControlled';
import Checkbox, { CheckboxProps } from '../Checkbox';

const StyledInput = withStyles({
  formControl: {
    'label + &': {
      marginTop: 0,
    },
  },
})(Input);

export interface CheckboxInputProps extends CheckboxProps {
  /**
   * Mui `Input` Props
   */
  MuiInputProps?: InputProps;
  /**
   * Enable show/hide input if checked/unchecked.
   */
  toggleInput?: boolean;
  /**
   * @ignore
   */
  defaultChecked?: boolean;
}

const CheckboxInput = forwardRef<unknown, CheckboxInputProps>((props, ref) => {
  const {
    checked: checkedProp,
    defaultChecked,
    onChange,
    MuiInputProps,
    toggleInput,
    ...other
  } = props;
  const [checkedState, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
  });

  const handleChange: CheckboxProps['onChange'] = (event, checked) => {
    setCheckedState(checked);

    if (onChange) {
      onChange(event, checked);
    }
  };

  if (toggleInput) {
    return (
      <>
        <Checkbox
          ref={ref}
          checked={checkedState}
          onChange={handleChange}
          {...other}
        />
        {checkedState && <StyledInput {...MuiInputProps} />}
      </>
    );
  }

  return (
    <Checkbox
      ref={ref}
      checked={checkedState}
      onChange={handleChange}
      {...other}
    />
  );
});

export default CheckboxInput;
