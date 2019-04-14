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
     * A shortcut for generate group items.
     */
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    /**
     * The content of the FormHelperText.
     */
    helperText: PropTypes.string,
    /**
     * To show helperText or not.
     */
    showHelperText: PropTypes.bool,
    /**
     * Mui FormLabel Props
     */
    MuiFormLabelProps: PropTypes.object,
    /**
     * Mui FormGroup Props
     */
    MuiFormGroupProps: PropTypes.object,
    /**
     * Mui FormHelperText Props
     */
    MuiFormHelperTextProps: PropTypes.object
  };

  render() {
    const {
      label,
      options,
      showHelperText,
      helperText,
      MuiFormLabelProps,
      FormGroupProps,
      FormHelperTextProps,
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
        <FormGroup {...FormGroupProps}>
          {options.map((option, index) => (
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
