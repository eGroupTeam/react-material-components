import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  RadioGroup as MUIRadioGroup,
  FormHelperText
} from '@material-ui/core';

import Radio from '../Radio';

export default class RadioGroup extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array,
    showHelperText: PropTypes.bool,
    helperText: PropTypes.string,
    FormControlProps: PropTypes.object,
    FormLabelProps: PropTypes.object,
    RadioGroupProps: PropTypes.object,
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
      RadioGroupProps,
      FormHelperTextProps,
      children
    } = this.props;
    return (
      <FormControl {...FormControlProps}>
        <FormLabel {...FormLabelProps}>{label}</FormLabel>
        <MUIRadioGroup {...RadioGroupProps}>
          {children ||
            options.map((option, index) => <Radio key={index} {...option} />)}
        </MUIRadioGroup>
        {showHelperText && (
          <FormHelperText {...FormHelperTextProps}>{helperText}</FormHelperText>
        )}
      </FormControl>
    );
  }
}
