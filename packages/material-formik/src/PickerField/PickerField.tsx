import React, { FC } from 'react';

import Picker, { PickerProps } from '@e-group/material-module/Picker';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { FieldProps, getIn } from 'formik';

export interface BasePickerFieldProps extends FieldProps {
  /**
   * To avoid conflict with  format prop.
   */
  pickerFormat?: string;
}

export type PickerFieldProps = BasePickerFieldProps & PickerProps;

const PickerField: FC<PickerFieldProps> = ({
  field,
  form: { touched, errors, setFieldValue, isSubmitting },
  pickerFormat,
  helperText,
  error: errorProp,
  disabled,
  ...other
}) => {
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  const handleChange = (date: MaterialUiPickersDate | null) => {
    setFieldValue(field.name, date);
  };

  return (
    <Picker
      format={pickerFormat}
      error={showError}
      disabled={disabled ?? isSubmitting}
      helperText={showError ? fieldError : helperText}
      {...field}
      {...other}
      onChange={handleChange}
    />
  );
};

export default PickerField;
