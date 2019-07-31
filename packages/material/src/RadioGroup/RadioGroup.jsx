import React, { Component } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MuiRadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';

import Radio from '../Radio';

export default class RadioGroup extends Component {
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
     * Mui `RadioGroup` Props
     */
    MuiRadioGroupProps: PropTypes.object,
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
      MuiRadioGroupProps,
      MuiFormHelperTextProps,
      children,
      ...other
    } = this.props;

    warning(
      children === undefined,
      'RadioGroup should not has children please use `options` only!'
    );

    return (
      <FormControl {...other}>
        <FormLabel {...MuiFormLabelProps}>{label}</FormLabel>
        <MuiRadioGroup {...MuiRadioGroupProps}>
          {options.map(option => (
            <Radio {...option} />
          ))}
        </MuiRadioGroup>
        {helperText && (
          <FormHelperText {...MuiFormHelperTextProps}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}
