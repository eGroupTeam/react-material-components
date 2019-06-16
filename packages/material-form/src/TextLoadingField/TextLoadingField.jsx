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

  render() {
    const {
      input,
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
        {...input}
        {...other}
      />
    );
  }
}
