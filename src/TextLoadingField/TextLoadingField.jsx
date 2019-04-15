import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';
import TextLoading from '../TextLoading';

export default class TextLoadingField extends Component {
  static propTypes = {
    // redux form props
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    meta: PropTypes.shape(fieldMetaPropTypes).isRequired
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
