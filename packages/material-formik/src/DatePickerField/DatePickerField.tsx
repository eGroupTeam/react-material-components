import React, { FC } from 'react';
import { DatePicker, DatePickerProps } from '@material-ui/pickers';
import { FieldProps } from 'formik';

export interface DatePickerFieldProps extends FieldProps, DatePickerProps {
  /**
   * To avoid conflict with Field format prop.
   */
  pickerFormat?: string;
}

const DatePickerField: FC<DatePickerFieldProps> = ({
  field,
  form: { touched, errors, isValid, setFieldValue },
  pickerFormat,
  helperText,
  error: errorProp,
  onChange: onChangeProps,
  ...other
}) => {
  const error = errors[field.name];
  const isError = touched && !isValid;

  const handleDateChange = (date: any) => {
    setFieldValue(field.name, date);
  };

  return (
    <DatePicker
      format={pickerFormat}
      error={isError}
      helperText={isError ? error : helperText}
      {...field}
      onChange={handleDateChange}
      {...other}
    />
  );
};

export default DatePickerField;
