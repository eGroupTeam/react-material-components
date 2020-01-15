import React, { Component } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import CheckboxInput from '../CheckboxInput';

export default class CheckboxInputGroup extends Component {
  static propTypes = {
    /**
     * The content of the FormLabel.
     */
    label: PropTypes.string,
    /**
     * Options to generate group items.
     */
    options: PropTypes.array.isRequired,
    /**
     * The content of the FormHelperText.
     */
    helperText: PropTypes.string,
    /**
     * Mui `FormLabel` Props
     */
    MuiFormLabelProps: PropTypes.object,
    /**
     * Mui `FormGroup` Props
     */
    MuiFormGroupProps: PropTypes.object,
    /**
     * Mui `FormHelperText` Props
     */
    MuiFormHelperTextProps: PropTypes.object
  };

  render() {
    const {
      label,
      options,
      helperText,
      MuiFormLabelProps,
      MuiFormGroupProps,
      MuiFormHelperTextProps,
      children,
      ...other
    } = this.props;

    warning(
      children === undefined,
      'CheckboxInputGroup should not has children please use `options` only!'
    );

    return (
      <FormControl {...other}>
        <FormLabel {...MuiFormLabelProps}>{label}</FormLabel>
        <FormGroup {...MuiFormGroupProps}>
          {options.map((option, index) => (
            <CheckboxInput key={option.key || index} {...option} />
          ))}
        </FormGroup>
        {helperText && (
          <FormHelperText {...MuiFormHelperTextProps}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}
