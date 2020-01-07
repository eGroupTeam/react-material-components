import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from '@e-group/material-module/ReactSelect';
import { isImmutable, fromJS } from 'immutable';

const ReactSelectField = props => {
  const {
    input,
    meta: { touched, error, invalid },
    onChange,
    onInputChange,
    options,
    MuiTextFieldProps,
    inputValue: inputValueProp,
    value: valueProp,
    ...other
  } = props;
  const isError = touched && invalid;
  const [inputValue, setInputValue] = React.useState('');

  const handleChange = option => {
    const value = isImmutable(option) ? option : fromJS(option);
    if (onChange) {
      onChange(value, props);
    } else {
      input.onChange(value);
    }
  };

  // To keep value after onBlur please read this issue.
  // https://github.com/JedWatson/react-select/issues/3189
  const handleInputChange = (inputValue, actionMeta) => {
    if (onInputChange) {
      onInputChange(inputValue, actionMeta);
    }
    if (
      actionMeta.action !== 'input-blur' &&
      actionMeta.action !== 'menu-close'
    ) {
      setInputValue(inputValue);
    }
  };

  const hasValue = typeof input.value !== 'undefined';
  const value =
    hasValue && isImmutable(input.value) ? input.value.toJS() : input.value;

  const { error: errorProp, helperText, ...otherMuiTextFieldProps } =
    MuiTextFieldProps || {};

  return (
    <ReactSelect
      inputValue={inputValue}
      onChange={handleChange}
      onInputChange={handleInputChange}
      options={options}
      value={value}
      MuiTextFieldProps={{
        error: isError,
        helperText: isError ? error : helperText,
        ...otherMuiTextFieldProps
      }}
      {...other}
    />
  );
};

ReactSelectField.propTypes = {
  /**
   * redux from props
   */
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  /** Callback function that triggers when the search text value has changed.
   * function(option: object) => void */
  onChange: PropTypes.func
};

export default ReactSelectField;
