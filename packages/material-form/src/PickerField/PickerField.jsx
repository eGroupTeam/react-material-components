import React from 'react';
import PropTypes from 'prop-types';
import {
  DatePicker,
  KeyboardDatePicker,
  TimePicker,
  KeyboardTimePicker,
  DateTimePicker,
  KeyboardDateTimePicker
} from '@material-ui/pickers';

const pickerComponent = {
  date: DatePicker,
  time: TimePicker,
  dateTime: DateTimePicker,
  keyboardDate: KeyboardDatePicker,
  keyboardTime: KeyboardTimePicker,
  keyboardDateTime: KeyboardDateTimePicker
};

const PickerField = ({
  input: { value, onChange },
  meta: { touched, error, invalid },
  pickerFormat,
  error: errorProp,
  helperText,
  picker = 'date',
  ...other
}) => {
  const handleDateChange = value => {
    onChange(value);
  };

  const isError = touched && invalid;
  const PickerComponent = pickerComponent[picker];

  return (
    <PickerComponent
      onChange={handleDateChange}
      format={pickerFormat}
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
   * The picker to use.
   */
  picker: PropTypes.string.isRequired,
  /**
   * To avoid conflict with Field format prop.
   */
  pickerFormat: PropTypes.string
};

export default PickerField;
