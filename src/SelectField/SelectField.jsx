import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default class SelectField extends Component {
  static propTypes = {
    // redux form props
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
    // customize props
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func
  };

  handleChange = e => {
    const { onChange, input } = this.props;
    if (onChange) {
      onChange(e, this.props);
    } else {
      input.onChange(e.target.value);
    }
  };

  render() {
    const {
      input,
      meta: { touched, error, invalid },
      options,
      SelectProps,
      ...rest
    } = this.props;
    return (
      <TextField
        error={touched && invalid}
        helperText={touched && error}
        select={true}
        {...input}
        {...rest}
      >
        {options.map(({ text, ...rest }, i) => (
          <MenuItem key={i} {...rest}>
            {text}
          </MenuItem>
        ))}
      </TextField>
    );
  }
}
