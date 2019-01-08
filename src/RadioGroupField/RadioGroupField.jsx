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
    FormControlProps: PropTypes.object,
    RadioGroupProps: PropTypes.object
  };

  handleChange = e => {
    const { RadioGroupProps, input } = this.props;
    if (RadioGroupProps && RadioGroupProps.onChange) {
      RadioGroupProps.onChange(e, input.onChange);
    } else {
      input.onChange(e);
    }
  };

  handleBlur = e => {
    const { RadioGroupProps, input } = this.props;
    if (RadioGroupProps && RadioGroupProps.onBlur) {
      RadioGroupProps.onBlur(e, input.onBlur);
    } else {
      input.onBlur(e);
    }
  };

  handleValue = () => {
    const { RadioGroupProps, input } = this.props;
    if (RadioGroupProps && RadioGroupProps.value) {
      if (typeof RadioGroupProps.value === 'function') {
        return RadioGroupProps.value(input.value);
      }
      return RadioGroupProps.value;
    }
    return input.value;
  };

  render() {
    const {
      input,
      meta: { touched, invalid, error },
      FormControlProps,
      RadioGroupProps,
      ...rest
    } = this.props;
    return (
      <RadioGroup
        {...rest}
        FormControlProps={{
          ...FormControlProps,
          error: touched && invalid
        }}
        RadioGroupProps={{
          ...RadioGroupProps,
          ...input,
          value: this.handleValue(),
          onChange: this.handleChange,
          onBlur: this.handleBlur
        }}
        helperText={error}
        showHelperText={touched && invalid}
      />
    );
  }
}
