import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';

import RadioGroup from '../RadioGroup';

export default class RadioGroupField extends Component {
  static propTypes = {
    // redux form props
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
    // customize props
    MuiRadioGroupProps: PropTypes.object
  };

  render() {
    const {
      input,
      meta: { touched, invalid, error },
      options,
      error: errorProp,
      helperText,
      MuiRadioGroupProps,
      ...other
    } = this.props;
    const {
      value: valueProp,
      onChange: onChangeProp,
      ...otherMuiRadioGroupProps
    } = MuiRadioGroupProps || {};
    const isError = touched && invalid;
    return (
      <RadioGroup
        options={options}
        MuiRadioGroupProps={{
          value: input.value,
          onChange: input.onChange,
          ...otherMuiRadioGroupProps
        }}
        error={isError}
        helperText={isError ? error : helperText}
        {...other}
      />
    );
  }
}
