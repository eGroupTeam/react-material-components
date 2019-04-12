import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';
import Input from '@material-ui/core/Input';

export default class InputField extends Component {
  static propTypes = {
    // redux form props
    input: PropTypes.shape(fieldInputPropTypes),
    meta: PropTypes.shape(fieldMetaPropTypes)
  };

  render() {
    const { input, ...rest } = this.props;
    return <Input {...input} {...rest} />;
  }
}
