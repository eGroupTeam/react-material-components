import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoComplete from '@e-group/material-module/AutoComplete';
import { isImmutable, fromJS } from 'immutable';

export default class AutoCompleteField extends Component {
  static propTypes = {
    /**
     * redux from props
     */
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    /** Callback function that triggers when the search text value has changed.
     * function(option: object) => void */
    onChange: PropTypes.func
  };

  state = {
    inputValue: ''
  };

  handleChange = option => {
    const value = isImmutable(option) ? option : fromJS(option);
    const { onChange, input } = this.props;
    if (onChange) {
      onChange(value, this.props);
    } else {
      input.onChange(value);
    }
  };

  // To keep value after onBlur please read this issue.
  // https://github.com/JedWatson/react-select/issues/3189
  handleInputChange = (inputValue, action) => {
    const { onInputChange } = this.props;
    if (onInputChange) {
      onInputChange(inputValue, action);
    }
    if (action.action !== 'input-blur' && action.action !== 'menu-close') {
      this.setState({ inputValue });
    }
  };

  render() {
    const { inputValue } = this.state;
    const {
      input,
      meta,
      onChange,
      onInputChange,
      options,
      inputValue: inputValueProp,
      value,
      ...other
    } = this.props;

    return (
      <AutoComplete
        inputValue={inputValue}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        options={options}
        value={input.value && input.value.toJS()}
        {...other}
      />
    );
  }
}
