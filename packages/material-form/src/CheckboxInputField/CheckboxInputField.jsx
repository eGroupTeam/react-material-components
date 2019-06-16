import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS, isImmutable } from 'immutable';

import CheckboxInput from '@e-group/material/CheckboxInput';

/**
 * A component with Input Field when it checked
 */
export default class CheckboxInputField extends Component {
  static propTypes = {
    /**
     * redux from props
     */
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    /**
     * Mui `Input` props
     */
    MuiInputProps: PropTypes.object
  };

  _handleChange = e => {
    const { input } = this.props;
    if (isImmutable(input.value)) {
      input.onChange(input.value.set('checked', e.target.checked));
    } else {
      input.onChange(
        fromJS({
          checked: e.target.checked
        })
      );
    }
  };

  _handleInputChange = e => {
    const { input } = this.props;
    if (isImmutable(input.value)) {
      input.onChange(input.value.set('text', e.target.value));
    } else {
      input.onChange(
        fromJS({
          text: e.target.value
        })
      );
    }
  };

  _parseChecked = () => {
    const { input } = this.props;
    if (isImmutable(input.value)) {
      return input.value.get('checked');
    }
    return false;
  };

  _parseText = () => {
    const { input } = this.props;
    if (isImmutable(input.value)) {
      return input.value.get('text');
    }
    return '';
  };

  render() {
    const {
      input,
      meta,
      onChange,
      checked,
      MuiInputProps,
      ...other
    } = this.props;
    const { onChange: onChangeProp, value: valueProp, ...otherMuiInputProps } =
      MuiInputProps || {};
    return (
      <CheckboxInput
        onChange={this._handleChange}
        checked={this._parseChecked()}
        MuiInputProps={{
          onChange: this._handleInputChange,
          value: this._parseText(),
          ...otherMuiInputProps
        }}
        {...other}
      />
    );
  }
}
