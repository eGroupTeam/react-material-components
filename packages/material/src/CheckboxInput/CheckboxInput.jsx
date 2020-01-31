import React from 'react';

import useControlled from '../utils/useControlled';

import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Checkbox from '../Checkbox';

const CheckboxInput = ({
  checked: checkedProp,
  defaultChecked,
  onChange,
  MuiInputProps,
  toggleInput,
  ...other
}) => {
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked)
  });

  const handleChange = event => {
    const newChecked = event.target.checked;

    setCheckedState(newChecked);

    if (onChange) {
      onChange(event, newChecked);
    }
  };

  if (toggleInput) {
    return (
      <React.Fragment>
        <Checkbox checked={checked} onChange={handleChange} {...other} />
        {checked && <Input {...MuiInputProps} />}
      </React.Fragment>
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
  toggleInput: PropTypes.bool
};

export default CheckboxInput;
