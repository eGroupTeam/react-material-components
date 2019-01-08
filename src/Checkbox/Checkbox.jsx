import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Checkbox as MUICheckbox } from '@material-ui/core';

export default class Checkbox extends Component {
  static propTypes = {
    // customize props
    MUICheckboxProps: PropTypes.object
  };

  render() {
    const { MUICheckboxProps, ...rest } = this.props;
    return (
      <FormControlLabel
        control={<MUICheckbox {...MUICheckboxProps} />}
        {...rest}
      />
    );
  }
}
