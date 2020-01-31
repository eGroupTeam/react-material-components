import React from 'react';

import createChainedFunction from '@material-ui/core/utils/createChainedFunction';
import useRadioInputGroup from '../RadioInputGroup/useRadioInputGroup';

import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Radio from '../Radio';

const RadioInput = props => {
  const {
    checked: checkedProp,
    name: nameProp,
    onChange: onChangeProp,
    MuiInputProps,
    toggleInput,
    ...other
  } = props;
  const radioInputGroup = useRadioInputGroup();

  let checked = checkedProp;
  const onChange = createChainedFunction(
    onChangeProp,
    radioInputGroup && radioInputGroup.onChange
  );
  let name = nameProp;

  if (radioInputGroup) {
    if (typeof checked === 'undefined') {
      checked = radioInputGroup.value === props.value;
    }
    if (typeof name === 'undefined') {
      name = radioInputGroup.name;
    }
  }

  if (toggleInput) {
    return (
      <React.Fragment>
        <Radio checked={checked} onChange={onChange} {...other} />
        {checked && <Input {...MuiInputProps} />}
      </React.Fragment>
    );
  }

  return <Radio checked={checked} onChange={onChange} {...other} />;
};

RadioInput.propTypes = {
  /**
   * If checked is not null component will be controlled external.
   */
  checked: PropTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * If not controlled, use internal state.
   */
  onChange: PropTypes.func,
  /**
   * Mui `Input` Props
   */
  MuiInputProps: PropTypes.object,
  /**
   * Enable show/hide input if checked/unchecked.
   */
  toggleInput: PropTypes.bool
};

export default RadioInput;
