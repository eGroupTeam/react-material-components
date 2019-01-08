import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS, isImmutable } from 'immutable';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';

import CheckboxInput from '../CheckboxInput';

/**
 * A component with Input Field when it checked
 */
export default class CheckboxInputField extends Component {
  static propTypes = {
    // redux form props
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
    // customize props
    CheckboxProps: PropTypes.object,
    InputProps: PropTypes.object,
    checkedInput: PropTypes.bool
  };

  getNewCheckedValue = checked => {
    const { input } = this.props;
    let newValue = isImmutable(input.value) ? input.value : fromJS({});
    newValue = newValue.set('checked', checked);
    return newValue;
  };

  getNewTextValue = text => {
    const { input } = this.props;
    let newValue = isImmutable(input.value) ? input.value : fromJS({});
    newValue = newValue.set('text', text);
    return newValue;
  };

  parseChecked = value => {
    if (isImmutable(value)) {
      // if not set checked yet should return false
      if (value.has('checked')) {
        return value.get('checked');
      }
      return false;
    }
    return value;
  };

  parseText = value => {
    if (isImmutable(value)) {
      // if not set text yet should return ''
      if (value.has('text')) {
        return value.get('text');
      }
      return '';
    }
    return value;
  };

  render() {
    const { input, meta, CheckboxProps, InputProps, checkedInput } = this.props;
    const { value, ...restInput } = input;
    return (
      <CheckboxInput
        CheckboxProps={{
          ...restInput,
          ...CheckboxProps,
          onChange: e =>
            input.onChange(this.getNewCheckedValue(e.target.checked)),
          onBlur: e => input.onBlur(this.getNewCheckedValue(e.target.checked)),
          checked: this.parseChecked(value)
        }}
        InputProps={{
          ...InputProps,
          onChange: e => input.onChange(this.getNewTextValue(e.target.value)),
          value: this.parseText(value)
        }}
        checkedInput={checkedInput}
      />
    );
  }
}
