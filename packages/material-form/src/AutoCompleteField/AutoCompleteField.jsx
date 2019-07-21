import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoComplete from '@e-group/material-module/AutoComplete';

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
    const { onChange, input } = this.props;
    if (onChange) {
      onChange(option, this.props);
    } else {
      input.onChange(option);
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
    let defaultOptions;
    // To set default value we need to create default options.
    if ((!options || !options.length) && input.value) {
      defaultOptions = [input.value];
    }
    return (
      <AutoComplete
        inputValue={inputValue}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        options={defaultOptions || options}
        value={input.value}
        {...other}
      />
    );
  }
}
