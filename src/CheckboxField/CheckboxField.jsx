import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';

import Checkbox from '../Checkbox';

export default class CheckboxField extends Component {
  static propTypes = {
    // redux form props
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
    // customize props
    MUICheckboxProps: PropTypes.object
  };

  render() {
    const { input, meta, MUICheckboxProps, ...rest } = this.props;
    return (
      <Checkbox MUICheckboxProps={MUICheckboxProps} {...input} {...rest} />
    );
  }
}
