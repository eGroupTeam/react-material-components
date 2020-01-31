import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import createChainedFunction from '@material-ui/core/utils/createChainedFunction';
import useRadioGroup from '@material-ui/core/RadioGroup/useRadioGroup';

import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Radio from '../Radio';

const StyledInput = withStyles({
  formControl: {
    'label + &': {
      marginTop: 0
    }
  }
})(Input);

const RadioInput = props => {
  const {
    checked: checkedProp,
    name: nameProp,
    onChange: onChangeProp,
    MuiInputProps,
    toggleInput,
    ...other
  } = props;
  const radioGroup = useRadioGroup();

  let checked = checkedProp;
  const onChange = createChainedFunction(
    onChangeProp,
    radioGroup && radioGroup.onChange
  );
  let name = nameProp;

  if (radioGroup) {
    if (typeof checked === 'undefined') {
      checked = radioGroup.value === props.value;
    }
    if (typeof name === 'undefined') {
      name = radioGroup.name;
    }
  }

  if (toggleInput) {
    return (
      <React.Fragment>
        <Radio checked={checked} onChange={onChange} {...other} />
        {checked && <StyledInput {...MuiInputProps} />}
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
