import React, { FC, Fragment } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import useControlled from '../utils/useControlled';

import PropTypes from 'prop-types';
import Input, { InputProps } from '@material-ui/core/Input';
import Checkbox, { CheckboxProps } from '../Checkbox';

const StyledInput = withStyles({
  formControl: {
    'label + &': {
      marginTop: 0
    }
  }
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

const CheckboxInput: FC<CheckboxInputProps> = ({
  checked: checkedProp,
  defaultChecked,
  onChange,
  MuiInputProps,
  toggleInput,
  ...other
}) => {
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: 'CheckboxInput'
  });

  const handleChange: CheckboxProps['onChange'] = (event, checked) => {
    setCheckedState(checked);

    if (onChange) {
      onChange(event, checked);
    }
  };

  if (toggleInput) {
    return (
      <Fragment>
        <Checkbox checked={checked} onChange={handleChange} {...other} />
        {checked && <StyledInput {...MuiInputProps} />}
      </Fragment>
    );
  }

  return <Checkbox checked={checked} onChange={handleChange} {...other} />;
};

export default CheckboxInput;
