import React, { forwardRef } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import createChainedFunction from '@material-ui/core/utils/createChainedFunction';
import Input, { InputProps } from '@material-ui/core/Input';
import useRadioGroup from '../RadioInputGroup/useRadioGroup';
import Radio, { RadioProps } from '../Radio';

const StyledInput = withStyles({
  formControl: {
    'label + &': {
      marginTop: 0,
    },
  },
})(Input);

export interface RadioInputProps extends RadioProps {
  /**
   * Mui `Input` Props
   */
  MuiInputProps?: InputProps;
  /**
   * Enable show/hide input if checked/unchecked.
   */
  toggleInput?: boolean;
  /**
   * If checked is not null component will be controlled external.
   */
  checked?: boolean;
  /**
   * Name attribute of the `input` element.
   */
  name?: string;
  /**
   * If not controlled, use internal state.
   */
  onChange?: RadioProps['onChange'];
}

const RadioInput = forwardRef<unknown, RadioInputProps>((props, ref) => {
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
      <>
        <Radio ref={ref} checked={checked} onChange={onChange} {...other} />
        {checked && <StyledInput {...MuiInputProps} />}
      </>
    );
  }

  return <Radio ref={ref} checked={checked} onChange={onChange} {...other} />;
});

export default RadioInput;
