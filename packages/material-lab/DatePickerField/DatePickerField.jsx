import React from 'react';
import PropTypes from 'prop-types';
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
  /**
   * redux from props
   */
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  /**
   * To avoid conflict with Field format prop.
   */
  datePickerFormat: PropTypes.string
};

export default DatePickerField;
