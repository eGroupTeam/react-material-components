import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS, isImmutable } from 'immutable';

import CheckboxInputGroup from '../CheckboxInputGroup';

// Code below is refer to https://github.com/erikras/redux-form/issues/1037
export default class CheckboxInputGroupField extends Component {
  static propTypes = {
    /**
     * redux from props
     */
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired
  };

  _handleChange = (e, option) => {
    const { input } = this.props;
    if (isImmutable(input.value)) {
      input.onChange(
        input.value.setIn([option.name, 'checked'], e.target.checked)
      );
    } else {
      input.onChange(
        fromJS({
          [option.name]: {
            checked: e.target.checked
          }
        })
      );
    }
  };

  _handleInputChange = (e, option) => {
    const { input } = this.props;
    if (isImmutable(input.value)) {
      input.onChange(input.value.setIn([option.name, 'text'], e.target.value));
    } else {
      input.onChange(
        fromJS({
          [option.name]: {
            text: e.target.value
          }
        })
      );
    }
  };

  _parseChecked = option => {
    const { input } = this.props;
    if (isImmutable(input.value)) {
      return input.value.getIn([option.name, 'checked'], false);
    }
    return false;
  };

  _parseText = option => {
    const { input } = this.props;
    if (isImmutable(input.value)) {
      // TODO: We can't control more than one Input value while be wrapped in the FormControl.
      // I think that's why I can't controll multiple value in the same time.
      // If I don't control values the component work well but React will show warning about `A component is changing an uncontrolled input of type text to be controlled`.
      return input.value.getIn([option.name, 'text']);
    }
    return '';
  };

  render() {
    const {
      input,
      meta: { touched, invalid, error },
      options,
      error: errorProp,
      helperText,
      ...other
    } = this.props;
    const isError = touched && invalid;
    return (
      <CheckboxInputGroup
        options={options.map(
          ({ onChange, checked, MuiInputProps, ...otherOption }) => {
            const {
              onChange: onChangeProp,
              value: valueProp,
              ...otherMuiInputProps
            } = MuiInputProps || {};
            return {
              onChange: e => this._handleChange(e, otherOption),
              checked: this._parseChecked(otherOption),
              MuiInputProps: {
                onChange: e => this._handleInputChange(e, otherOption),
                value: this._parseText(otherOption),
                ...otherMuiInputProps
              },
              ...otherOption
            };
          }
        )}
        error={isError}
        helperText={isError ? error : helperText}
        {...other}
      />
    );
  }
}
