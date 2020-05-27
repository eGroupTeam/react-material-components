import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextLoading from '@e-group/material/TextLoading';

export default class TextLoadingField extends Component {
  static propTypes = {
    /**
     * redux from props
     */
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired
  };

  handleMultipleSelectOnChange = e => {
    this.props.input.onChange(e.target.value);
  };

  getInput() {
    const { input, select, SelectProps } = this.props;
    if (select && SelectProps && SelectProps.multiple) {
      return {
        value: input.value ? input.value : [],
        onChange: this.handleMultipleSelectOnChange
      };
    }
    return input;
  }

  render() {
    const {
      meta: { touched, error, invalid, asyncValidating },
      error: errorProp,
      helperText,
      InputProps,
      ...other
    } = this.props;
    const isError = touched && invalid;
    return (
      <TextLoading
        error={isError}
        loading={asyncValidating}
        helperText={isError ? error : helperText}
        InputProps={InputProps}
        {...this.getInput()}
        {...other}
      />
    );
  }
}
