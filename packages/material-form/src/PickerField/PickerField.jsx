import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, TimePicker, DateTimePicker } from '@material-ui/pickers';

const variantComponent = {
  date: DatePicker,
  time: TimePicker,
  dateTime: DateTimePicker
};

const PickerField = ({
  input: { value, onChange },
  meta: { touched, error, invalid },
  datePickerFormat,
  error: errorProp,
  helperText,
  variant = 'date',
  ...other
}) => {
  const handleDateChange = value => {
    onChange(value);
  };

  const isError = touched && invalid;
  const PickerComponent = variantComponent[variant];

  return (
    <PickerComponent
      onChange={handleDateChange}
      format={datePickerFormat}
      error={isError}
      helperText={isError ? error : helperText}
      value={value}
      {...other}
    />
  );
};

PickerField.propTypes = {
  /**
   * redux from props
   */
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  /**
   * The variant to use.
   */
  variant: PropTypes.string.isRequired,
  /**
   * To avoid conflict with Field format prop.
   */
  datePickerFormat: PropTypes.string
};

export default PickerField;
