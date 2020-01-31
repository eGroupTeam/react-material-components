import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import Input from '@material-ui/core/Input';

import Radio from '../Radio';

export const styles = {
  inputRoot: {
    marginTop: '0 !important'
  }
};

const useStyles = makeStyles(styles);

const RadioInput = ({
  checked: checkedProp,
  defaultChecked,
  onChange: onChangeProp,
  MuiInputProps,
  toggleInput,
  ...other
}) => {
  const classes = useStyles();
  const [selfChecked, setSelfChecked] = React.useState(
    typeof defaultChecked !== 'undefined' ? defaultChecked : false
  );
  const { className: InputClassName, ...otherMuiInputProps } =
    MuiInputProps || {};

  // Define if user need control `checked` attribute.
  const isCheckedControlled = typeof checkedProp !== 'undefined';
  const handleRadioChange = e => setSelfChecked(e.target.checked);
  const onChange = isCheckedControlled ? onChangeProp : handleRadioChange;
  const checked = isCheckedControlled ? checkedProp : selfChecked;

  return (
    <React.Fragment>
      <Radio checked={checked} onChange={onChange} {...other} />
      {toggleInput && checked && (
        <Input
          className={clsx(classes.inputRoot, InputClassName)}
          {...otherMuiInputProps}
        />
      )}
    </React.Fragment>
  );
};

RadioInput.propTypes = {
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

export default RadioInput;
