import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';

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
      InputProps: InputPropsProp,
      ...other
    } = this.props;
    const { endAdornment, ...otherInputProps } = InputPropsProp || {};
    const InputProps = asyncValidating
      ? {
          // return loading progress
          endAdornment: (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ),
          ...otherInputProps
        }
      : InputPropsProp;
    const isError = touched && invalid;
    return (
      <TextField
        error={isError}
        helperText={isError ? error : helperText}
        InputProps={InputProps}
        {...input}
        {...other}
      />
    );
  }
}
