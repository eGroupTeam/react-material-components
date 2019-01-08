import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Radio as MUIRadio } from '@material-ui/core';

export default class Radio extends Component {
  static propTypes = {
    // customize props
    MUIRadioProps: PropTypes.object
  };

  render() {
    const { MUIRadioProps, ...rest } = this.props;
    return (
      <FormControlLabel control={<MUIRadio {...MUIRadioProps} />} {...rest} />
    );
  }
}
