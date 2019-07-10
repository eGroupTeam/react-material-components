import * as React from 'react';
import { DatePickerProps } from '@material-ui/pickers/DatePicker';
import { TimePickerProps } from '@material-ui/pickers/TimePicker';
import { DateTimePickerProps } from '@material-ui/pickers/DateTimePicker';

export interface BaseDatePickerFieldProps extends DatePickerProps {
  /**
   * To avoid conflict with Field format prop.
   */
  pickerFormat?: string;
}

export interface DatePickerFieldProps extends BaseDatePickerFieldProps {
  picker?: 'date';
}

export interface BaseTimePickerFieldProps extends TimePickerProps {
  /**
   * To avoid conflict with Field format prop.
   */
  pickerFormat?: string;
}

export interface TimePickerFieldProps extends BaseTimePickerFieldProps {
  picker: 'time';
}

export interface BaseDateTimePickerFieldProps extends DateTimePickerProps {
  /**
   * To avoid conflict with Field format prop.
   */
  pickerFormat?: string;
}

export interface DateTimePickerFieldProps extends BaseDateTimePickerFieldProps {
  picker: 'dateTime';
}

export type PickerFieldProps =
  | DatePickerFieldProps
  | TimePickerFieldProps
  | DateTimePickerFieldProps;

declare const PickerField: React.ComponentType<PickerFieldProps>;

export default PickerField;
