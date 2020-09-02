import React, { FC, Fragment } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import useControlled from '../utils/useControlled';

import PropTypes from 'prop-types';
import Input, { InputProps } from '@material-ui/core/Input';
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
    name: 'CheckboxInput',
  });

  const handleChange = (event: any) => {
    const newChecked = event.target.checked;

    setCheckedState(newChecked);

    if (onChange) {
      onChange(event, newChecked);
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

CheckboxInput.propTypes = {
  /**
   * If checked is not null component will be controlled external.
   */
  checked: PropTypes.bool,
  /**
   * If not controlled, use internal state.
   */
  onChange: PropTypes.func,
  /**
   * Mui `Input` Props
   */
  MuiInputProps: PropTypes.object,
  /**
   * @ignore
   */
  defaultChecked: PropTypes.bool,
  /**
   * Enable show/hide input if checked/unchecked.
   */
  toggleInput: PropTypes.bool,
};

export default CheckboxInput;
