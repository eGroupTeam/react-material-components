import React, { FC } from 'react';
import Picker, { PickerProps } from '@e-group/material-module/Picker';
import { WrappedFieldProps } from 'redux-form';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export interface BasePickerFieldProps extends WrappedFieldProps {
  /**
   * To avoid conflict with  format prop.
   */
  pickerFormat?: string;
}

export type PickerFieldProps = BasePickerFieldProps & PickerProps;

const PickerField: FC<PickerFieldProps> = ({
  input: { value, onChange, onBlur, onDragStart, onDrop, onFocus, ...input },
  meta: { touched, error, invalid },
  pickerFormat,
  error: errorProp,
  helperText,
  onChange: onChangeProp,
  ...other
}) => {
  const isError = touched && invalid;

  const handleChange = (date: MaterialUiPickersDate) => {
    if (onChangeProp) {
      onChangeProp(date);
    }
    onChange(date);
  };

  return (
    <Picker
      format={pickerFormat}
      error={isError}
      helperText={isError ? error : helperText}
      value={value === '' ? null : value}
      onChange={handleChange}
      {...input}
      {...other}
    />
  );
};

export default PickerField;
