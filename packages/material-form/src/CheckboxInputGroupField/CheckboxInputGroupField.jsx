import React from 'react';
import PropTypes from 'prop-types';
import { fromJS, isImmutable } from 'immutable';

import CheckboxInputGroup from '@e-group/material/CheckboxInputGroup';

// Code below is refer to https://github.com/erikras/redux-form/issues/1037
const CheckboxInputGroupField = ({
  input,
  meta: { touched, invalid, error },
  options,
  error: errorProp,
  helperText,
  ...other
}) => {
  const valueIsImmutable = isImmutable(input.value);
  const isError = touched && invalid;

  const handleChange = (e, name) => {
    if (valueIsImmutable) {
      input.onChange(input.value.setIn([name, 'checked'], e.target.checked));
    } else {
      input.onChange(
        fromJS({
          [name]: {
            checked: e.target.checked
          }
        })
      );
    }
  };

  const handleInputChange = (e, name) => {
    if (valueIsImmutable) {
      input.onChange(input.value.setIn([name, 'text'], e.target.value));
    } else {
      input.onChange(
        fromJS({
          [name]: {
            text: e.target.value
          }
        })
      );
    }
  };

  return (
    <CheckboxInputGroup
      options={options.map(
        ({ onChange, checked, MuiInputProps, name, ...otherOption }) => {
          const {
            onChange: onChangeProp,
            value: valueProp,
            ...otherMuiInputProps
          } = MuiInputProps || {};
          return {
            name,
            onChange: e => handleChange(e, name),
            checked: valueIsImmutable
              ? input.value.getIn([name, 'checked'], false)
              : false,
            MuiInputProps: {
              onChange: e => handleInputChange(e, name),
              value: valueIsImmutable
                ? input.value.getIn([name, 'text'], '')
                : '',
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
};

CheckboxInputGroupField.propTypes = {
  /**
   * redux from props
   */
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default CheckboxInputGroupField;
