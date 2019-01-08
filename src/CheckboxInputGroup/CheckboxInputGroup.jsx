import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormHelperText
} from '@material-ui/core';
import CheckboxInput from '../CheckboxInput';

export default class CheckboxInputGroup extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array,
    showHelperText: PropTypes.bool,
    helperText: PropTypes.string,
    FormControlProps: PropTypes.object,
    FormLabelProps: PropTypes.object,
    FormGroupProps: PropTypes.object,
    FormHelperTextProps: PropTypes.object,
    children: PropTypes.node
  };

  render() {
    const {
      label,
      options,
      showHelperText,
      helperText,
      FormControlProps,
      FormLabelProps,
      FormGroupProps,
      FormHelperTextProps,
      children
    } = this.props;
    return (
      <FormControl {...FormControlProps}>
        <FormLabel {...FormLabelProps}>{label}</FormLabel>
        <FormGroup {...FormGroupProps}>
          {children ||
            options.map((option, index) => (
              <CheckboxInput key={index} {...option} />
            ))}
        </FormGroup>
        {showHelperText && (
          <FormHelperText {...FormHelperTextProps}>{helperText}</FormHelperText>
        )}
      </FormControl>
    );
  }
}
