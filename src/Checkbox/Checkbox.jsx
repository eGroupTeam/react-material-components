import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MUICheckbox from '@material-ui/core/Checkbox';

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
