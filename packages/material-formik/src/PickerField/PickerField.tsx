import React, { FC } from 'react';

import Picker, { PickerProps } from '@e-group/material-module/Picker';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { FieldProps } from 'formik';
import useFieldStatus from '../utils/useFieldStatus';

export interface BasePickerFieldProps extends FieldProps {
  /**
   * To avoid conflict with  format prop.
   */
  pickerFormat?: string;
}

export type PickerFieldProps = BasePickerFieldProps & PickerProps;

const PickerField: FC<PickerFieldProps> = props => {
  const {
    field: { value, ...field },
    form: { setFieldValue },
    pickerFormat,
    helperText,
    error: errorProp,
    disabled: disabledProp,
    ...other
  } = props;
  const { fieldError, showError, disabled, hasValue } = useFieldStatus(
    props.field,
    props.form,
    disabledProp
  );

  const handleChange = (date: MaterialUiPickersDate | null) => {
    setFieldValue(field.name, date);
  };

  return (
    <Picker
      format={pickerFormat}
      error={showError}
      disabled={disabled}
      helperText={showError ? fieldError : helperText}
      value={hasValue ? value : null}
      {...field}
      {...other}
      onChange={handleChange}
    />
  );
};

export default PickerField;
