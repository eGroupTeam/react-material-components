import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiRadio from '@material-ui/core/Radio';

export default class Radio extends Component {
  static propTypes = {
    // customize props
    MuiRadioProps: PropTypes.object
  };

  render() {
    const { MuiRadioProps, ...rest } = this.props;
    return (
      <FormControlLabel control={<MuiRadio {...MuiRadioProps} />} {...rest} />
    );
  }
}
