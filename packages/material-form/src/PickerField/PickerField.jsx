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
  meta: { touched, error, invalid: invalidProp },
  pickerFormat,
  error: errorProp,
  onError,
  helperText,
  picker,
  ...other
}) => {
  const PickerComponent = pickerComponent[picker];
  const [pickerErrorMsg, setPickerErrorMsg] = React.useState('');
  const handleDateChange = value => {
    onChange(value);
  };
  const invalid = invalidProp || pickerErrorMsg !== '';
  const isError = touched && invalid;
  const errorMsg = error || pickerErrorMsg;

  const handleError = errorMsg => {
    if (onError) {
      onError(errorMsg);
    }
    setPickerErrorMsg(errorMsg);
  };

  return (
    <PickerComponent
      onChange={handleDateChange}
      format={pickerFormat}
      onError={handleError}
      error={isError}
      helperText={isError ? errorMsg : helperText}
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

PickerField.defaultProps = {
  picker: 'date'
};

export default PickerField;
