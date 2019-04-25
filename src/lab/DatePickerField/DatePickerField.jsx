import React from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';
import { DatePicker } from 'material-ui-pickers';

const DatePickerField = ({
  input: { value, onChange },
  meta: { touched, error, invalid },
  datePickerFormat,
  error: errorProp,
  helperText,
  ...other
}) => {
  const handleDateChange = value => {
    onChange(value);
  };

  const isError = touched && invalid;

  return (
    <DatePicker
      onChange={handleDateChange}
      format={datePickerFormat}
      error={isError}
      helperText={isError ? error : helperText}
      value={value}
      {...other}
    />
  );
};

DatePickerField.propTypes = {
  // redux form props
  input: PropTypes.shape(fieldInputPropTypes),
  meta: PropTypes.shape(fieldMetaPropTypes),
  /**
   * To avoid conflict with Field format prop.
   */
  datePickerFormat: PropTypes.string
};

export default DatePickerField;
