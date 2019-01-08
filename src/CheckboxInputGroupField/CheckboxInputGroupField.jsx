import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS, isImmutable } from 'immutable';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';

import CheckboxInputGroup from '../CheckboxInputGroup';

// Code below is refer to https://github.com/erikras/redux-form/issues/1037
export default class CheckboxInputGroupField extends Component {
  static propTypes = {
    // redux form props
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
    // customize props
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    FormControlProps: PropTypes.object
  };

  getCheckboxNewValue = (checked, option) => {
    const { input } = this.props;
    let newValue = isImmutable(input.value) ? input.value : fromJS({});
    newValue = newValue.setIn([option.name, 'checked'], checked);
    return newValue;
  };

  getInputNewValue = (text, option) => {
    const { input } = this.props;
    let newValue = isImmutable(input.value) ? input.value : fromJS({});
    newValue = newValue.setIn([option.name, 'text'], text);
    return newValue;
  };

  parseChecked = (value, option) => {
    if (isImmutable(value)) {
      // if not set checked yet should return false
      if (value.hasIn([option.name, 'checked'])) {
        return value.getIn([option.name, 'checked']);
      }
      return false;
    }
    return value;
  };

  parseText = (value, option) => {
    if (isImmutable(value)) {
      // if not set text yet should return ''
      if (value.hasIn([option.name, 'text'])) {
        return value.getIn([option.name, 'text']);
      }
      return '';
    }
    return value;
  };

  render() {
    const {
      input,
      meta: { touched, invalid, error },
      meta,
      options,
      FormControlProps,
      ...rest
    } = this.props;
    const { value, ...restInput } = input;

    return (
      <CheckboxInputGroup
        {...rest}
        options={options.map(option => ({
          ...option,
          CheckboxProps: {
            ...restInput,
            ...option.CheckboxProps,
            onChange: e =>
              input.onChange(
                this.getCheckboxNewValue(e.target.checked, option)
              ),
            onBlur: e =>
              input.onBlur(this.getCheckboxNewValue(e.target.checked, option)),
            checked: this.parseChecked(value, option)
          },
          InputProps: {
            ...option.InputProps,
            onChange: e =>
              input.onChange(this.getInputNewValue(e.target.value, option)),
            value: this.parseText(value, option)
          }
        }))}
        FormControlProps={{
          ...FormControlProps,
          error: touched && invalid
        }}
        helperText={error}
        showHelperText={touched && invalid}
      />
    );
  }
}
