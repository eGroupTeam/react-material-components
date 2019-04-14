import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';

import Radio from '../Radio';

export default class RadioField extends Component {
  static propTypes = {
    // redux form props
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
    // customize props
    MuiRadioProps: PropTypes.object
  };

  render() {
    const { input, meta, MuiRadioProps, ...rest } = this.props;
    return <Radio MuiRadioProps={MuiRadioProps} {...input} {...rest} />;
  }
}
