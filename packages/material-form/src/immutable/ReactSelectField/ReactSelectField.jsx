import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from '@e-group/material-module/ReactSelect';
import { isImmutable, fromJS, List } from 'immutable';

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
    isMulti,
    ...other
  } = props;
  const [inputValue, setInputValue] = React.useState('');
  const isError = touched && invalid;
  const hasValue = typeof input.value !== 'undefined';
  const value =
    hasValue && isImmutable(input.value) ? input.value.toJS() : input.value;

  const { error: errorProp, helperText, ...otherMuiTextFieldProps } =
    MuiTextFieldProps || {};

  const handleChange = (option, actionMeta) => {
    let nextValue = isImmutable(option) ? option : fromJS(option);
    if (onChange) {
      onChange(option, actionMeta);
    }
    // To fixed when use multi select and remove the last value will return null.
    if (actionMeta.action === 'remove-value' && nextValue === null && isMulti) {
      nextValue = List();
    }
    input.onChange(nextValue);
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

  return (
    <ReactSelect
      inputValue={inputValue}
      onChange={handleChange}
      onInputChange={handleInputChange}
      options={options}
      value={value}
      isMulti={isMulti}
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
