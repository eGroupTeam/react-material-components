import React, { FC } from 'react';
import Picker, { PickerProps } from '@e-group/material-module/Picker';
import { WrappedFieldProps } from 'redux-form';

export interface BasePickerFieldProps extends WrappedFieldProps {
  /**
   * To avoid conflict with  format prop.
   */
  pickerFormat?: string;
}

export type PickerFieldProps = BasePickerFieldProps & PickerProps;

const PickerField: FC<PickerFieldProps> = ({
  input: { value, onChange },
  meta: { touched, error, invalid },
  pickerFormat,
  error: errorProp,
  helperText,
  ...other
}) => {
  const handleDateChange = (value: any) => {
    onChange(value);
  };
  const isError = touched && invalid;

  return (
    <Picker
      format={pickerFormat}
      error={isError}
      helperText={isError ? error : helperText}
      value={value}
      {...other}
      onChange={handleDateChange}
    />
  );
};

export default PickerField;
