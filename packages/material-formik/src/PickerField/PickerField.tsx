import React, { FC } from 'react';

import { FieldProps } from 'formik';
import Picker, { PickerProps } from '@e-group/material-module/Picker';

export interface BasePickerFieldProps extends FieldProps {
  /**
   * To avoid conflict with  format prop.
   */
  pickerFormat?: string;
}

export type PickerFieldProps = BasePickerFieldProps & PickerProps;

const PickerField: FC<PickerFieldProps> = ({
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
    <Picker
      format={pickerFormat}
      error={isError}
      helperText={isError ? error : helperText}
      {...field}
      onChange={handleDateChange}
      {...other}
    />
  );
};

export default PickerField;
