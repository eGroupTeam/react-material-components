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
  input: { value, ...otherInput },
  meta: { touched, error, invalid },
  pickerFormat,
  error: errorProp,
  helperText,
  ...other
}) => {
  const isError = touched && invalid;
  return (
    <Picker
      format={pickerFormat}
      error={isError}
      helperText={isError ? error : helperText}
      value={value === '' ? null : value}
      {...otherInput}
      {...other}
    />
  );
};

export default PickerField;
