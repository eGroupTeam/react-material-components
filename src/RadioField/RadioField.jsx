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
    MUIRadioProps: PropTypes.object
  };

  render() {
    const { input, meta, MUIRadioProps, ...rest } = this.props;
    return <Radio MUIRadioProps={MUIRadioProps} {...input} {...rest} />;
  }
}
