import React, { FC } from 'react';

import { FieldProps } from 'formik';
import Picker, { PickerProps } from '@e-group/material-module/Picker';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export interface BasePickerFieldProps extends FieldProps {
  /**
   * To avoid conflict with  format prop.
   */
  pickerFormat?: string;
}

export type PickerFieldProps = BasePickerFieldProps & PickerProps;

const PickerField: FC<PickerFieldProps> = ({
  field,
  form: { touched, errors, setFieldValue },
  pickerFormat,
  helperText,
  error: errorProp,
  ...other
}) => {
  const error = errors[field.name];
  const isError = Boolean(touched && error);

  const handleChange = (date: MaterialUiPickersDate | null) => {
    setFieldValue(field.name, date);
  };

  return (
    <Picker
      format={pickerFormat}
      error={isError}
      helperText={isError ? error : helperText}
      {...field}
      {...other}
      onChange={handleChange}
    />
  );
};

export default PickerField;
