import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MUIRadio from '@material-ui/core/Radio';

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
